# shurltly

Steps to run Shurltly as a containerized app using Docker:

1. copy files to your machine
```
git clone https://github.com/christocarr/shurltly.git
```

2. build images for server and client
```
docker build -t "react-app" ./client/
docker build -t "server" ./server/
```

3. run docker-compose
```
docker-compose up
```
