FROM node:20

WORKDIR /server

# Copy dependency metadata
COPY package*.json ./

# Install dependencies (this installs Express, Knex, pg, etc.)
RUN npm install

# Copy source code
COPY . .

# Expose backend port
EXPOSE 8080

# Start dev server
CMD ["npm", "run", "dev"]