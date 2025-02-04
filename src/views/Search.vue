<template>
  <div id="product-collection">
    <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <ul class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <ProductCard
          v-for="product in this.products"
          v-bind:key="product.id"
          v-bind:product="product"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ProductCard from "../components/ProductCard.vue";

export default {
  name: "Search",
  components: {
    ProductCard,
  },
  data() {
    return {
      products: [],
      query: "",
    };
  },
  mounted() {
    document.title = "Search | المنزل";

    let uri = window.location.search;
    let params = new URLSearchParams(uri);
    if (params.get("query")) {
      this.query = params.get("query");
      this.performSearch();
    }
  },
  methods: {
    async performSearch() {
      this.$store.state.loading = true;
      await axios.get(`/search/${this.query}`).then((response) => {
        const Products = response.data.Products;
        this.products = Products;
      });

      this.$store.state.loading = false;
    },
  },
};
</script>

<style lang="scss">
.container {
  width: 100%;
  min-height: 100%;
  display: grid;
  place-items: center;
}
.subtitle {
  margin-top: 50px;
  text-transform: capitalize;
}
.pagingaiton {
  margin: 20px 0;
  width: 300px;
  background: #eee;
  min-height: 50px;
  border-radius: 5px;
  display: flex;
  padding: 0 15px;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 0 3px 2px #33333348;
  position: relative;

  .currentpage {
    width: 40px;
    height: 40px;
    display: grid;
    place-items: center;
    background: #333;
    color: #eee;
    font-size: 20px;
    font-weight: 700;
    border-radius: 5px;
    box-shadow: 0 0 2px 2px #33333348;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  button {
    width: 35px;
    height: 35px;
    font-size: 25px;
    display: grid;
    place-items: center;
    color: #333;
    transition: 0.3s;
    cursor: pointer;
    background: none;
    border: none;

    &:hover {
      color: #3860ff;
    }
  }

  .nextBtn:hover {
    transform: translateX(15px);
  }
  .prevBtn:hover {
    transform: translateX(-15px);
  }
}
</style>
