const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const http = require('http');
const socketIo = require('socket.io');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const { sequelize } = require('./config/config');
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require("./routes/projectRoutes");
const supportCategoryRoutes = require("./routes/supportCategoryRoutes");
const policyRoutes = require("./routes/policyRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const supportTicketRoutes = require("./routes/supportTicketRoutes");
const subscriberRoutes = require("./routes/subscriberRoutes");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: ['http://localhost:3001', 'http://localhost:2200', 'http://localhost:3000', 'https://ideakode-admin.vercel.app', 'https://ideakode.vercel.app'],
    credentials: true,
  },
});

// Middleware
app.use(cookieParser());
app.use(bodyParser.json());

// CORS Configuration
const corsOptions = {
  origin: ['http://localhost:3001', 'http://localhost:2200', 'http://localhost:3000', 'https://ideakode-admin.vercel.app', 'https://ideakode.vercel.app'], 
  credentials: true,
};
app.use(cors(corsOptions));

// Attach io to the app
app.set('io', io);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Routes
app.use('/api', userRoutes);
app.use("/api", projectRoutes);
app.use('/api', supportCategoryRoutes);
app.use("/api", policyRoutes);
app.use("/api", categoryRoutes);
app.use("/api", supportTicketRoutes);
app.use("/api", subscriberRoutes);


// WebSocket connection event
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Join a room for the user (e.g., user_1, user_2)
  const userId = socket.handshake.query.userId;
  if (userId) {
    socket.join(`user_${userId}`);
    console.log("A user connected:", userId);
  }

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Sync Database
sequelize.sync({ force: false })
  .then(() => {
    console.log('Database synchronized.');
  })
  .catch(error => {
    console.error('Error syncing database:', error);
  });

// Start Server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});