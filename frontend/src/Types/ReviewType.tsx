export type User = {
  id?: number;
  name: string;
};

export type Review = {
  id: number;
  createdAt?: string;
  game?: string;
  rating: number;
  review: string;
  platform?: string;
  platforms?: string[];
  user: User;
};
