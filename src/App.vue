<template>
  <div class="loading" v-if="this.$store.state.loading">
    <img class="logo" src="/img/logo.png" />
    <div class="box"></div>
    <span class="loader"><span class="loader-inner"></span></span>
  </div>
  <Header />
  <router-view />
  <Footer />
</template>
<script>
import axios from "axios";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
export default {
  components: { Header, Footer },
  data() {
    return {
      categories: [],
      tags: [],
      cart: {
        items: [],
      },
    };
  },
  beforeCreate() {
    this.$store.commit("initializeStore");
    const token = this.$store.state.token;
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Token " + token;
    } else {
      axios.defaults.headers.common["Authorization"] = "";
    }
  },
  mounted() {
    this.cart = this.$store.state.cart;

    // this.getNavData();
  },
  methods: {
    async getNavData() {
      this.$store.state.loading = true;
      await axios.get("/navdata").then((response) => {
        this.categories = response.data.Categories;
        this.tags = response.data.Tags;
      });

      this.$store.state.loading = false;
    },
    Logout() {
      axios.defaults.headers.common["Authorization"] = "";
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("userid");
      this.$store.commit("removeToken");
      this.$router.push("/");
      location.reload();
    },
  },
  computed: {
    cartTotalLength() {
      let totalLength = 0;
      for (let i = 0; i < this.cart.items.length; i++) {
        totalLength += this.cart.items[i].quantity;
      }
      return totalLength;
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@100;200;300;400;500;600;700&display=swap");
* {
  box-sizing: border-box;
  margin: 0%;
  padding: 0%;
  scroll-behavior: smooth;
  font-family: Cairo, Raleway;
}
.menu {
  transform: translateY(-20px);
}

.loading {
  width: 100%;
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  top: 0;
  background: #fff;
  z-index: 99;
}

.loading img.logo {
  width: 205px;
}

.loader {
  display: inline-block;
  border-radius: 5px;
  width: 30px;
  height: 30px;
  position: absolute;
  top: 90%;
  border: 4px solid #7e7b7b;
  animation: loader 2s infinite ease;
}

@keyframes loader {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(180deg);
  }
  50% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes loader-inner {
  0% {
    height: 0%;
  }
  25% {
    height: 0%;
  }
  50% {
    height: 100%;
  }
  75% {
    height: 100%;
  }
  100% {
    height: 0%;
  }
}

.menu {
  position: relative; /* Add this line */
  z-index: 1000; /* Add this line */
}
</style>
