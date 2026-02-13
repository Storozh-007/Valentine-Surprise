export interface LoveNote {
  id: string;
  title: string;
  content: string;
  emoji: string;
  isOpen: boolean;
}

export interface GeneratedCompliment {
  text: string;
  mood: 'romantic' | 'funny' | 'poetic';
}

export type ViewState = 'landing' | 'gallery' | 'generator';
