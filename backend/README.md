# Backend de Autenticação com Java e MySQL

Este projeto contém um backend robusto para gerenciamento de usuários e autenticação JWT, integrado ao frontend Angular.

## Tecnologias Utilizadas

- **Java 17** com **Spring Boot 3.4.2**
- **Spring Security** para proteção de rotas e autenticação.
- **JSON Web Token (JWT)** para autenticação stateless.
- **Spring Data JPA** para persistência de dados.
- **MySQL 8.0** como banco de dados.
- **Docker & Docker Compose** para orquestração de containers.

## Estrutura do Projeto

- `backend/src/main/java/com/example/auth/config`: Configurações do Spring (Security, CORS, DataInitializer).
- `backend/src/main/java/com/example/auth/controller`: Endpoints da API (`/api/v1/auth`).
- `backend/src/main/java/com/example/auth/dto`: Objetos de transferência de dados (Request/Response).
- `backend/src/main/java/com/example/auth/model`: Entidades JPA (User, Role).
- `backend/src/main/java/com/example/auth/repository`: Interfaces de acesso ao banco de dados.
- `backend/src/main/java/com/example/auth/security`: Lógica de JWT e filtros de segurança.
- `backend/src/main/java/com/example/auth/service`: Lógica de negócio para autenticação.

## Como Executar

Para subir todo o ecossistema de backend (API + Banco de Dados):

```bash
docker-compose up --build
```

O backend estará disponível em `http://localhost:8080`.

## Dados de Exemplo

O sistema é inicializado automaticamente com os seguintes usuários:

1. **Admin User**
   - Email: `admin@example.com`
   - Password: `password`
2. **Regular User**
   - Email: `user@example.com`
   - Password: `password`

## Melhores Práticas Implementadas

- **Senhas Criptografadas:** Utiliza BCrypt para hashing de senhas.
- **Autenticação Stateless:** JWT elimina a necessidade de sessões no servidor.
- **CORS Configurado:** Permite integração segura com o frontend.
- **Arquitetura em Camadas:** Separação clara de responsabilidades (Controller, Service, Repository).
- **Dockerização:** Facilita o deploy e garante consistência entre ambientes.
