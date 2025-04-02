// src/contexts/WebSocketContext.tsx

import React, { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';

// WebSocket configuration
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || '';

// Context type definition
interface WebSocketContextValue {
  socket: Socket | null;
  isConnected: boolean;
  lastError: string | null;
  connect: () => void;
  disconnect: () => void;
  subscribeToChannel: (channelId: string) => void;
  unsubscribeFromChannel: (channelId: string) => void;
}

// Create context with default values
const WebSocketContext = createContext<WebSocketContextValue>({
  socket: null,
  isConnected: false,
  lastError: null,
  connect: () => {},
  disconnect: () => {},
  subscribeToChannel: () => {},
  unsubscribeFromChannel: () => {},
});

// Provider props type
interface WebSocketProviderProps {
  children: ReactNode;
  autoConnect?: boolean;
}

// WebSocket Provider component
export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({
                                                                      children,
                                                                      autoConnect = true
                                                                    }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [lastError, setLastError] = useState<string | null>(null);

  // Connect to WebSocket
  const connect = useCallback(() => {
    if (socket?.connected) return;

    try {
      const token = localStorage.getItem('auth_token');

      if (!token) {
        setLastError('Authentication token not found');
        return;
      }

      // Initialize socket with auth token
      const socketInstance = io(SOCKET_URL, {
        auth: {
          token
        },
        transports: ['websocket'],
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });

      // Event listeners
      socketInstance.on('connect', () => {
        console.log('WebSocket connected');
        setIsConnected(true);
        setLastError(null);
      });

      socketInstance.on('disconnect', (reason) => {
        console.log(`WebSocket disconnected: ${reason}`);
        setIsConnected(false);
      });

      socketInstance.on('connect_error', (error) => {
        console.error('WebSocket connection error:', error.message);
        setLastError(`Connection error: ${error.message}`);
        setIsConnected(false);
      });

      socketInstance.io.on('error', (error) => {
        console.error('WebSocket error:', error);
        setLastError(`Socket error: ${error instanceof Error ? error.message : String(error)}`);
      });

      setSocket(socketInstance);
    } catch (error) {
      console.error('WebSocket initialization error:', error);
      setLastError(`Initialization error: ${error instanceof Error ? error.message : String(error)}`);
    }
  }, [socket]);

  // Disconnect from WebSocket
  const disconnect = useCallback(() => {
    if (socket) {
      socket.disconnect();
      setSocket(null);
      setIsConnected(false);
    }
  }, [socket]);

  // Subscribe to a channel
  const subscribeToChannel = useCallback((channelId: string) => {
    if (socket && isConnected) {
      socket.emit('subscribe', { channelId });
      console.log(`Subscribed to channel: ${channelId}`);
    } else {
      console.warn('Cannot subscribe: Socket not connected');
    }
  }, [socket, isConnected]);

  // Unsubscribe from a channel
  const unsubscribeFromChannel = useCallback((channelId: string) => {
    if (socket && isConnected) {
      socket.emit('unsubscribe', { channelId });
      console.log(`Unsubscribed from channel: ${channelId}`);
    }
  }, [socket, isConnected]);

  // Auto-connect on mount and cleanup on unmount
  useEffect(() => {
    if (autoConnect) {
      connect();
    }

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [autoConnect, connect, socket]);

  // Context value
  const contextValue: WebSocketContextValue = {
    socket,
    isConnected,
    lastError,
    connect,
    disconnect,
    subscribeToChannel,
    unsubscribeFromChannel,
  };

  return (
    <WebSocketContext.Provider value={contextValue}>
      {children}
      </WebSocketContext.Provider>
  );
};

// Custom hook to use the WebSocket context
export const useWebSocket = (): WebSocketContextValue => {
  const context = useContext(WebSocketContext);

  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }

  return context;
};