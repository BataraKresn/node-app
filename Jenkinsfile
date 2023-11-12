pipeline{
    agent {
        docker {
            image 'ubuntu'
            args '-u root:sudo -v $HOME/workspace/nodejs:/nodejs'
        }
    }
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