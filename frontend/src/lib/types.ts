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
  users: User[];
}

export interface Channel {
  id: number;
  name: string;
  about: string;
  iconUrl?: string;
  createdAt: string;
  creatorId: string;
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
