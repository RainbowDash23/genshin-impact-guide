export type Element = 'anemo' | 'geo' | 'electro' | 'dendro' | 'hydro' | 'pyro' | 'cryo';

export interface Quest {
  id: number;
  name: string;
  zone: string;
  location: string;
  requirements: string;
  details: string;
}

export interface Region {
  id: string;
  name: string;
  description: string;
  element: Element;
  color: string;
  accentColor: string;
  emblem: string;
  zones: string[];
  quests: Quest[];
}
