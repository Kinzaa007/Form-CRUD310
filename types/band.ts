export type Member = {
  id: number;
  name: string;
  role: string;
  image?: string; // Add this field
};

export type Band = {
  id: number;
  name: string;
  genre: string;
  image: string;
  members: Member[];
};