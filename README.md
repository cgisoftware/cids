# CGI Design System for Vue

<!-- <img src="https://raw.githubusercontent.com/booscaaa/midow/master/screenshots/midow.png"  width="100%" /> -->

## Sobre o projeto

_"O projeto veio para trazer um conforto a todos os desenvolvedores com casos onde o desenvolvimento se repete constantemente, como em casos de tabelas de CRUD, campos customizados de data, entre outros..."._

<br>

## Funcionalidades

- Criação de tabelas de dados com n opções de propriedades, tudo de acordo com o necessário para o uso da empresa.

<br>

## Começando

### Pré requisitos

Para rodar um projeto Vue e usar nossa biblioteca você precisa, além do vue corretamente instalado:

- Vuetify lib, pode ser achada [aqui](https://www.npmjs.com/package/vuetify).
- Nossa lib, pode ser achada [aqui](https://www.npmjs.com/package/cids-cgi).

<br>

### Instalação

**Baixe a biblioteca vuetify e configure ela corretamente de acordo com a documentação da mesma**

<br>

**Baixe a biblioteca cids-cgi no seu projeto**

```
$ npm i cids-cgi
```

**No arquivo main.js do seu projeto adicione**

```js
import Vue from 'vue'
import cids from 'cids-cgi/lib'

Vue.use(cids)
```


<br>
<br>

### Rodando

Nos seus componentes do projeto use:

<br>

# DataTable

### - Componente

```html
<template>
  <cgi-data-table></cgi-data-table>
</template>
```

## - Propriedades

| Propriedade              | Required? |  Type   | Default value |
| :----------------------- | :-------: | :-----: | ------------: |
| nome-tabela              |   false   | String  |          null |
| linhas                   |   true    |  Array  |     undefined |
| colunas                  |   true    |  Array  |     undefined |
| mostra-linha-selecionada |   false   | Boolean |         false |
| mostra-propriedades      |   false   | Boolean |         false |
| paginacao-servidor       |   false   | Boolean |         false |
| mostra-colunas           |   false   | Boolean |          true |
| mostra-paginacao         |   false   | Boolean |          true |
| colunas-fixas            |   false   | Boolean |          true |
| mostra-agrupador         |   false   | Boolean |         false |
| agrupar-por              |   false   |  Array  |            [] |
| ordenadar-varios         |   false   | Boolean |          true |
| ordenar-por              |   false   |  Array  |            [] |
| pesquisa                 |   false   | String  |          null |
| chave-tabela             |   false   | String  |           seq |
| selecionar-varios        |   false   | Boolean |         false |
| mostra-acoes             |   false   | Boolean |         false |
| altura                   |   false   | String  |         100vh |

<br>


## - Slots
| Slot                       |                Return |
| :------------------------- | --------------------: |
| @click-salvar-propriedades | Array de propriedades |
| @paginando                 |   Object de paginação |
| @alterar-item              |        Object de item |
| @deletar-item              |        Object de item |

<br>
<br>
<br>