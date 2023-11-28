pipeline{
    agent any
     tools {
        nodejs "node-"
        git "git-"
        }
    stages{
        stage("checkout"){
            steps{
                checkout scm
            }
        }
        stage("Test"){
            steps{
                sh 'npm install'
                sh 'npm test'
            }
        }
        stage("Build"){
            steps{
                sh 'npm run build'
            }
        }
        stage("Build Image"){
            steps{
                sh 'docker build -t 100.102.123.78:8085/my-app:1.0.0 .'
            }
        }
        stage("Docker Push to Nexus"){
            steps{
                withCredentials([usernamePassword(credentialsId: 'nexus', passwordVariable: 'PSW', usernameVariable: 'USER')]){
                    sh 'echo ${PSW} | docker login -u ${USER} --password-stdin 100.102.123.78:8085'
                    sh 'docker push 100.102.123.78:8085/digital`-archiving-frontend:1.0.0'
                    sh 'docker logout'
                }
            }
        }
        stage("Docker Pull & Run Image"){
            steps{
                script {
                    sshagent(['ssh-staging']) {
                            sh 'ssh ubuntu@100.102.123.78'
                            sh "ssh ubuntu@100.102.123.78 'docker pull 100.102.123.78:8085/digital-archiving-frontend:1.0.0"
                            sh 'docker pull 100.102.123.78:8085/digital-archiving-frontend:1.0.0'
                            sh 'docker run -d --name digital-archiving-frontend -p 5000:3000 --restart=always 100.102.123.78:8085/digital-archiving-frontend:1.0.0'
                    }
                            
                    }
                }
            }
    }
}