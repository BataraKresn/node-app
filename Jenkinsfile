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
                sh 'docker build -t 100.102.123.78:8085/my-node-app:${BUILD_NUMBER} .'
            }
        }
        stage("Docker Push to Nexus"){
            steps{
                withCredentials([usernamePassword(credentialsId: 'nexus', passwordVariable: 'PSW', usernameVariable: 'USER')]){
                    sh 'echo ${PSW} | docker login -u ${USER} --password-stdin 100.102.123.78:8085'
                    sh 'docker push 100.102.123.78:8085/my-node-app:${BUILD_NUMBER}'
                    sh 'docker logout'
                }
            }
        }
        stage("Docker Pull & Run Image"){
            steps{
                script {
                    sshagent(['ssh-staging']) {
                            sh "ssh ubuntu@100.102.123.78"
                            sh "docker pull 100.102.123.78:8085/my-node-app:${BUILD_NUMBER}"
                    }
            }
            }
        }
    }
}