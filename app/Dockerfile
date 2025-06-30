# Base image
FROM node:20

# Set working directory
WORKDIR /app

# Copy dependency files first
COPY package*.json ./

# Install dependencies (this installs Vite, React, etc.)
RUN npm install

# Copy rest of the client code
COPY . .

# Expose Vite's dev port
EXPOSE 5173

# Start dev server
CMD ["npm", "run", "dev"]