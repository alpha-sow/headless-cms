node {
	stage('SCM') {
		checkout scm
	}
	stage('SonarQube Analysis') {
		def mvn = tool 'jenkins-maven';
		withSonarQubeEnv() {
			sh "${mvn}/bin/mvn clean verify sonar:sonar -Dsonar.projectKey=alpha-sow_headless-cms_AZfBLWT6Vjbf4wpJF_Sw"
		}
	}
	stage('Build Docker Compose') {
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