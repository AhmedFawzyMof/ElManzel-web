<template>
  <div id="product-collection">
    <div class="flex ml-2 sm:ml-10 mt-5 z-0 flex-col w-[150px]">
      <label for="Filter" class="block text-sm font-medium text-gray-900">
        Sort By Price
      </label>

      <select
        v-model="sort"
        @change="sortProducts()"
        id="Filter"
        class="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
      >
        <option value="">Default</option>
        <option value="hp">Higher Price</option>
        <option value="lp">Lower Price</option>
      </select>
    </div>
    <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <ul class="mt-8 grid gap-4 grid-cols-2 lg:grid-cols-4">
        <ProductCard
          v-for="product in products"
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
  name: "Tag",
  components: {
    ProductCard,
  },
  data() {
    return {
      products: [],
      limit: 20,
      sort: "",
    };
  },
  mounted() {
    this.getTag();
  },
  watch: {
    $route(to, from) {
      if (to.name === "Tag") {
        this.getTag();
      }
    },
  },
  methods: {
    sortProducts(sorts, products) {
      let sortType = sorts;
      let product = products;

      if (!sorts) {
        sortType = this.sort;
      }

      if (!products) {
        product = this.products;
      }

      const arry = product.sort((a, b) => {
        if (sortType === "hp") {
          return b.price - a.price;
        } else if (sortType === "lp") {
          return a.price - b.price;
        }
        return 0;
      });

      this.products = arry;
    },
    async getTag() {
      this.$store.state.loading = true;
      const id = this.$route.params.id;
      document.title = "البيت بيتك";

      const subcategory = await axios.get(
        `/api/subcategory/${id}/${this.limit}`
      );

      document.title = subcategory.data.SubCategory.name + " | البيت بيتك";
      this.products = subcategory.data.Products;

      this.$store.state.loading = false;
    },
  },
};
</script>
