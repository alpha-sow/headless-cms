node {
	stage('SCM') {
		checkout scm
	}
	environment {
		APP_ARTIFACT_ID=''
		APP_VERSION=''
		HOST_URL=''
		DB_USERNAME=''
		DB_PASSWORD=''
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
					[envVar: 'DB_USERNAME', vaultKey: 'DB_USERNAME'],
					[envVar: 'DB_PASSWORD', vaultKey: 'DB_PASSWORD'],
				]
			],
    	]
		withVault([vaultSecrets: secrets]) {
			script {
				env.APP_ARTIFACT_ID=APP_ARTIFACT_ID
				env.APP_VERSION=APP_VERSION
				env.HOST_URL=HOST_URL
				env.DB_USERNAME=DB_USERNAME
				env.DB_PASSWORD=DB_PASSWORD
				
			}
		}
	}
	stage('SonarQube Analysis') {
		def mvn = tool 'jenkins-maven';
		withSonarQubeEnv() {
			sh "${mvn}/bin/mvn clean verify sonar:sonar -Dsonar.projectKey=alpha-sow_headless-cms_AZfBLWT6Vjbf4wpJF_Sw"
		}
	}
	stage('Build Docker Compose') {
		sh 'docker compose --build up -d'
	}
}