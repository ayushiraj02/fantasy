import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Volume2,
  VolumeX,
  Music,
  Sparkles,
  Radio,
  Wand2,
  Loader2,
  CheckCircle2,
  RotateCcw,
  Info,
} from 'lucide-react';
import {
  mysteriousAudio,
  GAMING_MYSTERY_TRACK,
} from '../utils/mysteriousAudio';

interface GeneratedTrack {
  id: string;
  name: string;
  url: string;
  prompt: string;
  date: string;
}

export function MysteriousAudioPlayer() {
  // Load saved preferences or default to continuous background playback ON
  const [isMusicEnabled, setIsMusicEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('bg_music_enabled');
    return saved !== null ? saved === 'true' : true;
  });

  const [isPlaying, setIsPlaying] = useState<boolean>(mysteriousAudio.getIsPlaying());
  const [volume, setVolume] = useState<number>(() => {
    const saved = localStorage.getItem('bg_music_volume');
    return saved ? parseFloat(saved) : 0.4;
  });

  const [isAiGeneratorOpen, setIsAiGeneratorOpen] = useState<boolean>(false);
  const [aiPrompt, setAiPrompt] = useState<string>(
    'Sparkling gaming mystery soundtrack with shimmering crystal bells, curious staccato marimba, and enchanted puzzle-game arpeggios.'
  );
  const [isGeneratingMusic, setIsGeneratingMusic] = useState<boolean>(false);
  const [aiErrorMessage, setAiErrorMessage] = useState<string | null>(null);
  const [generatedTrack, setGeneratedTrack] = useState<GeneratedTrack | null>(null);
  const [activeMode, setActiveMode] = useState<'procedural' | 'ai'>('procedural');

  const hasAttemptedAutoStart = useRef<boolean>(false);

  // Subscribe to audio engine playback state
  useEffect(() => {
    const unsubscribe = mysteriousAudio.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return unsubscribe;
  }, []);

  // Safe function to start or resume background audio
  const startBackgroundAudio = useCallback(async (currentVolume: number) => {
    try {
      const success = await mysteriousAudio.start(currentVolume);
      if (success) {
        setIsPlaying(true);
      }
      return success;
    } catch {
      return false;
    }
  }, []);

  // Keep audio playing all the time in the background
  useEffect(() => {
    if (!isMusicEnabled) {
      mysteriousAudio.stop();
      return;
    }

    // Try starting immediately on mount
    if (!hasAttemptedAutoStart.current) {
      hasAttemptedAutoStart.current = true;
      startBackgroundAudio(volume);
    }

    // Browser autoplay policy often blocks audio until first user gesture.
    const unlockAndPlay = async () => {
      if (isMusicEnabled && !mysteriousAudio.getIsPlaying()) {
        await startBackgroundAudio(volume);
      }
      removeUnlockListeners();
    };

    const removeUnlockListeners = () => {
      window.removeEventListener('click', unlockAndPlay);
      window.removeEventListener('keydown', unlockAndPlay);
      window.removeEventListener('touchstart', unlockAndPlay);
      window.removeEventListener('pointerdown', unlockAndPlay);
    };

    window.addEventListener('click', unlockAndPlay, { passive: true });
    window.addEventListener('keydown', unlockAndPlay, { passive: true });
    window.addEventListener('touchstart', unlockAndPlay, { passive: true });
    window.addEventListener('pointerdown', unlockAndPlay, { passive: true });

    // Handle tab switching / visibility changes to ensure music continues in background
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && isMusicEnabled) {
        mysteriousAudio.resumeIfSuspended();
      }
    };

    const handleWindowFocus = () => {
      if (isMusicEnabled) {
        mysteriousAudio.resumeIfSuspended();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleWindowFocus);

    return () => {
      removeUnlockListeners();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleWindowFocus);
    };
  }, [isMusicEnabled, volume, startBackgroundAudio]);

  const togglePlay = async () => {
    if (isPlaying) {
      mysteriousAudio.stop();
      setIsMusicEnabled(false);
      localStorage.setItem('bg_music_enabled', 'false');
    } else {
      setIsMusicEnabled(true);
      localStorage.setItem('bg_music_enabled', 'true');
      if (activeMode === 'ai' && generatedTrack) {
        mysteriousAudio.playCustomTrack(generatedTrack.url, generatedTrack.name);
      } else {
        await startBackgroundAudio(volume);
      }
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    mysteriousAudio.setVolume(newVol);
    localStorage.setItem('bg_music_volume', String(newVol));
  };

  const handleSwitchToProcedural = () => {
    setActiveMode('procedural');
    mysteriousAudio.switchToProceduralMystery();
  };

  const handleGenerateLyriaMusic = async () => {
    if (!aiPrompt.trim()) return;
    setIsGeneratingMusic(true);
    setAiErrorMessage(null);

    try {
      const res = await fetch('/api/generate-music', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: aiPrompt.trim(), duration: 30 }),
      });

      const data = await res.json();
      if (!res.ok || !data.success || !data.audioBase64) {
        throw new Error(data.error || 'Failed to generate track with Lyria 3.');
      }

      // Convert base64 audio to playable Blob URL
      const binary = atob(data.audioBase64);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: data.mimeType || 'audio/wav' });
      const audioUrl = URL.createObjectURL(blob);

      const track: GeneratedTrack = {
        id: `lyria-${Date.now()}`,
        name: 'Lyria AI: ' + aiPrompt.slice(0, 32) + '...',
        url: audioUrl,
        prompt: aiPrompt,
        date: new Date().toLocaleTimeString(),
      };

      setGeneratedTrack(track);
      setActiveMode('ai');
      setIsMusicEnabled(true);
      localStorage.setItem('bg_music_enabled', 'true');
      mysteriousAudio.playCustomTrack(audioUrl, track.name);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Music generation failed.';
      setAiErrorMessage(
        msg.includes('GEMINI_API_KEY')
          ? 'Lyria requires a Gemini API Key in Settings > Secrets to compose custom AI tracks. Falling back to built-in sparkling gaming mystery soundtrack!'
          : `Generation error: ${msg}. Built-in soundtrack remains active!`
      );
    } finally {
      setIsGeneratingMusic(false);
    }
  };

  const promptPresets = [
    '✨ Sparkling ancient sanctuary with crystal bells and staccato marimba',
    '🗝️ Secret puzzle chamber with celesta arpeggios and mystery bass',
    '🔮 Alchemist clockwork labyrinth with shimmering glass chimes',
  ];

  return (
    <div
      id="mysterious-music-widget"
      className="w-full max-w-3xl mb-5 rounded-2xl bg-white/95 border border-amber-200 p-2.5 sm:p-3 shadow-sm transition-all relative overflow-hidden"
    >
      {/* Subtle top sparkling glint */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

      <div className="flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
        {/* Left: Play/Pause Button & Gaming Mystery Name */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            id="btn-toggle-mysterious-audio"
            onClick={togglePlay}
            className={`flex items-center justify-center w-9 h-9 rounded-xl font-bold transition-all border cursor-pointer ${
              isPlaying
                ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-stone-950 border-amber-400 shadow-sm'
                : 'bg-stone-100 text-stone-700 border-stone-300 hover:bg-amber-50 hover:text-amber-800 hover:border-amber-300'
            }`}
            title={isPlaying ? 'Pause Background Music' : 'Start Background Music'}
          >
            {isPlaying ? (
              <Volume2 className="w-4 h-4 animate-pulse" />
            ) : (
              <VolumeX className="w-4 h-4 text-stone-400" />
            )}
          </button>

          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span className="text-xs font-bold text-stone-900 font-cinzel">
                {activeMode === 'ai' && generatedTrack
                  ? generatedTrack.name
                  : GAMING_MYSTERY_TRACK.name}
              </span>

              {isPlaying ? (
                <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-300 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  Continuous Background • 114 BPM
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-300 font-mono">
                  <Radio className="w-2.5 h-2.5 text-amber-600 animate-pulse" />
                  Click to awaken
                </span>
              )}
            </div>

            <p className="text-[11px] text-stone-500 font-medieval">
              {activeMode === 'ai'
                ? 'Lyria 3 AI Generated Track (Continuous Background Loop)'
                : 'Sparkling crystal celesta, curious pizzicato mystery pulse & enchanted arpeggios'}
            </p>
          </div>
        </div>

        {/* Center: Live Soundwave Graphic */}
        {isPlaying && (
          <div className="hidden md:flex items-center gap-1 h-5 px-2 py-1 rounded bg-amber-50 border border-amber-200">
            <span className="w-1 bg-amber-600 rounded-full animate-soundwave-1" />
            <span className="w-1 bg-amber-500 rounded-full animate-soundwave-2" />
            <span className="w-1 bg-yellow-500 rounded-full animate-soundwave-3" />
            <span className="w-1 bg-orange-500 rounded-full animate-soundwave-4" />
            <span className="w-1 bg-amber-600 rounded-full animate-soundwave-2" />
            <span className="w-1 bg-yellow-500 rounded-full animate-soundwave-1" />
          </div>
        )}

        {/* Right: Volume & AI Music Generator Button */}
        <div className="flex items-center gap-2.5 ml-auto">
          {/* Active Mode Switcher if custom track exists */}
          {generatedTrack && activeMode === 'ai' && (
            <button
              type="button"
              id="btn-switch-to-procedural"
              onClick={handleSwitchToProcedural}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-stone-100 hover:bg-amber-100 text-stone-700 hover:text-amber-900 border border-stone-300 text-[11px] font-cinzel font-bold transition-all cursor-pointer"
              title="Return to built-in Sparkling Mystery track"
            >
              <RotateCcw className="w-3 h-3 text-amber-600" />
              <span>Sparkling Theme</span>
            </button>
          )}

          {/* AI Lyria Music Generator Trigger */}
          <button
            type="button"
            id="btn-open-ai-music-modal"
            onClick={() => setIsAiGeneratorOpen(!isAiGeneratorOpen)}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold font-cinzel transition-all border cursor-pointer ${
              isAiGeneratorOpen
                ? 'bg-amber-500 text-stone-950 border-amber-600 shadow-2xs'
                : 'bg-stone-50 text-stone-700 border-stone-300 hover:bg-amber-50 hover:text-amber-900 hover:border-amber-300'
            }`}
            title="Generate custom mystery music with Lyria 3"
          >
            <Wand2 className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden sm:inline">Lyria 3</span>
            <span>AI Music</span>
          </button>

          {/* Volume slider */}
          <div className="flex items-center gap-1.5 pl-1.5 border-l border-stone-200">
            <input
              type="range"
              id="audio-volume-slider"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="w-14 sm:w-16 h-1.5 accent-amber-600 cursor-pointer bg-stone-200 rounded-lg"
              title={`Volume: ${Math.round(volume * 100)}%`}
            />
          </div>
        </div>
      </div>

      {/* Lyria 3 AI Music Generation Drawer */}
      {isAiGeneratorOpen && (
        <div
          id="lyria-generator-drawer"
          className="mt-3 pt-3 border-t border-amber-200/90 text-xs text-stone-700 font-medieval space-y-2.5 bg-amber-50/40 -mx-3 -mb-3 p-3 rounded-b-xl"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Music className="w-3.5 h-3.5 text-amber-600" />
              <span className="font-bold text-stone-900 font-cinzel text-xs">
                Lyria 3 Music Weaver (lyria-3-clip-preview)
              </span>
            </div>
            <span className="text-[10px] text-amber-800 bg-amber-100/70 px-1.5 py-0.5 rounded border border-amber-300">
              30s Seamless Loop
            </span>
          </div>

          <p className="text-[11px] text-stone-600 leading-relaxed">
            Compose original mystery game soundtracks using Google's <strong>Lyria 3</strong> music generation model. Generated tracks will automatically loop continuously in the background.
          </p>

          <div className="flex gap-2 flex-col sm:flex-row">
            <input
              type="text"
              id="input-lyria-prompt"
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="Describe your mystery game track (e.g. crystal bells, enchanted temple, puzzle solve)..."
              className="flex-1 px-3 py-1.5 rounded-lg border border-stone-300 bg-white text-stone-900 text-xs focus:outline-none focus:border-amber-400 font-medieval"
            />
            <button
              type="button"
              id="btn-generate-lyria-track"
              onClick={handleGenerateLyriaMusic}
              disabled={isGeneratingMusic || !aiPrompt.trim()}
              className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 text-stone-950 font-cinzel font-bold text-xs shadow-2xs hover:brightness-105 disabled:opacity-50 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {isGeneratingMusic ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Weaving Track...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-3.5 h-3.5" />
                  <span>Generate Track</span>
                </>
              )}
            </button>
          </div>

          {/* Quick preset suggestions */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[10px] text-stone-500 font-cinzel uppercase">Ideas:</span>
            {promptPresets.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setAiPrompt(preset)}
                className="text-[10px] px-2 py-0.5 rounded-full bg-white border border-stone-200 text-stone-600 hover:border-amber-400 hover:text-amber-900 transition-colors cursor-pointer"
              >
                {preset}
              </button>
            ))}
          </div>

          {/* Feedback & status */}
          {aiErrorMessage && (
            <div className="p-2 rounded-lg bg-amber-100/90 border border-amber-300 text-amber-900 text-[11px] flex items-start gap-1.5">
              <Info className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
              <span>{aiErrorMessage}</span>
            </div>
          )}

          {generatedTrack && !aiErrorMessage && (
            <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-900 text-[11px] flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Now Playing: <strong>{generatedTrack.name}</strong></span>
              </div>
              <button
                type="button"
                onClick={handleSwitchToProcedural}
                className="text-emerald-800 underline hover:text-emerald-950 font-bold ml-2 cursor-pointer"
              >
                Back to Sparkling Theme
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
