<template>
  <div :style="cssVars">
    <div
      class="image-input"
      :style="{ 'background-image': `url(${imageData})` }"
      @click="chooseImage"
    >
      <span
        v-if="!imageData"
        class="placeholder"
      >
        Selecione uma imagem
      </span>
      <input
        class="file-input"
        ref="fileInput"
        type="file"
        @input="onSelectFile"
        accept="image/*"
      >
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    imageData: null,
  }),
  computed: {
    cssVars() {
      return {
        "--radius": this.circular ? "100px" : "0",
        "--height": this.height + "px",
        "--width": this.width + "px",
      };
    },
  },
  mounted() {
    this.createFile(this.url);
  },
  watch: {
    url() {
      this.createFile(this.url);
    },
  },
  methods: {
    chooseImage() {
      this.$refs.fileInput.click();
    },

    onSelectFile() {
      const input = this.$refs.fileInput;
      const files = input.files;
      if (files && files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageData = e.target.result;
        };
        reader.readAsDataURL(files[0]);
        this.$emit("input", files[0]);
      }
    },
    async createFile(url) {
      if (url) {
        try {
          const response = await fetch(url, {
            credentials: "include",
          });
          const data = await response.blob();
          const filename =
            response.headers
              ?.get("Content-Disposition")
              ?.split("filename=")?.[1] ?? "imagem." + data.type;
          const metadata = {
            type: data.type,
          };
          const file = new File([data], filename, metadata);
          const reader = new FileReader();
          reader.onload = (e) => {
            this.imageData = e.target.result;
          };
          reader.readAsDataURL(file);
          this.$emit("input", file);
        } catch (error) {
           this.imageData = null
        }
      }
    },
  },
  props: {
    circular: {
      type: Boolean,
      default: () => false,
    },
    height: {
      type: String,
      default: () => "200",
    },
    width: {
      type: String,
      default: () => "200",
    },
    value: {},
    url: {
      type: String,
      default: () => "",
    },
  },
};
</script>

<style scoped>
.image-input {
  border-radius: var(--radius);
  display: block;
  width: var(--width);
  height: var(--height);
  cursor: pointer;
  background-size: cover;
  background-position: center center;
}

.placeholder {
  border-radius: var(--radius);
  background: #f0f0f0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  font-size: 12px;
  font-family: Helvetica;
}

.placeholder:hover {
  background: #e0e0e0;
}

.file-input {
  display: none;
}
</style>
