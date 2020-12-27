# Backend-NodeJS

API NodeJS configurada para acesso ao Banco de Dados NoSQL MongoDB.


# config.js

Na raíz da aplicação (pasta **src**) deve ser adicionado um arquivo com o nome **config.js**, contendo o seguinte conteúdo:
```
global.SALT_KEY = 'um valor para salgar a criptografia da senha de usuários/customer'; 

module.exports = {

    connectionString: 'mongodb://localhost:27017/NodeStr',  // <-- string conexao banco mongodb
    
    sendgridKey: 'sua chave secreta do provedor de serviços de envio de email sendGrid',   

    containerConnectionString: 'string conexao do container de imagem da conta de armazenamento do azure' 
}
```
