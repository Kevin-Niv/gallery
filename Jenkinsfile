pipeline {
    agent any
    
    tools {
        nodejs "nodejs"
    }
    
    environment {
        RENDER_APP_NAME = 'gallery'
        SLACK_CHANNEL = 'kevin_ip1'
        SLACK_CREDENTIALS_ID = 'SLACK-TOKEN-API'
        EMAIL_RECIPIENT = 'kevin.kipkemei@student.moringaschool.com'
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

        stage('Building project') {
            steps {
                echo 'Building Project Stage !'
                sh 'npm run build'
            }
        }

        stage('Start Application') {
            steps {
                echo 'Starting Application'
                sh 'npm start &'
                sleep 10
            }
        }

        stage('Run Tests') {
            steps {
                echo 'Running Tests on test'
                sh 'npm test'
            }
        }
        
        stage('Deploy to Render') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'render_api_key', variable: 'RENDER_API_KEY')]) {
                        sh "curl -X POST -H 'Authorization: Bearer \${RENDER_API_KEY}' \
                            -H 'Content-Type: application/json' \
                            -d '{\"branch\": \"master\", \"env\": {\"NODE_ENV\": \"production\"}}' \
                            https://api.render.com/v1/services/${RENDER_APP_NAME}/deploy"
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
            script {
                echo 'Deployment to Render successfully!'
                echo 'Slack Bot success message'
                slackSend (
                    channel: "${SLACK_CHANNEL}", 
                    color: 'good', 
                    message: "Build succeeded: ${env.JOB_NAME} ${env.BUILD_NUMBER}. Access app on https://gallery-nvtq.onrender.com/" 
                )
            }
        }
        
        failure {
            script {
                echo 'Deploying App to Render failed!'
                echo 'Slack Bot failed message'
                slackSend (
                    channel: "${SLACK_CHANNEL}", 
                    color: 'danger', 
                    message: "Build failed: ${env.JOB_NAME} ${env.BUILD_NUMBER}"
                )
            }
        }

        always {
            echo 'Cleaning up...'
            cleanWs()
            script {
                if (currentBuild.result == 'FAILURE') {
                    emailext (
                        to: "${EMAIL_RECIPIENT}",
                        subject: "Jenkins Build Failed: ${env.JOB_NAME} ${env.BUILD_NUMBER}",
                        body: """
                        <p>The Jenkins build <b>${env.JOB_NAME} ${env.BUILD_NUMBER}</b> has failed.</p>
                        <p>Please check the Jenkins console output for more details: ${env.BUILD_URL}</p>
                        """
                    )
                }
            }
        }

    }
}
