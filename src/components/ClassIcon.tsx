import {
  Shield,
  Wand2,
  Zap,
  Target,
  Sun,
  HeartHandshake,
  Trees,
  Music,
  Flame,
  Feather,
  Swords,
  Crosshair,
  Scroll,
  Eye,
  Activity,
} from 'lucide-react';
import { FantasyClassType } from '../types';

interface ClassIconProps {
  characterClass: FantasyClassType;
  className?: string;
}

export function ClassIcon({ characterClass, className = 'w-6 h-6' }: ClassIconProps) {
  switch (characterClass) {
    case 'Warrior':
      return <Shield className={className} />;
    case 'Mage':
      return <Wand2 className={className} />;
    case 'Rogue':
      return <Zap className={className} />;
    case 'Ranger':
      return <Target className={className} />;
    case 'Paladin':
      return <Sun className={className} />;
    case 'Cleric':
      return <HeartHandshake className={className} />;
    case 'Druid':
      return <Trees className={className} />;
    case 'Bard':
      return <Music className={className} />;
    case 'Warlock':
      return <Flame className={className} />;
    case 'Monk':
      return <Feather className={className} />;
    case 'Kshatriya':
      return <Swords className={className} />;
    case 'Dhanurdhar':
      return <Crosshair className={className} />;
    case 'Rishi':
      return <Scroll className={className} />;
    case 'Mayavi':
      return <Eye className={className} />;
    case 'Yogi':
      return <Activity className={className} />;
    default:
      return <Shield className={className} />;
  }
}
