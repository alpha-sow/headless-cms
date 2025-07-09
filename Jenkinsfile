node {
	stage('SCM') {
		checkout scm
	}
	stage('Vault key') {
		def secrets = [
			[
				path: 'secret/headless-cms', 
				engineVersion: 1, secretValues: [
					[envVar: 'APP_ARTIFACT_ID', vaultKey: 'APP_ARTIFACT_ID'],
					[envVar: 'APP_VERSION', vaultKey: 'APP_VERSION'],
					[envVar: 'HOST_URL', vaultKey: 'HOST_URL'],
				]
			],
    	]
		withVault([vaultSecrets: secrets]) {
			sh 'echo ID=$id'
		}
	}
	stage('SonarQube Analysis') {
		def mvn = tool 'jenkins-maven';
		withSonarQubeEnv() {
			sh "${mvn}/bin/mvn clean verify sonar:sonar -Dsonar.projectKey=alpha-sow_headless-cms_AZfBLWT6Vjbf4wpJF_Sw"
		}
	}
	stage('Build Docker Compose') {
		withEnv([
			"APP_ARTIFACT_ID=${APP_ARTIFACT_ID}",
			"APP_VERSION=${APP_VERSION}",
			"HOST_URL=${HOST_URL}"
		]) {
			sh 'docker compose up -d'
		}
	}
}