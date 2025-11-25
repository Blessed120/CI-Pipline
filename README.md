# CI/CD Pipeline with Node.js, Jenkins, Docker & AWS EC2

This project demonstrates a complete CI/CD setup using:
- Node.js (application)
- Docker (containerization)
- Jenkins (CI/CD automation)
- AWS EC2 (server deployment)
- GitHub (source code)

## Pipeline Flow

1. Developer pushes code → GitHub
2. Jenkins pulls latest code
3. Jenkins runs tests
4. Jenkins builds Docker image
5. Image is pushed to Docker Hub
6. Jenkins deploys the container on EC2

## Deployment

SSH into EC2:
```sh
ssh ubuntu@<EC2-IP>
docker ps
