export type Role = 'USER' | 'ADMIN' | 'MODERATOR';

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
}

export interface Channel {
  id: string;
  name: string;
  description?: string;
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  content: string;
  userId: string;
  channelId: string;
  user?: User;
  createdAt: string;
  updatedAt: string;
}

export interface AuthPayload {
  user: User;
  token: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface CreateMessageDto {
  content: string;
  channelId: string;
}

export interface CreateChannelDto {
  name: string;
  description?: string;
  isPrivate?: boolean;
}
