// Web Audio API procedural Sparkling Gaming Mystery Soundtrack Engine
// Handcrafted to deliver an engaging, non-sleepy, sparkling adventure mystery game atmosphere.
// Features clockwork mystery pizzicato bass, sparkling crystal celesta arpeggios,
// shimmering stardust echoes, and curious puzzle-solving melodic motifs.

export interface AudioTrackInfo {
  id: string;
  name: string;
  description: string;
  tempoBpm: number;
}

export const GAMING_MYSTERY_TRACK: AudioTrackInfo = {
  id: 'gaming_mystery',
  name: 'Relic of Whispers (Sparkling Mystery)',
  description: 'Sparkling crystal celesta, curious pizzicato mystery pulse, and enchanted puzzle-game arpeggios.',
  tempoBpm: 114,
};

class GamingMysteryAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private delayNode: DelayNode | null = null;
  private delayFeedbackGain: GainNode | null = null;
  private delayFilter: BiquadFilterNode | null = null;
  
  private isRunning: boolean = false;
  private currentVolume: number = 0.4;
  private stepIndex: number = 0;
  private nextNoteTime: number = 0;
  private schedulerTimer: ReturnType<typeof setInterval> | null = null;
  private customAudio: HTMLAudioElement | null = null;
  private isCustomTrackActive: boolean = false;
  private customTrackName: string = '';

  private listeners: Set<(isPlaying: boolean) => void> = new Set();

  public subscribe(callback: (isPlaying: boolean) => void): () => void {
    this.listeners.add(callback);
    callback(this.isRunning);
    return () => {
      this.listeners.delete(callback);
    };
  }

  private notify(isPlaying: boolean) {
    this.listeners.forEach((fn) => {
      try {
        fn(isPlaying);
      } catch (err) {
        console.error('Audio listener error:', err);
      }
    });
  }

  private initContext(): AudioContext | null {
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    return this.ctx;
  }

  public async resumeIfSuspended(): Promise<void> {
    if (this.ctx && this.ctx.state === 'suspended') {
      try {
        await this.ctx.resume();
      } catch (e) {
        console.warn('AudioContext resume failed:', e);
      }
    }
    if (this.customAudio && this.isCustomTrackActive && this.isRunning && this.customAudio.paused) {
      try {
        await this.customAudio.play();
      } catch {
        // user interaction might be pending
      }
    }
  }

  // Sparkling Gaming Mystery Notes in C-Minor / Dorian Mystical Harmony
  // Chords: C minor 9 -> Ab maj7#11 -> F minor 9 -> G7 altered
  private getChordNotes(measure: number): { root: number; arpScale: number[]; leadNote?: number } {
    const chordIndex = Math.floor(measure / 2) % 4;
    switch (chordIndex) {
      case 0: // C minor 9 (Intriguing, deep mystery)
        return {
          root: 130.81, // C3
          arpScale: [523.25, 622.25, 783.99, 932.33, 1174.66, 1244.51, 1567.98], // C5, Eb5, G5, Bb5, D6, Eb6, G6
          leadNote: [783.99, 932.33, 1046.5, 1174.66][measure % 4],
        };
      case 1: // Ab maj7#11 (Magical wonder / sparkling discovery)
        return {
          root: 103.83, // Ab2
          arpScale: [415.3, 523.25, 622.25, 783.99, 1046.5, 1174.66, 1661.22], // Ab4, C5, Eb5, G5, C6, D6, Ab6
          leadNote: [1046.5, 932.33, 783.99, 622.25][measure % 4],
        };
      case 2: // F minor 9 (Enchanted labyrinth / curious passage)
        return {
          root: 87.31, // F2
          arpScale: [349.23, 415.3, 523.25, 622.25, 698.46, 830.61, 1046.5], // F4, Ab4, C5, Eb5, F5, Ab5, C6
          leadNote: [698.46, 783.99, 830.61, 1046.5][measure % 4],
        };
      case 3: // G7sus altered (Tension / secret about to be unlocked)
      default:
        return {
          root: 98.0, // G2
          arpScale: [392.0, 493.88, 587.33, 783.99, 987.77, 1174.66, 1479.98], // G4, B4, D5, G5, B5, D6, F#6
          leadNote: [1174.66, 987.77, 880.0, 783.99][measure % 4],
        };
    }
  }

  // Play a clockwork mystery pizzicato bass / marimba note
  private scheduleBassNote(time: number, freq: number) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const subOsc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, time);

    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(freq * 0.5, time);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, time);
    filter.frequency.exponentialRampToValueAtTime(140, time + 0.22);
    filter.Q.setValueAtTime(4.0, time);

    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(0.24, time + 0.006);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.26);

    osc.connect(filter);
    subOsc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    subOsc.start(time);
    osc.stop(time + 0.28);
    subOsc.stop(time + 0.28);
  }

  // Play a sparkling crystal celesta / music box chime with stereo bounce
  private scheduleCrystalChime(time: number, freq: number, panX: number, volumeMul = 1) {
    if (!this.ctx || !this.masterGain) return;

    const fundamental = this.ctx.createOscillator();
    const overtone = this.ctx.createOscillator();
    const sparkle = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const panner = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;

    fundamental.type = 'sine';
    fundamental.frequency.setValueAtTime(freq, time);

    // Glockenspiel / crystal bell metallic overtone (2.75x)
    overtone.type = 'triangle';
    overtone.frequency.setValueAtTime(freq * 2.756, time);

    // High fairy sparkle shimmer overtone (4.12x)
    sparkle.type = 'sine';
    sparkle.frequency.setValueAtTime(freq * 4.12, time);

    const targetGain = 0.09 * volumeMul;
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(targetGain, time + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.38);

    fundamental.connect(gain);
    overtone.connect(gain);
    sparkle.connect(gain);

    if (panner) {
      panner.pan.setValueAtTime(panX, time);
      gain.connect(panner);
      panner.connect(this.masterGain);
      if (this.delayNode) {
        panner.connect(this.delayNode);
      }
    } else {
      gain.connect(this.masterGain);
      if (this.delayNode) {
        gain.connect(this.delayNode);
      }
    }

    fundamental.start(time);
    overtone.start(time);
    sparkle.start(time);

    fundamental.stop(time + 0.42);
    overtone.stop(time + 0.42);
    sparkle.stop(time + 0.42);
  }

  // Curious mystery flute / whistling bell lead motif
  private scheduleMysteryLead(time: number, freq: number) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const vibrato = this.ctx.createOscillator();
    const vibratoGain = this.ctx.createGain();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);

    // Warm, curious vibrato at 5.5 Hz
    vibrato.frequency.setValueAtTime(5.5, time);
    vibratoGain.gain.setValueAtTime(freq * 0.018, time);
    vibrato.connect(vibratoGain);
    vibratoGain.connect(osc.frequency);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(freq * 1.5, time);
    filter.Q.setValueAtTime(2.0, time);

    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(0.12, time + 0.06);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.7);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    if (this.delayNode) {
      gain.connect(this.delayNode);
    }

    vibrato.start(time);
    osc.start(time);
    vibrato.stop(time + 0.75);
    osc.stop(time + 0.75);
  }

  // Audio note scheduler
  private scheduleNotes() {
    if (!this.ctx || !this.isRunning) return;

    const secondsPerBeat = 60.0 / GAMING_MYSTERY_TRACK.tempoBpm;
    const sixteenthNoteDuration = secondsPerBeat / 4;
    const lookaheadSec = 0.25;

    while (this.nextNoteTime < this.ctx.currentTime + lookaheadSec) {
      const currentStep = this.stepIndex;
      const measure = Math.floor(currentStep / 16);
      const stepInMeasure = currentStep % 16;
      const { root, arpScale, leadNote } = this.getChordNotes(measure);

      // 1. Clockwork Mystery Pizzicato Bass (plays on beat 1, and syncopated beats 7, 11, 13)
      if (stepInMeasure === 0) {
        this.scheduleBassNote(this.nextNoteTime, root);
      } else if (stepInMeasure === 6) {
        this.scheduleBassNote(this.nextNoteTime, root * 1.498); // Fifth
      } else if (stepInMeasure === 10) {
        this.scheduleBassNote(this.nextNoteTime, root * 1.189); // Minor third
      } else if (stepInMeasure === 12) {
        this.scheduleBassNote(this.nextNoteTime, root * 0.89); // Leading note
      }

      // 2. Sparkling Crystal Celesta Arpeggios (continuous sparkling gaming patterns)
      const arpPatterns = [0, 2, 4, 1, 3, 5, 2, 4, 1, 3, 6, 4, 2, 5, 3, 1];
      const noteIdx = arpPatterns[stepInMeasure] % arpScale.length;
      const panX = ((stepInMeasure % 4) - 1.5) * 0.45; // Stereo bounce left <-> right
      
      // Every 16th note has an enchanted sparkling chime
      const isAccented = stepInMeasure % 4 === 0 || stepInMeasure === 6 || stepInMeasure === 14;
      this.scheduleCrystalChime(
        this.nextNoteTime,
        arpScale[noteIdx],
        panX,
        isAccented ? 1.0 : 0.65
      );

      // 3. Occasional High Stardust Shimmer (sparkling fairy dust on off-beats)
      if (stepInMeasure === 4 || stepInMeasure === 12) {
        const shimmerFreq = arpScale[(noteIdx + 3) % arpScale.length] * 2.0;
        this.scheduleCrystalChime(this.nextNoteTime + 0.04, shimmerFreq, -panX, 0.45);
      }

      // 4. Mystery Lead Motif (melodic intrigue every 4-8 steps)
      if (stepInMeasure === 8 && leadNote) {
        this.scheduleMysteryLead(this.nextNoteTime, leadNote);
      } else if (stepInMeasure === 12 && leadNote) {
        this.scheduleMysteryLead(this.nextNoteTime, leadNote * 1.122); // Curious stepping note
      }

      this.nextNoteTime += sixteenthNoteDuration;
      this.stepIndex++;
    }
  }

  public async start(volume: number = this.currentVolume): Promise<boolean> {
    const ctx = this.initContext();
    if (!ctx) return false;

    try {
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }
    } catch {
      return false;
    }

    if (this.isRunning) {
      this.stop();
    }

    this.currentVolume = volume;

    // Master Gain
    this.masterGain = ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.0001, ctx.currentTime);
    this.masterGain.gain.exponentialRampToValueAtTime(Math.max(0.01, volume), ctx.currentTime + 1.0);
    this.masterGain.connect(ctx.destination);

    // Ethereal Shimmer Delay Line (for sparkling echoes)
    this.delayNode = ctx.createDelay(1.0);
    this.delayFeedbackGain = ctx.createGain();
    this.delayFilter = ctx.createBiquadFilter();

    // Dotted 8th delay at 114 BPM (~263ms)
    this.delayNode.delayTime.setValueAtTime(0.263, ctx.currentTime);
    this.delayFeedbackGain.gain.setValueAtTime(0.32, ctx.currentTime);

    // Highpass filter so echoes stay bright and crystalline without muddy bass
    this.delayFilter.type = 'highpass';
    this.delayFilter.frequency.setValueAtTime(550, ctx.currentTime);

    this.delayNode.connect(this.delayFilter);
    this.delayFilter.connect(this.delayFeedbackGain);
    this.delayFeedbackGain.connect(this.delayNode);
    this.delayFilter.connect(this.masterGain);

    this.stepIndex = 0;
    this.nextNoteTime = ctx.currentTime + 0.08;
    this.isRunning = true;
    this.notify(true);

    // Start scheduling loop
    if (this.schedulerTimer) clearInterval(this.schedulerTimer);
    this.schedulerTimer = setInterval(() => this.scheduleNotes(), 45);

    return true;
  }

  public stop() {
    if (this.schedulerTimer) {
      clearInterval(this.schedulerTimer);
      this.schedulerTimer = null;
    }

    if (this.customAudio) {
      try {
        this.customAudio.pause();
      } catch {
        // ignore
      }
    }

    if (this.ctx && this.masterGain) {
      try {
        const now = this.ctx.currentTime;
        this.masterGain.gain.cancelScheduledValues(now);
        this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
        this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
      } catch {
        // ignore
      }
    }

    this.isRunning = false;
    this.notify(false);
  }

  public setVolume(vol: number) {
    this.currentVolume = Math.max(0, Math.min(1, vol));
    if (this.ctx && this.masterGain && this.isRunning) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(Math.max(0.0001, this.masterGain.gain.value), now);
      this.masterGain.gain.exponentialRampToValueAtTime(Math.max(0.0001, this.currentVolume), now + 0.1);
    }
    if (this.customAudio) {
      this.customAudio.volume = this.currentVolume;
    }
  }

  // Play custom track generated via Lyria 3 AI
  public playCustomTrack(audioUrl: string, trackName: string) {
    // Stop procedural synthesizer scheduler
    if (this.schedulerTimer) {
      clearInterval(this.schedulerTimer);
      this.schedulerTimer = null;
    }

    if (this.customAudio) {
      this.customAudio.pause();
      this.customAudio.src = '';
    }

    this.customAudio = new Audio(audioUrl);
    this.customAudio.loop = true;
    this.customAudio.volume = this.currentVolume;
    this.customTrackName = trackName;
    this.isCustomTrackActive = true;
    this.isRunning = true;

    this.customAudio.play().then(() => {
      this.notify(true);
    }).catch((err) => {
      console.warn('Custom track play awaiting interaction:', err);
    });
  }

  public switchToProceduralMystery() {
    if (this.customAudio) {
      try {
        this.customAudio.pause();
      } catch {
        // ignore
      }
      this.customAudio = null;
    }
    this.isCustomTrackActive = false;
    this.customTrackName = '';
    if (this.isRunning) {
      this.start(this.currentVolume);
    }
  }

  public getIsPlaying(): boolean {
    return this.isRunning;
  }

  public getIsCustomTrack(): boolean {
    return this.isCustomTrackActive;
  }

  public getCustomTrackName(): string {
    return this.customTrackName;
  }

  // Triumphant sparkling level-up fanfare
  public playLevelUpChime() {
    try {
      const ctx = this.initContext();
      if (!ctx) return;
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51]; // C5, E5, G5, C6, E6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const overtone = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        overtone.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.065);
        overtone.frequency.setValueAtTime(freq * 2, now + idx * 0.065);

        gain.gain.setValueAtTime(0.0001, now + idx * 0.065);
        gain.gain.exponentialRampToValueAtTime(0.16, now + idx * 0.065 + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.065 + 0.55);

        osc.connect(gain);
        overtone.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.065);
        overtone.start(now + idx * 0.065);
        osc.stop(now + idx * 0.065 + 0.6);
        overtone.stop(now + idx * 0.065 + 0.6);
      });
    } catch {
      // Ignore if audio permissions blocked
    }
  }
}

export const mysteriousAudio = new GamingMysteryAudioEngine();
