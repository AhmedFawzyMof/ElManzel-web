<template>
  <li>
    <router-link
      v-bind:to="'/products/' + product.id"
      class="group block relative"
    >
      <button
        class="absolute top-[55px] left-[10px] bg-white w-8 h-8 rounded-md grid place-items-center text-xl shadow-md transition-all hover:text-red-600"
      >
        <i class="bx bxs-heart-circle"></i>
      </button>
      <router-link
        class="absolute top-[15px] left-[10px] bg-white w-8 h-8 rounded-md grid place-items-center text-xl shadow-md transition-all hover:text-red-600"
        v-bind:to="'/products/' + product.id"
      >
        <i class="bx bx-cart-add"></i>
      </router-link>
      <img
        :src="product.image"
        alt=""
        class="h-[250px] w-full object-cover sm:h-[250px] shadow-md rounded-md"
      />

      <div class="mt-3 flex justify-between text-sm">
        <div>
          <h3
            class="text-gray-900 group-hover:underline group-hover:underline-offset-4"
          >
            {{ product.name }}
          </h3>

          <p class="mt-1.5 max-w-[45ch] text-xs text-gray-500">
            {{ product.description }}
          </p>
        </div>

        <p class="text-gray-900">{{ product.price }}L.E</p>
      </div>
    </router-link>
  </li>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    product: Object,
  },
};
</script>
