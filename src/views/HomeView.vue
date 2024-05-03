<template>
  <carousel
    :items-to-show="width >= 1439 ? 3 : 1"
    :autoplay="5000"
    :pauseAutoplayOnHover="true"
    :touchDrag="true"
    :wrapAround="true"
    class="mt-6 mb-6"
    :class="{ 'w-[80%]  ml-auto mr-auto': width > 1439 }"
  >
    <slide v-for="(slide, index) in slides" :key="index">
      <router-link
        :to="'/products/' + slide.product"
        class="w-[90%] h-[150px] max-w-[900px] flex items-center justify-center rounded-lg"
      >
        <img :src="slide.image" class="h-full rounded-lg w-full" />
      </router-link>
    </slide>

    <template #addons>
      <pagination />
    </template>
  </carousel>
  <div class="w-[90%] mx-auto flex lg:justify-center overflow-scroll">
    <div
      class="offerdiv flex gap-5 mb-6 mt-6 items-center justify-center"
      :style="{ width: `${offers.length * 160}px` }"
    >
      <router-link
        v-for="offer in offers"
        :key="offer.id"
        :to="offer.id === 0 ? '/all-products' : `/offers/${offer.id}`"
        class="w-[125px] h-[125px] flex items-center justify-center rounded-lg relative"
      >
        <p class="absolute text-white w-full top-50% left-50% text-center">
          {{ offer.name }}
        </p>
        <img :src="offer.image" class="w-full h-full rounded-lg" />
      </router-link>
    </div>
  </div>

  <div
    class="categories p-3 flex gap-3 lg:gap-8 items-center justify-center flex-wrap"
  >
    <a
      class="category w-[30%] md:w-[22.5%] lg:w-[10.5%] flex flex-col"
      v-for="category in categories"
      :href="'/category/' + category.name"
    >
      <img
        :src="category.img"
        class="w-full h-[84px] flex items-center justify-center rounded-md overflow-hidden shadow-lg"
      />
      <p class="h-[50px] grid place-items-center text-center">
        {{ category.name }}
      </p>
    </a>
  </div>
  <div id="product-collection">
    <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <h1>Categories</h1>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        <div
          class="categories w-full shadow-lg px-4 py-4 rounded-lg"
          v-for="category in Categories"
        >
          <h1>{{ category.name }}</h1>
          <div class="w-full grid place-items-center grid-cols-2 gap-3">
            <router-link
              v-for="sub in category.subcategories"
              :to="`/subcategory/${sub.id}`"
              :key="sub.id"
            >
              <img
                :src="sub.image"
                :alt="sub.name"
                class="w-[150px] rounded-md"
              />
              <p class="text-[12px]">{{ sub.name }}</p>
            </router-link>
          </div>
          <router-link
            class="group relative inline-flex items-center overflow-hidden rounded bg-red-600 px-8 py-3 mt-4 text-white focus:outline-none focus:ring active:bg-red-500"
            :to="`/category/${category.id}`"
          >
            <span
              class="absolute -start-full transition-all group-hover:start-4"
            >
              <svg
                class="size-5 rtl:rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>

            <span class="text-sm font-medium transition-all group-hover:ms-4">
              Show More
            </span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import ProductCard from "../components/ProductCard.vue";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination } from "vue3-carousel";
export default {
  name: "HomeView",
  components: {
    ProductCard,
    Carousel,
    Slide,
    Pagination,
  },
  data() {
    return {
      slides: [],
      Categories: [],
      offers: [],
      width: 0,
    };
  },
  mounted() {
    this.getLatestProducts();
    document.title = "البيت بيتك";
    this.width = window.innerWidth;
  },
  methods: {
    async getLatestProducts() {
      this.$store.state.loading = true;
      const homeData = await axios.get("/api/home");

      this.slides = homeData.data.Carousels;
      this.offers = [
        {
          id: 0,
          name: "كل المنتجات",
          image: "http://localhost:5500/assets/img/main.jpg",
        },
        ...homeData.data.Offers,
      ];

      let categories = [];
      let subcategories = homeData.data.SubCategories;

      for (let i = 0; i < subcategories.length; i++) {
        const subcategory = subcategories[i];

        let category = categories.find((sub) => {
          return subcategory.category_name == sub.name;
        });

        if (!category) {
          categories.push({
            id: subcategory.category_id,
            name: subcategory.category_name,
            name_ar: subcategory.category_name_ar,
            subcategories: [subcategory],
          });
        } else {
          category.subcategories.push(subcategory);
        }
      }
      console.log(categories);
      this.Categories = categories;

      this.$store.state.loading = false;
    },
    showMore() {
      this.Products = this.latestProducts.slice(0, this.Products.length + 4);
    },
  },
};
</script>
