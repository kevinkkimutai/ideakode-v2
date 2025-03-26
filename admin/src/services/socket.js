import { io } from 'socket.io-client';

// Define the WebSocket server URL
const SOCKET_URL = 'http://localhost:2200';

// Function to initialize the socket with a user ID
export const initializeSocket = (userId) => {
  const socket = io(SOCKET_URL, {
    query: { userId }, // Pass the user ID to the server
    autoConnect: true, // Automatically connect when the socket is created
    reconnection: true, // Enable reconnection
    reconnectionAttempts: 5, // Number of reconnection attempts
    reconnectionDelay: 3000, // Delay between reconnection attempts
  });

  // Event listener for successful connection
  socket.on('connect', () => {
    console.log(`Connected to WebSocket server ${userId}`);
  });

  // Event listener for disconnection
  socket.on('disconnect', () => {
    console.log('Disconnected from WebSocket server');
  });

  // Event listener for connection errors
  socket.on('connect_error', (error) => {
    console.error('WebSocket connection error:', error);
  });

  return socket;
};