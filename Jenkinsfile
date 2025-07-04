pipeline {
	agent any
    environment {
		MAVEN_OPTS = "-Xms256m -Xmx512m"
    }
    stages {
		stage('SCM') {
			steps {
				script {
					try {
						checkout scm
                    } catch (Exception e) {
						echo "Erreur lors de la récupération du code source : ${e.message}"
                        currentBuild.result = 'FAILURE'
                        throw e
                    }
                }
            }
        }
		stage('Build Docker Compose') {
			steps {
				script {
					def dockerComposeEnv = [
							appArtifactId: 'headless-cms',
							appVersion: '0.0.1-SNAPSHOT', 
							hostUrl: 'https://cms-api.alphasow.dev'
					]						
					sh 'docker compose down'
					withEnv([
						"APP_ARTIFACT_ID=${dockerComposeEnv.appArtifactId}",
						"APP_VERSION=${dockerComposeEnv.appVersion}",
						"HOST_URL=${dockerComposeEnv.hostUrl}"
					]) {
					sh 'docker compose up --build -d'
					}
				}
			}
		}
        stage('SonarQube Analysis') {
			steps {
				script {
					def mvn = tool 'jenkins-maven'
                    withSonarQubeEnv('SonarQubeInstance') {
                        sh "${mvn}/bin/mvn clean verify sonar:sonar -Dsonar.projectKey=alpha-sow_headless-cms_AZfBLWT6Vjbf4wpJF_Sw"
                    }
                }
            }
        }
        stage('Archive Artifacts') {
			steps {
				archiveArtifacts artifacts: '**/target/*.jar', fingerprint: true
            }
        }
    }
}