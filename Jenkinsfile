pipeline {
    agent any

    environment {
        NPM_CONFIG_LOGLEVEL = 'warn'
        NGROK_URL = 'https://d3e7-105-163-157-223.ngrok-free.app'
    }

    stages {
        stage('Setup') {
            steps {
                script {
                    // Install Node.js using nvm (Node Version Manager)
                    sh 'curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash'
                    sh 'export NVM_DIR="$HOME/.nvm"'
                    sh '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"'
                    sh '[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"'
                    sh 'nvm install node'

                    // Verify Node.js and npm installation
                    sh 'node --version'
                    sh 'npm --version'
                }
            }
        }

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Use Ngrok for Webhook Testing') {
            steps {
                script {
                    echo "Ngrok URL: ${env.NGROK_URL}"
                    sh 'node server.js --webhook ${env.NGROK_URL}/webhook'
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up...'
            cleanWs()
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
