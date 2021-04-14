# Instalação


### Configurando

1 - Atualizar o endereço do webservice alterando a constante **API_URL**, disponível no arquivo assets **src/enviroments/envoriment.prod.ts**

```javascript
export const environment = {
  production: true
};
//URL de acesso a API
export const API_URL = 'http://site.com.br/api'
```

2 - Altere o arquivo  **config.xml** na raiz do projeto para informar o id, versao e dados do código:

```xml
<widget id="br.com.carloswgama.sosravvs" version="2.0.0" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">
    <name>FicaBem</name>
    ...

```

3 - Opcional: Caso deseje  atualizar a chave da api do google maps, basta alterar no arquivo **src/config/maps.js**:

```javascript
export default {
    key:'INFORME_A_CHAVE_AQUI'
}
```



---
Caso não tenha o NodeJS instalado e o Ionic, realizar os processos

[Baixar NodeJS](https://nodejs.org/en/)

Após instalar, execute o comando no terminal:

```
npm install -g ionic
```

### Deploy

Para fazer o deploy, basta rodar o comando abaixo no terminal:

```
ionic build android --release --prod 
```

Após finalizar, o arquivo da apk poderá ser encontrado em: **platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk**

---
O último passo consiste em assinar a apk com a assinatura de vocês e disponibilizar na loja da PlayStore.