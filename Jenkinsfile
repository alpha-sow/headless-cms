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
        stage('Remove old build') {
			steps {
				script {
					sh "docker compose down"
				}
			}
		}
        stage('Build Docker Compose') {
			steps {
				script {
					if (fileExists('./docker-compose-build.sh')) {
						sh "chmod +x -R ${env.WORKSPACE}"
						sh './docker-compose-build.sh'
                    } else {
						error "Le script docker-compose-build.sh est introuvable !"
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