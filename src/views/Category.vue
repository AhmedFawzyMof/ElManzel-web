<template>
  <div id="product-collection">
    <div
      class="subcategory flex flex-wrap gap-5 w-full items-center justify-center my-10"
    >
      <router-link
        v-for="sub in subcategories"
        :to="`/subcategory/${sub.id}`"
        :key="sub.id"
      >
        <img
          :src="sub.image"
          :alt="sub.name"
          class="w-[150px] h-[150px] rounded-md"
        />
        <p class="text-[12px]">{{ sub.name }}</p>
      </router-link>
    </div>
    <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <ul class="mt-8 grid gap-4 grid-cols-2 lg:grid-cols-4">
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
  name: "Category",
  components: { ProductCard },
  data() {
    return {
      products: [],
      subcategories: [],
      limit: 20,
    };
  },
  mounted() {
    this.getCategory();
    console.log(this.subcategories);
  },
  watch: {
    $route(to, from) {
      if (to.name === "Category") {
        this.getCategory();
      }
    },
  },
  methods: {
    async getCategory() {
      const categorySlug = this.$route.params.id;
      document.title = "المنزل";

      this.$store.state.loading = true;
      const category = await axios.get(
        `/api/category/${categorySlug}/${this.limit}`
      );

      document.title = category.data.Category.name + " | المنزل";

      this.products = category.data.Products;
      this.subcategories = category.data.SubCategories;

      this.$store.state.loading = false;
    },
  },
};
</script>
