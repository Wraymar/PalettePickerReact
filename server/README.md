# Docker Issues I ran into and the fixes I applied

This README documents all the Docker issues I ran into while building my full-stack app using Docker Compose. It includes detailed explanations of what caused each issue, the terminal commands I used to fix them, and GUI-based solutions using Docker Desktop.

## 1. Nodemon not restarting on file changes

I was making changes to my server code, and when saving the files, nodemon was not restarting the server automatically. Apparently this is a common issue when using nodemon inside Docker containers.

When using nodemon inside of a docker container, it may not restart automatically when files change. This is often due to the way file watching works in Docker.

    •	Docker doesn’t always detect file changes on your real computer (your “host machine”) the same way your local setup does.
    •	nodemon relies on something called file system events to know when files change — and inside Docker, especially on macOS or Windows, those events often don’t work properly.

Inside our nodemon.json file, the code tells nodemon to watch the current directory '.' for changes infiles with the extensions 'js' and 'json'.

{
"watch": ["."],
"ext": "js,json",
"ignore": ["node_modules"],
"legacyWatch": true,
"exec": "node index.js"
}

The legacy Watch option tells nodemon to see if anything changed instead of waiting for the system to notify if it changed. (polling)

## 2.Changes Not Reflected After Running docker-compose up

❌ Problem:

Changes to code or Dockerfiles weren’t showing up when running docker-compose up. It was using stale builds.

✅ Fix:

Terminal:

docker-compose down --volumes --remove-orphans

### Stops and removes all containers, volumes, and orphans

docker-compose build

### Rebuilds your images with the latest code

docker-compose up

### Starts fresh containers from updated images

Docker Desktop: 1. Stop and delete containers from the Containers tab. 2. Delete outdated images from the Images tab. 3. Restart using the rebuilt images.

⸻

## 3. Unexpected client/ Folder Created

❌ Problem:

A new client/ folder appeared in my project root after a Docker build.

✅ Fix:

This happened because my docker-compose.yml referenced a build.context pointing to a non-existent client/ folder.

✅ I fixed this by:
• Making sure that all referenced paths in docker-compose.yml actually exist.
• Verifying that context: ./client or similar is valid.

⸻

## 4. Docker Images Were Too Large (~1.6 GB)

❌ Problem:

Docker images were taking up lots of space.

🧠 Why It Happens:

The node:20 base image includes everything, including the full OS. Adding dependencies and build tools makes the image even larger.

✅ Fix:
• Switched to a smaller base image like node:20-alpine.
• Created a .dockerignore in the root:

node_modules
.env
npm-debug.log
Dockerfile
docker-compose.yml

    •	Considered using multi-stage builds for production images.

⸻

## 5. Unable to Delete Docker Images

❌ Problem:

Docker wouldn’t let me delete images because they were still in use.

✅ Fix:

Terminal:

docker ps -a

### List all containers

docker stop <container_id>
docker rm <container_id>

### Stop and remove containers using the image

docker rmi <image_id>

### Remove the image now that nothing is using it

To clean everything:

docker system prune -a

### WARNING: This deletes unused containers, images, and volumes

Docker Desktop: 1. In Containers, stop and remove containers. 2. In Images, delete the now-unused image.

⸻

## 6. PostgreSQL Database Connection Issues

❌ Problem:

Errors like connection refused or database does not exist when trying to connect to the database.

✅ Fix:
• Made sure the Postgres container was up (checked docker ps).
• Verified .env variables matched my docker-compose.yml and app settings:

POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=my_database

    •	Used host: 'db' in my connection config if the service is named db in Docker Compose.

⸻

## 7. Useful Docker Commands for Everyday Use

### Rebuild all images manually

docker-compose build

### Start all containers

docker-compose up

### Stop and remove containers

docker-compose down

### Full reset including volumes and orphan containers

docker-compose down --volumes --remove-orphans

### Show all containers (running or not)

docker ps -a

### Show all images

docker images

### Delete an image (must stop containers first)

docker rmi <image_id>

### Delete all unused data (⚠️ CAUTION!)

docker system prune -a

⸻
