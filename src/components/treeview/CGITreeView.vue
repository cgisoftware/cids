<template>
  <div>
    <cgi-tree-view
      :itens="lista"
      chave-tree="codItem"
      chave-pai-tree="codPai"
      texto-item="descricao"
    ></cgi-tree-view>

    <pre>
                <code
                class="language-html py-5"
                v-html="dataExample"
                style="font-size: 14px; "
              ></code>
              </pre>

    <v-divider class="my-5"></v-divider>
  </div>
</template>

<script>
export default {
  data: () => ({
    lista: [
      {
        codPai: 0,
        descricao: "item 1",
        codItem: 1,
      },
      {
        codPai: 0,
        descricao: "item 2",
        codItem: 2,
      },
      {
        codPai: 2,
        descricao: "item 2 - filho 1",
        codItem: 3,
      },
      {
        codPai: 2,
        descricao: "item 2 - filho 2",
        codItem: 4,
      },
      {
        codPai: 3,
        descricao: "item 3 - filho 1",
        codItem: 5,
      },
    ],
    dataExample: Prism.highlight(
      `
        <template>
          <cgi-tree-view
            :itens="lista"
            chave-tree="codItem"
            chave-pai-tree="codPai"
            texto-item="descricao"
          ></cgi-tree-view>
        <\/template>

        <script>
            export default {
                data: () => ({
                    lista: [
                        {
                            codPai: 0,
                            descricao: "item 1",
                            codItem: 1,
                        },
                        {
                            codPai: 0,
                            descricao: "item 2",
                            codItem: 2,
                        },
                        {
                            codPai: 2,
                            descricao: "item 2 - filho 1",
                            codItem: 3,
                        },
                        {
                            codPai: 2,
                            descricao: "item 2 - filho 2",
                            codItem: 4,
                        },
                        {
                            codPai: 3,
                            descricao: "item 3 - filho 1",
                            codItem: 5,
                        },
                    ],
                })
            };
        <\/script>
      `,
      Prism.languages.html
    ),
  }),
};
</script>
