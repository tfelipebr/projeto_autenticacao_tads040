# Backend-Login

Este é um projeto de exemplo em Spring Boot que implementa um endpoint REST de autenticação de usuários. A aplicação utiliza Spring Data JPA para acessar um banco de dados MySQL e segue boas práticas de arquitetura em camadas (Controller, Service, Repository).

## Tecnologias e dependências

* Java 17
* Spring Boot 3.5.0

  * spring-boot-starter-web
  * spring-boot-starter-data-jpa
  * spring-boot-starter-test (escopo test)
* MySQL Connector/J (driver MySQL)
* Banco de dados MySQL 8+

## Estrutura do projeto

```text
src/
└─ main/
   ├─ java/
   │  └─ pe.senac.br.backend/
   │     ├─ BackendLoginApplication.java      ← Classe principal com @SpringBootApplication
   │     ├─ controller/
   │     │   └─ AuthController.java           ← REST controller para `/api/auth/login`
   │     ├─ dto/
   │     │   └─ LoginRequest.java
   │     │   └─ LoginResponse.java
   │     ├─ model/
   │     │   └─ Usuario.java                  ← Entidade JPA mapeada para a tabela `usuarios`
   │     ├─ repository/
   │     │   └─ UsuarioRepository.java        ← Spring Data JPA repository
   │     └─ service/
   │         └─ AuthService.java              ← Lógica de autenticação
   └─ resources/
      └─ application.properties               ← Configurações de conexão ao banco e JPA
```

## Pré-requisitos

* MySQL instalado e em execução.
* Java 17 instalado.
* Maven (ou o wrapper `mvnw`) disponível.

## Configuração do banco de dados

1. Crie um banco chamado `backend_login` (ou ajuste em `application.properties`).
2. Execute o script SQL:

   ```sql
   CREATE TABLE usuarios (
     id INT AUTO_INCREMENT PRIMARY KEY,
     nome_usuario VARCHAR(50) NOT NULL UNIQUE,
     senha VARCHAR(100) NOT NULL
   );

   INSERT INTO usuarios (nome_usuario, senha) VALUES
     ('alice', 'senha123'),
     ('bob',   'qwerty');
   ```
3. Configure as credenciais em `src/main/resources/application.properties`:

   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/backend_login?useSSL=false&serverTimezone=UTC
   spring.datasource.username=SEU_USUARIO
   spring.datasource.password=SUA_SENHA

   spring.jpa.hibernate.ddl-auto=none
   spring.jpa.show-sql=true
   ```

## Executando a aplicação

Via Maven (na raiz do projeto):

```bash
# no Linux/macOS
./mvnw spring-boot:run

# no Windows
mvnw.cmd spring-boot:run
```

> Ou abra o projeto no Eclipse e use **Run As → Spring Boot App**.

A aplicação iniciará em `http://localhost:8080`.

## Endpoints disponíveis

### POST /api/auth/login

Autentica usuário e senha.

* **Request**

  * URL: `http://localhost:8080/api/auth/login`
  * Method: `POST`
  * Headers:

    * `Content-Type: application/json`
  * Body (exemplo):

    ```json
    {
      "nomeUsuario": "alice",
      "senha": "senha123"
    }
    ```

* **Response 200 OK**

  ```json
  {
    "sucesso": true,
    "mensagem": "Login bem-sucedido"
  }
  ```

* **Response 401 UNAUTHORIZED**

  ```json
  {
    "sucesso": false,
    "mensagem": "Credenciais inválidas"
  }
  ```

## CORS

Para permitir requisições do front-end (por exemplo `http://localhost:3000`), o controller já está anotado com:

```java
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
public class AuthController { … }
```

Ou, se preferir configuração global, veja a classe `CorsConfig`.

## Testes

Os testes unitários e de integração podem ser escritos usando o **spring-boot-starter-test**. Adicione classes de teste em `src/test/java` conforme necessário.

## Build e empacotamento

Para gerar o JAR executável:

```bash
./mvnw clean package
java -jar target/backend-login-0.0.1-SNAPSHOT.jar
```

---

### Observações

* Em um ambiente de produção, armazene senhas *hashiﬁcadas* (BCrypt, Argon2 etc.).
* Ajuste `spring.jpa.hibernate.ddl-auto` para `validate` ou remova conforme seu fluxo de migrações.
* Se usar Spring Security, configure CORS também no filtro de segurança.

