docker := if `groups` =~ "docker" { "docker" } else { "sudo docker" }

sudo := if `echo $USER` == "root" { "" } else { "sudo" }

CERT_DIR := 'certs/frba.utn.edu.ar'

db-keycloak := if `docker ps -f name=keycloak_keycloak-db --quiet | wc -l` == "1" { `docker ps -f name=keycloak_keycloak-db --quiet` } else { "keycloak-db" }


_default:
    @just --list --unsorted

build:
    @echo "Buildeando imagenes..."
    {{docker}} compose -f docker/docker-compose.override.yaml build

up:
    @echo "Levantando contenedores..."
    {{docker}} compose -f docker/docker-compose.override.yaml up -d

down:
    @echo "Bajando contenedores..."
    {{docker}} compose -f docker/docker-compose.override.yaml down

install:
    #!/bin/bash
    @echo "Instalando dependencias y configuraciones de traefik..."
    {{sudo}} apt-get install -y libnss3-tools mkcert;

    # Creamos la carpeta de los certificados y le damos permisos
    {{sudo}} mkdir -p /etc/ssl/sge/frba.utn.edu.ar
    cd /etc/ssl/sge || exit 1
    {{sudo}} chmod 777 frba.utn.edu.ar -R
    cd frba.utn.edu.ar || exit 1

    # Creamos los nuevos certificados
    mkcert -install
    mkcert frba.utn.edu.ar "*.frba.utn.edu.ar"

    # Generamos links simbólicos con los nombres que usa la version actual de traefik
    ln -sf frba.utn.edu.ar+1-key.pem frba.utn.edu.ar.key
    ln -sf frba.utn.edu.ar+1.pem bundle_nginx.crt

    @echo "Instalando dependencias y configuraciones de keycloak..."
    mkdir -p {{CERT_DIR}}
    keytool -genkey -alias 127.0.0.1 -keyalg RSA -keypass asd123 -storepass asd123 -keystore {{CERT_DIR}}/keystore.jks
    keytool -export -alias 127.0.0.1 -storepass asd123 -file {{CERT_DIR}}/server.cer -keystore {{CERT_DIR}}/keystore.jks
    keytool -import -v -trustcacerts -alias 127.0.0.1 -file {{CERT_DIR}}/server.cer -keystore {{CERT_DIR}}/cert.jks -keypass asd123 -storepass asd123

db-dump-keycloak:
    @echo "Haciendo dump de la base de datos de keycloak..."
    {{docker}} exec {{db-keycloak}} pg_dump bitnami_keycloak > dump-keycloak.sql

hosts:
    @echo "Agregando entradas al archivo /etc/hosts..."
    {{sudo}} sh -c 'echo "
    172.18.2.2 traefik-dev.frba.utn.edu.ar
    172.18.2.2 auth-dev.frba.utn.edu.ar
    172.18.2.2 sge-dev.frba.utn.edu.ar
    " >> /etc/hosts'

sh:
    @echo "Abriendo sh en el contenedor de sge..."
    {{docker}} exec -it app-sge sh