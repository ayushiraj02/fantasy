import warriorImg from '../assets/images/warrior_portrait_1789116079560.jpg';
import mageImg from '../assets/images/mage_portrait_1789116104075.jpg';
import rogueImg from '../assets/images/rogue_portrait_1789116122313.jpg';
import rangerImg from '../assets/images/ranger_portrait_1789116136755.jpg';
import paladinImg from '../assets/images/paladin_portrait_1789116153521.jpg';
import clericImg from '../assets/images/cleric_portrait_1789116183918.jpg';
import druidImg from '../assets/images/druid_portrait_1789116202023.jpg';
import bardImg from '../assets/images/bard_portrait_1789116220259.jpg';
import warlockImg from '../assets/images/warlock_portrait_1789116233174.jpg';
import monkImg from '../assets/images/monk_portrait_1789116255895.jpg';
import kshatriyaImg from '../assets/images/kshatriya_portrait_1789117211146.jpg';
import dhanurdharImg from '../assets/images/dhanurdhar_portrait_1789117226178.jpg';
import rishiImg from '../assets/images/rishi_portrait_1789117238878.jpg';
import mayaviImg from '../assets/images/mayavi_portrait_1789117254196.jpg';
import yogiImg from '../assets/images/yogi_portrait_1789117274143.jpg';
import { FantasyClassType } from '../types';

export const CLASS_PORTRAIT_IMAGES: Record<FantasyClassType, string> = {
  Warrior: warriorImg,
  Mage: mageImg,
  Rogue: rogueImg,
  Ranger: rangerImg,
  Paladin: paladinImg,
  Cleric: clericImg,
  Druid: druidImg,
  Bard: bardImg,
  Warlock: warlockImg,
  Monk: monkImg,
  Kshatriya: kshatriyaImg,
  Dhanurdhar: dhanurdharImg,
  Rishi: rishiImg,
  Mayavi: mayaviImg,
  Yogi: yogiImg,
};

// Generates an adventure cartoon avatar URL based on seed
export function getDiceBearPortraitUrl(seed: string, classType: FantasyClassType, variant: number): string {
  // Use Adventurer style tailored to character name and class
  const cleanSeed = encodeURIComponent(`${seed}_${classType}_var${variant}`);
  return `https://api.dicebear.com/9.x/adventurer/svg?seed=${cleanSeed}&radius=16`;
}
