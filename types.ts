
export enum MoodState {
  INITIAL = 'INITIAL',
  ANGRY = 'ANGRY',
  VENTING = 'VENTING',
  BREATHING = 'BREATHING',
  ZEN = 'ZEN',
  CALMED = 'CALMED'
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface ZenParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}
