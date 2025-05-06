export interface Profile {
  id: string;
  name: string;
  age: number;
  image: string;
  bio: string;
  distance: number;
}

export type SwipeDirection = 'left' | 'right' | 'up' | 'down' | null;

export interface Match {
  id: string;
  profileId: string;
  timestamp: number;
  message?: string;
}