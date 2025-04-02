import { Socket } from 'socket.io-client';

export interface BaseEvent {
  id: string;
  timestamp: string;
}

export interface MessageEvent extends BaseEvent {
  sender: string;
  content: string;
  channelId: string;
}

export interface NotificationEvent extends BaseEvent {
  type: string;
  message: string;
}

export interface WebSocketContextValue {
  socket: Socket | null;
  isConnected: boolean;
  lastError: string | null;
  connect: () => void;
  disconnect: () => void;
  subscribeToChannel: (channelId: string) => void;
  unsubscribeFromChannel: (channelId: string) => void;
}