export interface User {
  id: number;
  username: string;
  bio: string;
  avatarUrl?: string;
}

export interface Chat {
  id: number;
  users: User[];
}

export interface Channel {
  id: number;
  name: string;
  about: string;
  iconUrl?: string;
  createdAt: Date;
  creatorId: string;
  members: User[];
  messages: Message[];
}

export interface Message {
  id: number;
  text: string;
  timestamp: Date;
  channelId: number;
  senderId: number;
  sender: User
}
