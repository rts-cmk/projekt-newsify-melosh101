pipeline {
  agent {
    kubernetes {
      defaultContainer 'jnlp'
      yaml """
apiVersion: v1
kind: Pod
metadata:
  labels:
    app.kubernetes.io/name: newsify-cicd
spec:
  restartPolicy: Never
  containers:
    - name: jnlp
      image: jenkins/inbound-agent:alpine-jdk17
      imagePullPolicy: IfNotPresent
      args:
        - \$(JENKINS_SECRET)
        - \$(JENKINS_NAME)
      volumeMounts:
        - name: workspace-volume
          mountPath: /home/jenkins/agent
      workingDir: /home/jenkins/agent
    - name: kaniko
      image: gcr.io/kaniko-project/executor:latest
      imagePullPolicy: IfNotPresent
      command:
        - cat
      tty: true
      volumeMounts:
        - name: workspace-volume
          mountPath: /home/jenkins/agent
      workingDir: /home/jenkins/agent
    - name: kubectl
      image: bitnami/kubectl:1.29.3
      imagePullPolicy: IfNotPresent
      command:
        - cat
      tty: true
      volumeMounts:
        - name: workspace-volume
          mountPath: /home/jenkins/agent
      workingDir: /home/jenkins/agent
  volumes:
    - name: workspace-volume
      emptyDir: {}
"""
    }
  }

  options {
    // timestamps()
    disableConcurrentBuilds()
  }

  parameters {
    string(name: 'REGISTRY_SCHEME', defaultValue: 'https', description: 'Scheme to use when authenticating to the registry (https or http).')
    string(name: 'REGISTRY_HOST', defaultValue: 'registry.example.com', description: 'Docker registry host (e.g. ghcr.io).')
    string(name: 'IMAGE_NAMESPACE', defaultValue: 'team', description: 'Optional namespace/organisation within the registry (leave blank if not required).')
    string(name: 'IMAGE_NAME', defaultValue: 'newsify-app', description: 'Image name without tag.')
    string(name: 'IMAGE_TAG', defaultValue: '', description: 'Optional image tag override; leave blank to use the short commit SHA.')
    credentials(name: 'DOCKER_REGISTRY_CREDENTIALS', description: 'Jenkins credential ID with Docker registry username and password.')
    credentials(name: 'KUBECONFIG_CREDENTIALS', description: 'Jenkins credential ID containing the kubeconfig file for the target cluster.')
    string(name: 'KUBE_CONTEXT', defaultValue: '', description: 'Optional kubeconfig context to use (leave blank to keep default).')
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Prepare Metadata') {
      steps {
        script {
          if (!params.REGISTRY_SCHEME?.trim()) {
            error 'REGISTRY_SCHEME parameter must be provided.'
          }
          if (!params.REGISTRY_HOST?.trim()) {
            error 'REGISTRY_HOST parameter must be provided.'
          }
          if (!params.IMAGE_NAME?.trim()) {
            error 'IMAGE_NAME parameter must be provided.'
          }
          if (!params.DOCKER_REGISTRY_CREDENTIALS?.trim()) {
            error 'DOCKER_REGISTRY_CREDENTIALS parameter must be set to a valid Jenkins credentials ID.'
          }
          if (!params.KUBECONFIG_CREDENTIALS?.trim()) {
            error 'KUBECONFIG_CREDENTIALS parameter must be set to a valid Jenkins credentials ID.'
          }

          def registryScheme = params.REGISTRY_SCHEME.trim().toLowerCase()
          if (!(registryScheme in ['https', 'http'])) {
            error "Unsupported REGISTRY_SCHEME '${registryScheme}'. Use http or https."
          }

          env.REGISTRY_SCHEME = registryScheme
          env.REGISTRY_HOST = params.REGISTRY_HOST.trim()

          def nameSpace = params.IMAGE_NAMESPACE?.trim()
          def imageName = params.IMAGE_NAME.trim()
          if (nameSpace) {
            env.IMAGE_PATH = "${nameSpace}/${imageName}"
          } else {
            env.IMAGE_PATH = imageName
          }

          def commitTag = env.GIT_COMMIT ? env.GIT_COMMIT.take(12) : null
          def imageTag = params.IMAGE_TAG?.trim() ? params.IMAGE_TAG.trim() : (commitTag ?: env.BUILD_NUMBER)

          env.IMAGE_TAG = imageTag
          env.IMAGE_REFERENCE = "${env.REGISTRY_HOST}/${env.IMAGE_PATH}:${imageTag}"
          env.IMAGE_REFERENCE_LATEST = "${env.REGISTRY_HOST}/${env.IMAGE_PATH}:latest"
          env.APP_DIR = "${env.WORKSPACE}/app"
          env.INFRA_DIR = "${env.WORKSPACE}/infra"
          env.KUBE_CONTEXT = params.KUBE_CONTEXT?.trim() ?: ''

          echo "Image references: ${env.IMAGE_REFERENCE} and ${env.IMAGE_REFERENCE_LATEST}"
        }
      }
    }

    stage('Build & Push Image') {
      steps {
        container('kaniko') {
          withCredentials([
            usernamePassword(
              credentialsId: params.DOCKER_REGISTRY_CREDENTIALS,
              usernameVariable: 'DOCKER_USERNAME',
              passwordVariable: 'DOCKER_PASSWORD'
            )
          ]) {
            sh '''
set -euo pipefail
if [ ! -d "${APP_DIR}" ]; then
  echo "Expected application directory '${APP_DIR}' is missing." >&2
  exit 1
fi

mkdir -p /kaniko/.docker
AUTH_B64="$(printf "%s" "${DOCKER_USERNAME}:${DOCKER_PASSWORD}" | base64 | tr -d '\n')"
cat <<EOF > /kaniko/.docker/config.json
{
  "auths": {
    "${REGISTRY_SCHEME}://${REGISTRY_HOST}": {
      "auth": "${AUTH_B64}"
    }
  }
}
EOF

/kaniko/executor \
  --context "${APP_DIR}" \
  --dockerfile "${APP_DIR}/Dockerfile" \
  --destination "${IMAGE_REFERENCE}" \
  --destination "${IMAGE_REFERENCE_LATEST}" \
  --verbosity info
            '''
          }
        }
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        container('kubectl') {
          withCredentials([
            file(credentialsId: params.KUBECONFIG_CREDENTIALS, variable: 'KUBECONFIG_FILE')
          ]) {
            sh '''
set -euo pipefail
if [ ! -d "${INFRA_DIR}" ]; then
  echo "Expected infra directory '${INFRA_DIR}' is missing." >&2
  exit 1
fi

export KUBECONFIG="${KUBECONFIG_FILE}"
if [ -n "${KUBE_CONTEXT}" ]; then
  kubectl config use-context "${KUBE_CONTEXT}"
fi

kubectl version --client
kubectl apply -f "${INFRA_DIR}/"
            '''
          }
        }
      }
    }
  }

  post {
    success {
      echo "Successfully built ${env.IMAGE_REFERENCE} and applied manifests from ${env.INFRA_DIR}."
    }
    always {
      cleanWs()
    }
  }
}
