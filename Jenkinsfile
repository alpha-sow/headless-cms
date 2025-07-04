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
						def dockerComposeScript = './docker-compose-build.sh'
						def appArtifactId = 'headless-cms'
						def appVersion = '0.0.1-SNAPSHOT'
						def hostUrl = 'https://cms-api.alphasow.dev'
						
						def executeDockerComposeBuild() {
							sh 'docker compose down'
							sh "export APP_ARTIFACT_ID=${appArtifactId}"
							sh "export APP_VERSION=${appVersion}"
							sh "export HOST_URL=${hostUrl}"
							sh 'docker compose up --build -d'
						}
			
						if (fileExists(dockerComposeScript)) {
							executeDockerComposeBuild()
						} else {
							error "Le script requis (${dockerComposeScript}) est introuvable. Vérifiez son existence et réessayez."
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