pipeline {
    agent any
    
    tools {
        nodejs "node"
    }
    
    environment {
        NGROK_URL = 'https://67d2-41-90-179-216.ngrok-free.app'
    }
    
    stages {
        stage('Cloning Git') {
            steps {
                git url: "https://github.com/c-kiplimo/gallery", branch: "master"
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Start Servers and Expose via Ngrok') {
            steps {
                script {
                    echo "Ngrok URL: ${env.NGROK_URL}"
                    sh 'nohup node server.js'
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
