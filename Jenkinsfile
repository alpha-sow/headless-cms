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
}