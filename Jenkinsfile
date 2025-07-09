node {
	stage('SCM') {
		checkout scm
	}
	stage('Vault secrets') {
		def secrets = [
			[
				path: 'secret/headless-cms', 
				engineVersion: 2, 
				secretValues: [
					[envVar: 'APP_ARTIFACT_ID', vaultKey: 'APP_ARTIFACT_ID'],
					[envVar: 'APP_VERSION', vaultKey: 'APP_VERSION'],
					[envVar: 'HOST_URL', vaultKey: 'HOST_URL'],
				]
			],
    	]
		withVault([vaultSecrets: secrets]) {
			sh 'echo APP_ARTIFACT_ID=$APP_ARTIFACT_ID'
			sh 'echo APP_VERSION=$APP_VERSION'
			sh 'echo HOST_URL=$HOST_URL'
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