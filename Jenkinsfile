pipeline {
    agent {
        kubernetes {
            yaml '''
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: jnlp
    image: jenkins/inbound-agent:latest
  - name: node
    image: node:18
    command:
    - cat
    tty: true
  - name: dind
    image: docker:dind
    securityContext:
      privileged: true
    volumeMounts:
    - name: docker-socket
      mountPath: /var/run/docker.sock
  - name: kubectl
    image: bitnami/kubectl:latest
    command:
    - cat
    tty: true
  volumes:
  - name: docker-socket
    emptyDir: {}
'''
            defaultContainer 'jnlp'
        }
    }

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
                container('node') {
                    script {
                        if (fileExists('bun.lock')) {
                            sh 'bun install'
                        } else {
                            sh 'npm install'
                        }
                    }
                }
            }
        }

        stage('Build App') {
            steps {
                container('node') {
                    sh 'npm run build'  // Or 'bun run build' if using Bun
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                container('dind') {
                    script {
                        sh "docker build -t ${REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG} ."
                    }
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                container('dind') {
                    script {
                        docker.withRegistry("https://${REGISTRY}", 'registry-credentials') {
                            dockerImage.push()
                            dockerImage.push('latest')
                        }
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                container('kubectl') {
                    sh 'kubectl apply -f infra/'
                }
            }
        }
    }

    post {
        always {
            container('dind') {
                sh 'docker system prune -f'
            }
        }
    }
}