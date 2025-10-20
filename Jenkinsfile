pipeline {
    agent 
    
    environment {
        REGISTRY = 'registry.milasholsting.dk'
        IMAGE_NAME = 'projekt-newsify'
        IMAGE_TAG = "${env.BUILD_NUMBER}"
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                script {
                    if (fileExists('bun.lock')) {
                        sh 'bun install'
                    } else {
                        sh 'npm install'
                    }
                }
            }
        }
        
        stage('Build App') {
            steps {
                sh 'npm run build'  // Or 'bun run build' if using Bun
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build("${REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}")
                }
            }
        }
        
        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry("https://${REGISTRY}", 'registry-credentials') {
                        dockerImage.push()
                        dockerImage.push('latest')
                    }
                }
            }
        }
    }
    
    post {
        always {
            sh 'docker system prune -f'
        }
    }
}