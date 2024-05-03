<template>
  <div class="filters flex items-center justify-between">
    <div class="flex ml-2 sm:ml-10 mt-5 z-0 flex-col">
      <label for="Filter" class="block text-sm font-medium text-gray-900">
        Filter By Category
      </label>

      <select
        v-model="filter"
        @change="filterProducts()"
        id="Filter"
        class="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
      >
        <option v-for="category in categories" :value="category.id">
          {{ category.name }}
        </option>
      </select>
    </div>
    <div class="flex mr-2 sm:mr-10 mt-5 z-0 flex-col">
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
  </div>
  <div id="product-collection">
    <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <h1>Best Selling Products</h1>
      <ul class="mt-8 grid gap-4 grid-cols-2 lg:grid-cols-4">
        <ProductCard
          v-for="product in allproducts"
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
  name: "AllProducts",
  components: { ProductCard },
  data() {
    return {
      allproducts: [],
      categories: [],
      filter: 0,
      change: false,
      sort: "",
      productname: "",
      limit: 20,
    };
  },
  mounted() {
    this.getAllCategories();

    document.title = "All Products | البيت بيتك";
  },
  methods: {
    async getAllCategories() {
      this.$store.state.loading = true;
      const allProducts = await axios.get(`/api/allproducts/${this.limit}`);
      this.$store.state.loading = false;
      this.allproducts = allProducts.data.Products;
      this.categories = allProducts.data.Categories;
      this.categories.push({ name: "All", id: 0, nameAr: "جميع المنتجات" });
    },
    sortProducts(sorts, products) {
      let sortType = sorts;
      let product = products;

      if (!sorts) {
        sortType = this.sort;
      }

      if (!products) {
        product = this.allproducts;
      }

      const arry = product.sort((a, b) => {
        if (sortType === "hp") {
          return b.price - a.price;
        } else if (sortType === "lp") {
          return a.price - b.price;
        }
        return 0;
      });

      this.allproducts = arry;
    },

    async filterProducts(filters, products) {
      let filterType = filters;

      if (!filters) {
        filterType = this.filter;
      }

      let productsInp = products;

      if (!products) {
        productsInp = this.allproducts;
      }
      if (filterType === 0) {
        console.log(filterType);
        this.getAllCategories();
        return;
      }

      if (!this.change) {
        this.change = true;
      }

      if (this.change) {
        this.change = false;
        this.$store.state.loading = true;
        const allProducts = await axios.get(`/api/allproducts/${this.limit}`);
        this.$store.state.loading = false;
        productsInp = allProducts.data.Products;
      }

      const arry = productsInp.filter((product) => {
        return product.category === filterType;
      });

      this.allproducts = arry;
    },
  },
};
</script>
