export interface User {
  id: string;
  username: string;
  bio: string;
  avatarUrl?: string;
}

export interface Chat {
  id: number;
  users: User[];
}

export interface Channel {
  id: string;
  name: string;
  about: string;
  iconUrl?: string;
  createdAt: Date;
  creatorId: string;
  members: User[];
}

export interface Message {}
