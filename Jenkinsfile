node {
	agent any
	stages {
		stage('SCM') {
			checkout scm
		}
		stage('Build Docker Compose') {
			sh "./docker-compose-build.sh"
		}
		stage('SonarQube Analysis') {
			def mvn = tool 'jenkins-maven';
			withSonarQubeEnv() {
				sh "${mvn}/bin/mvn clean verify sonar:sonar -Dsonar.projectKey=alpha-sow_headless-cms_AZfBLWT6Vjbf4wpJF_Sw"
			}
		}
	}
}