# Backend-NodeJS

API NodeJS configurada para acesso ao Banco de Dados NoSQL MongoDB.


# Pacotes / Package utilizados

###### express          --> Framework para configuração de ambiente 
###### debug            --> Para rodar em modo de debug
###### http             --> Para usar o protocolo HTTP de comunicação
###### mongoose         --> ORM Para conectar ao MongoDB de forma simplificada
###### body-parser      --> Para conversão de corpo de requisições HTTP para JSON
###### jsonwebtoken     --> Para gerar, codificar e decodificar Jason Web Tokens (Autenticação)
###### md5              --> Para encriptar senhas
###### guid             --> Parar gerar identificadores únicos
###### sendgrid/mail    --> Para envio de emails
###### azure-storage    --> Para armazenamento de imagens base 64



# setting.js

Na raíz da aplicação (pasta **src**) deve ser adicionado um arquivo com o nome **config.js**, contendo o seguinte conteúdo:
```
global.SALT_KEY = 'um valor para salgar a criptografia da senha de usuários/customer'; 

module.exports = {

    connectionString: 'mongodb://localhost:27017/NodeStr',  // <-- string conexao banco mongodb
    
    sendgridKey: 'sua chave secreta do provedor de serviços de envio de email sendGrid',   

    containerConnectionString: 'string conexao do container de imagem da conta de armazenamento do azure' 
}
```



# Models / Maping

Usamos o package **mongoose** para mapear o **modelo de domínio** para os documentos do **MongoDb**:


### Product example:
```
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// map para mongodb
// nao precisa criar o Id, pois o mongodb o cria automaticamente
const schema = new Schema({
    name: {
        type: String,
        required: [true, 'Preenchimento obrigatório'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Preenchimento obrigatório'],
    },
    image: {
        type: String,     
        trim: true
    }
})

module.exports = mongoose.model('Product', schema)
```

Obs: Veja que exportamos um **Schema** com o nome **'Product'**


### Repository
```
const mongoose = require('mongoose')
const Product = mongoose.model('Product')

exports.create = async (data) => {
    const model = new Product(data)
    await model.save()
}
```

Obs: No Repositório importamos o **Schema** com o nome **'Product'**, geramos um modelo (model) de Product passando os dados recebidos do **Controller**, e mandamos salvar (model.save)







