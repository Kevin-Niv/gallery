pipeline {
    agent any
    
    tools {
        nodejs "nodejs"
    }
         
    stages {
        stage('Cloning Git') {
            steps {
                git url: "https://github.com/Kevin-Niv/gallery", branch: "master"
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
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
