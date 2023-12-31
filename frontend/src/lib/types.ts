export interface User {
  id: number;
  username: string;
  bio: string;
  avatarUrl?: string;
}

export interface Member {
  userId: number;
  channelId: number;
  dateJoined: string;
  user: User;
}

export interface Chat {
  id: number;
  messages: Message[];
  member1: User;
  member2: User;
}

export interface Channel {
  id: number;
  name: string;
  about: string;
  iconUrl?: string;
  createdAt: string;
  creatorId: number;
  members: Member[];
  messages: Message[];
}

export interface Message {
  id: number;
  text: string;
  timestamp: string;
  channelId: number;
  senderId: number;
  sender: User
}
