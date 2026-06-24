# Use a lightweight version of Node.js for a smaller, more secure image
FROM node:24-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first
# Interview Tip: Doing this before copying the rest of the code takes advantage of Docker's layer caching. 
# It prevents npm install from running again unless your dependencies actually change!
COPY package*.json ./

# Install dependencies (only production dependencies if you want to be extra optimized)
RUN npm install

# Copy the rest of your application code (like index.js)
COPY . .

# Expose the port your app runs on (matching your index.js process.env.PORT || 5000)
EXPOSE 5000

# Command to run the application
CMD ["npm", "start"]