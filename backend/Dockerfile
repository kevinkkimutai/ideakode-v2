# Use an official Node.js image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (for caching layers)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of your application
COPY . .

# Set environment variables (optional)
ENV PORT=3000

# Expose the port your app runs on
EXPOSE 3000

# Command to start your application
CMD ["node", "server.js"]
