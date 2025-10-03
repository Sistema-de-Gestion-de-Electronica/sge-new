node {
    def app

    stage('Clone repository') {
        checkout scm
    }

    stage('Build image') {
        app = docker.build('ext/sge3', '--pull -f docker/Dockerfile .')
    }

    stage('Push image') {
        docker.withRegistry('https://registry.frba.utn.edu.ar', 'registry-gitlab') {
            app.push('latest')
        }
    }

    withCredentials([
        string(credentialsId: 'SGE_TST_POSTGRES_PASSWORD', variable: 'SGE_POSTGRES_PASSWORD'),
        string(credentialsId: 'SGE_TST_POSTGRES_USER', variable: 'SGE_POSTGRES_USER'),
        string(credentialsId: 'SGE_TST_POSTGRES_DB', variable: 'SGE_POSTGRES_DB'),
        string(credentialsId: 'SGE_TST_DATABASE_URL', variable: 'SGE_DATABASE_URL'),
        string(credentialsId: 'SGP_TST_NEXTAUTH_SECRET', variable: 'SGP_TST_NEXTAUTH_SECRET'),
        string(credentialsId: 'SGE_TST_KEYCLOAK_ID', variable: 'SGE_TST_KEYCLOAK_ID'),
        string(credentialsId: 'SGE_TST_KEYCLOAK_SECRET', variable: 'SGE_TST_KEYCLOAK_SECRET'),
        string(credentialsId: 'SGE_TST_KEYCLOAK_ISSUER', variable: 'SGE_TST_KEYCLOAK_ISSUER')
    ]) {
        stage('Update images in ext-c04') {
            sh 'docker --context ext-c04 compose -f docker/docker-compose.yaml pull'
        }
        stage('Deploy') {
            sh 'docker --context ext-c04 compose -f docker/docker-compose.yaml up -d'
        }
    }

    stage('Cleanup') {
        step([$class: 'WsCleanup'])
    }
}
