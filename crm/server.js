const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const http = require('http');
const socketIo = require('socket.io');
// const cookieParser = require('cookie-parser');
require('dotenv').config();
require('./jobs/notifyOverdueTasks');

const { sequelize } = require('./config/config');
const userRoutes = require('./routes/userRoutes');
const customerRoutes = require("./routes/customerRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const roleRoutes = require("./routes/roleRoutes");
const addressRoutes = require("./routes/addressRoutes");
const auditLogRoutes = require("./routes/auditLogRoutes");
const callRoutes = require("./routes/callRoutes");
const contactRoutes = require("./routes/contactRoutes");
const emailRoutes = require("./routes/emailRoutes");
const leadRoutes = require("./routes/leadRoutes");
const invoiceItemRoutes = require("./routes/invoiceItemRoutes");
const meetingParticipantsRoutes = require("./routes/meetingParticipantRoutes");
const opportunityRoutes = require("./routes/opportunityRoutes");
const paymentMethodRoutes = require("./routes/paymentMethodRoutes");
const pipelineRoutes = require("./routes/pipelineRoutes");
const productCategoryRoutes = require("./routes/productCategoryRoutes");
const projectRoutes = require("./routes/projectRoutes");
const projectTaskRoutes = require("./routes/projectTaskRoutes");
const QuoteRoutes = require("./routes/QuoteRoutes");
const QuoteItemRoutes = require("./routes/QuoteItemRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const stageRoutes = require("./routes/stageRoutes");
const taxRateRoutes = require("./routes/taxRateRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const ticketAttachmentRoutes = require("./routes/ticketAttachmentRoutes");
const ticketCategoryRoutes = require("./routes/ticketCategoryRoutes");
const ticketCommentRoutes = require("./routes/ticketCommentRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const productSubCategoryRoutes = require("./routes/productSubCategoryRoutes");
const productRoutes =   require("./routes/productRoutes");


const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: ['http://localhost:3001', 'http://localhost:2200', 'http://localhost:3000', 'https://ideakode-admin.vercel.app', 'https://ideakode.vercel.app', 'https://www.netiqa.co.ke', 'https://netiqa.co.ke', 'https://admin.netiqa.co.ke' ],
    credentials: true,
  },
});

// Middleware
// app.use(cookieParser());
app.use(bodyParser.json());

// CORS Configuration
const corsOptions = {
  origin: ['http://localhost:3001', 'http://localhost:2200', 'http://localhost:3000', 'https://ideakode-admin.vercel.app', 'https://ideakode.vercel.app',  'https://www.netiqa.co.ke', 'https://netiqa.co.ke', 'https://admin.netiqa.co.ke'], 
  credentials: true,
};
app.use(cors(corsOptions));

// Attach io to the app
app.set('io', io);
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Routes
app.use('/api', userRoutes);
app.use('/api', customerRoutes);
app.use('/api', invoiceRoutes);
app.use('/api', transactionRoutes);
app.use('/api', roleRoutes);
app.use('/api', addressRoutes);
app.use("/api", auditLogRoutes);
app.use("/api", callRoutes);
app.use("/api", contactRoutes);
app.use("/api", emailRoutes);
app.use("/api", leadRoutes);
app.use("/api", invoiceItemRoutes);
app.use("/api", meetingParticipantsRoutes);
app.use("/api", opportunityRoutes);
app.use("/api", paymentMethodRoutes);
app.use("/api", pipelineRoutes);
app.use("/api", productCategoryRoutes);
app.use("/api", productSubCategoryRoutes);
app.use("/api", productRoutes);
app.use("/api", projectRoutes);
app.use("/api", projectTaskRoutes);
app.use("/api", QuoteRoutes);
app.use("/api", QuoteItemRoutes);
app.use("/api", settingsRoutes);
app.use("/api", stageRoutes);
app.use("/api", taxRateRoutes);
app.use("/api", ticketRoutes);
app.use("/api", ticketAttachmentRoutes);
app.use("/api", ticketCategoryRoutes);
app.use("/api", ticketCommentRoutes);
app.use("/api", notificationRoutes);


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