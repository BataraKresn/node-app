pipeline{
    agent any
    tools {nodejs "nodejs"}
    stages{
        stage("checkout"){
            steps{
                checkout scm
            }
        }
        stage("Test"){
            steps{
                sh 'sudo apt install npm'
                sh 'npm test'
            }
        }
        stage("Build"){
            steps{
                sh 'npm run build'
            }
        }
    }
}