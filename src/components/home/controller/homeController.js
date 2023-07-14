import { useTheme } from "vuetify";
import { publisher } from "@/plugins/eventBus";

class HomeController {
  leftDrawer = false
  rightDrawer = false
  dark = false
  mini = true
  openMenu = []
  theme = useTheme()

  async mounted() {
    try {
      this.dark = localStorage.getItem("theme") === "dark";
      this.theme.global.name = this.dark ? 'dark' : 'cgi'
      publisher("tema").send("change", this.dark)
    } catch (error) {
      alert(error.toString())
    }
  }

  changeDark() {
    this.theme.global.name = this.theme.global.current.dark ? "cgi" : "dark";
    localStorage.setItem("theme", this.dark ? "dark" : "cgi");
    publisher("tema").send("change", this.dark);
  }

}

export default HomeController