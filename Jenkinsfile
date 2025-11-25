pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('docker-hub')
        IMAGE_NAME = "yourdockerhubusername/yourrepository:latest"
        EC2_HOST = "ubuntu@EC2_PUBLIC_IP"
        SSH_KEY = credentials('ec2-ssh-key')
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/yourusername/yourrepo.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Unit Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME .'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                sh """
                    echo $DOCKERHUB_CREDENTIALS_PSW | docker login \
                    --username $DOCKERHUB_CREDENTIALS_USR --password-stdin
                """
                sh 'docker push $IMAGE_NAME'
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent(['ec2-ssh-key']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no $EC2_HOST "
                            docker pull $IMAGE_NAME &&
                            docker stop app || true &&
                            docker rm app || true &&
                            docker run -d -p 3000:3000 --name app $IMAGE_NAME
                        "
                    """
                }
            }
        }
    }
}
