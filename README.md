# CGI Design System for Vue

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

# - Components

## DataTable

### - Component

```html
<template>
  <cgi-data-table>
    <!-- 
        slot usado somente quando for customizar suas colunas, como formatar a data, por exemplo 
    -->
    <template v-slot:name_of_column="{ item }">
      {{ item.name }}
    </template>
  </cgi-data-table>
</template>
```

### - Props

| Propriedade              | Required? |  Type   |        Default value |
| :----------------------- | :-------: | :-----: | -------------------: |
| nome-tabela              |   false   | String  |                 null |
| linhas                   |   true    |  Array  |            undefined |
| colunas                  |   true    |  Array  |            undefined |
| mostra-linha-selecionada |   false   | Boolean |                false |
| mostra-propriedades      |   false   | Boolean |                false |
| paginacao-servidor       |   false   | Boolean |                false |
| mostra-colunas           |   false   | Boolean |                 true |
| mostra-paginacao         |   false   | Boolean |                 true |
| mostra-pesquisa          |   false   | Boolean |                false |
| colunas-fixas            |   false   | Boolean |                 true |
| mostra-agrupador         |   false   | Boolean |                false |
| ordenar-varios           |   false   | Boolean |                 true |
| pesquisa                 |   false   | String  |                 null |
| chave-tabela             |   false   | String  |                  seq |
| selecionar-varios        |   false   | Boolean |                false |
| mostra-acoes             |   false   | Boolean |                false |
| altura                   |   false   | String  |                100vh |
| carregar                 |   false   | Boolean |                false |
| total-itens              |   false   | Number  |                   30 |
| paginacao                |   false   | Object  | vuetify_page_options |

<br>

### - Events

| Event                |                Return |
| :------------------- | --------------------: |
| @salvar-propriedades | Array de propriedades |
| @paginando           |   Object de paginação |
| @alterar-item        |        Object de item |
| @deletar-item        |        Object de item |

<br>

### - Slots

| Slot            | For                                                                                       |
| :-------------- | :---------------------------------------------------------------------------------------- |
| v-slot:\<name>  | Slot para customizar uma coluna especifica                                                |
| v-slot:botoes   | Slot para incluir botões no header da tabela, como botões de filtro e alterar por exemplo |
| v-slot:pesquisa | Slot para customizar o text-field default de pesquisa da tabela                           |

<br>
<br>
<br>

## CgiDatePicker

### - Component

```html
<template>
  <cgi-date-picker compacto tipo="mes" nome="Data" v-model="data" />
</template>
```

### - Props

| Propriedade | Required? |  Type   | Default value |
| :---------- | :-------: | :-----: | ------------: |
| compacto    |   false   | Boolean |         false |
| nome        |   true    | String  |     undefined |
| tipo        |   false   | String  |        "date" |

<br>

### - Sem Events

<br>

### - Sem Slots

<br>
<br>
<br>

## CgiTimePicker

### - Component

```html
<template>
  <cgi-time-picker compacto nome="Hora" v-model="hora" />
</template>
```

### - Props

| Propriedade | Required? |  Type   | Default value |
| :---------- | :-------: | :-----: | ------------: |
| compacto    |   false   | Boolean |         false |
| nome        |   true    | String  |     undefined |

<br>

### - Sem Events

<br>

### - Sem Slots

<br>
<br>
<br>

## Snackbar

### - Component

```html
<!-- Instância unica no sistema, deve ser declarado uma unica vez no App.vue -->
<template>
  <cgi-snackbar />
</template>
```

```js
import { snackbar } from "cids-cgi/lib/util"

// mensagem sem ações
snackbar.show({message: "Mensagem para mostrar ao usuário!"})

// mensagem de confirmação (promise que retorna true ou false)
const response = await snackbar.confirm({message: "Mensagem para mostrar ao usuário!"})

if (response) {
  // executa algo se o usuário confirmou
}

// parâmetros que podem ser usados no snackbar
snackbar.show({
  message,
  timeout = 10000,  // default em 10 segundos
  color = 'red',    // default vermelho
  position = {      // posição da mensagem na tela, default direita inferior
    right: true,
    center: true,
    top: false,
  }
})
```

### - Sem Props

<br>

### - Sem Events

<br>

### - Sem Slots

<br>
<br>
<br>

## Handler

### - Sem Component

<br>

```js
import { toAblDate, formatNumber, toExcel, groupBy } from 'cids-cgi/lib/util'

// converte data para o formato que o progress espera
const dataAbl = toAblDate('2021-10-08', 'dia') // retorna = DATE(8, 10, 2021)

// converte data para o formato que o progress espera
const dataAbl = toAblDate('2021-10-08', 'mes') // retorna = DATE(1, 10, 2021)

// converte data para o formato que o progress espera
const dataAbl = toAblDate('2021-10-08', 'ano') // retorna = DATE(1, 1, 2021)

// formata numeros para padrão brasileiro
const stringNumber = formatNumber(1234.12) //retorna = "1.234,12"

// exporta e faz download de um arquivo XLSX a partir de um dataset
toExcel(dataset, 'placas') // retorna = download de arquivo chamado placas.xlsx

// agrupa dataset por 0 ou n chaves
const datasetGrouped = groupBy(dataset, (item) => ['nome', 'cod_emp']) // retorna = dataset agrupado por nome e cod_emp respectivamente
```

### - Sem Props

<br>

### - Sem Events

<br>

### - Sem Slots

<br>
<br>
<br>

# Directives

## v-cgi-mask

```html
<template>
  <v-text-field label="Data" v-cgi-mask="mask"></v-text-field>
</template>

<script>
  export default {
    data: () => ({
      mask: {
        tipo: 'dia-mes-ano', // tipos: dia-mes-ano; dia-mes; mes-ano; hora; cpf; cnpj;
        multiplo: true, // não obrigatorio, usado para multiplas mascaras no mesmo campo (CPF/CNPJ)
      },
    }),
  }
</script>
```

<br>
<br>
<br>

## v-cgi-money

```html
<template>
  <!-- Converte os dados digitados na moeda brasileira -->
  <v-text-field label="Valor" v-cgi-money></v-text-field>
</template>
```
