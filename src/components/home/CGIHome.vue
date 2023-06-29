<template>
  <v-card flat>
    <v-toolbar color="primary" dark extended flat> </v-toolbar>

    <v-card class="mx-auto mb-5" width="90%" style="margin-top: -64px">
     <v-toolbar flat class="d-flex align-center justify-center">
        <v-toolbar-title :class="$vuetify.theme.isDark ? 'white--text' : 'black--text'">
          <h3>Bem vindo, programador(a)!</h3>
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <p>
          Esse é o <b>CGI Design System for Vue</b> ou <b>CIDS</b>, como preferir chamar 😊.
        </p>
        <p>
          Essa solução foi desenvolvida com o propósito de trazer um conforto a todos os desenvolvedores com casos onde o desenvolvimento se repete constantemente,
          como em casos de tabelas de CRUD, campos customizados de data, entre outros...
        </p>
        <p>
          Essa lib conta com funcionalidades que visam facilitar o seu dia-a-dia, como:
          <ul>
            <li>Criação de tabelas de dados com <b>n</b> opções de propriedades;</li>
            <li>Diretivas para facilitar a formatação de campos de texto do tipo: moeda, deixando na formatação pt-BR, para definir tamanho máximo de caracteres no campo,
            para bloquear o uso de caracteres como <code>. + - ,</code> e diretiva para aplicação de máscara em campos;</li>
            <li>Componente Time Picker para criar campos onde é necessário informar um horário;</li>
            <li>Componente Date Picker para criar campos onde é necessário informar a data;</li>
            <li>Componente Snackbar para mostrar mensagens em tela;</li>
            <li>Componente Alert para mostrar mensagens de alerta em tela;</li>
            <li>Componente Zoom para abrir outros programas dentro de um programa por meio de um campo ou botão;</li>
            <li>Componente Tree View para criar árvores de items;</li>
            <li>Componente Image Picker para fazer o upload de alguma imagem de perfil, por exemplo;</li>
            <li>Componente cgi-btn e cgi-acoes para criar botões já padronizados, apenas passando o nome e a função;</li>
            <li>Handler para converter datas, formatar números para o padrão pt-BR, fazer download de arquivos XLSX e agrupamento de informações;</li>
          </ul>
        </p>
        <p>Procuramos deixar tudo documentado aqui, para que você possa consultar com facilidade como usar, quais props precisam ser passadas, se tem slot e como utilizá-lo e
        quais os eventos podem ser criados.</p>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="d-flex align-center justify-center">
        <p class="d-flex align-center justify-center mb-0 pa-3">Feito com <span class="icon-heart mx-2">❤️</span> pela
        <v-img v-if="$vuetify.theme.isDark" src="@/assets/cgi-branca-nova.png" alt="CGI Software" width="30" class="ml-3"></v-img><v-img v-else src="@/assets/cgi-nova.png" alt="CGI Software" width="30" class="ml-3"></v-img></p>
      </v-card-actions>
    </v-card>
  </v-card>
</template>

<script>
export default {};
</script>

<style scoped>
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

.icon-heart {
  animation: pulse 1s infinite;
}
</style>