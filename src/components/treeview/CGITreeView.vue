<template>
  <div>
    <cgi-tree-view
      :itens="lista"
      chave-tree="codItem"
      chave-pai-tree="codPai"
      texto-item="descricao"
      selecionavel
      v-model="selecionados"
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
        cor: "red",
      },
      {
        codPai: 0,
        descricao: "item 2",
        codItem: 2,
        cor: "blue",
      },
      {
        codPai: 2,
        descricao: "item 2 - filho 1",
        codItem: 3,
        cor: "blue",
      },
      {
        codPai: 2,
        descricao: "item 2 - filho 2",
        codItem: 4,
        cor: "blue",
      },
      {
        codPai: 3,
        descricao: "item 3 - filho 1",
        codItem: 5,
        cor: "blue",
      },
    ],
    selecionados: [],
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

    // async manoChange(selecionado, item) {
    //   this.selecaoRecursiva(selecionado, item);
    //   const aux = JSON.parse(JSON.stringify(this.itensManipulados));
    //   this.itensManipulados = [];
    //   this.itensManipulados = aux;
    //   this.intermediarioRecursivo(this.itensManipulados);
    //   this.selecionados = [];
    //   this.verificaSelecionados(this.itensManipulados);
    // },
    // selecaoRecursiva(selecionado, item) {
    //   item.selecionado = selecionado;

    //   for (let i of item.children) {
    //     this.selecaoRecursiva(selecionado, i);
    //   }
    // },
    // intermediarioRecursivo(itens) {
    //   for (let i of itens) {
    //     this.intermediarioRecursivo(i.children);
    //     const allChecked = i.children.filter((c) => c.selecionado === true);
    //     if (i.children.length === allChecked.length && allChecked.length > 0) {
    //       i.selecionado = true;
    //     }

    //     if (i.children.length > allChecked.length) {
    //       i.intermediario = true;
    //     }

    //     if (allChecked.length == 0) {
    //       i.intermediario = false;
    //     }
    //   }
    // },
    // verificaSelecionados(itens) {
    //   for (let i of itens) {
    //     this.verificaSelecionados(i.children);
    //     const allChecked = i.children.filter((c) => c.selecionado === true);
    //     if (allChecked.length > 0) {
    //       this.selecionados = [
    //         ...this.selecionados,
    //         ...allChecked.map((a) => a[this.chaveTree]),
    //       ];
    //     }
    //   }
    // },

</script>



