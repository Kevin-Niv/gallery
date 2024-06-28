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
                    // Install nvm
                    sh 'mkdir -p $HOME/.nvm'
                    sh 'curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash'

                    // Configure nvm
                    sh '''
                    export NVM_DIR="$HOME/.nvm"
                    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
                    [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
                    '''

                    // Load nvm
                    sh 'source $HOME/.nvm/nvm.sh'

                    // Install Node.js
                    sh 'nvm install node'

                    // Verify Node.js and npm installation
                    sh 'node --version'
                    sh 'npm --version'
                }
            }
        }

        // Remaining stages as before...
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
