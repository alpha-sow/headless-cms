node {
	stage('SCM') {
		checkout scm
	}
	stage('Vault key') {
		def secrets = [
			[
				path: 'secret/ci-cd', 
				engineVersion: 2, secretValues: [
					[envVar: 'id', vaultKey: 'id']
				]
			],
    	]
		withVault([vaultSecrets: secrets]) {
			sh 'echo ID=id'
		}
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
		withEnv([
			"APP_ARTIFACT_ID=${dockerComposeEnv.appArtifactId}",
			"APP_VERSION=${dockerComposeEnv.appVersion}",
			"HOST_URL=${dockerComposeEnv.hostUrl}"
		]) {
			sh 'docker compose up -d'
		}
	}
}