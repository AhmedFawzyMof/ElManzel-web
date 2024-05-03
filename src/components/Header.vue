<template>
  <header v-if="!this.$store.state.loading" class="bg-gray-50">
    <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
      <div class="flex items-center justify-end gap-4">
        <button
          @click="showMobileMenu = !showMobileMenu"
          class="mr-auto sm:hidden shrink-0 rounded-full bg-white p-2.5 text-gray-600 shadow-sm hover:text-gray-700 flex items-center justify-items-center"
        >
          <span class="sr-only">Menu</span>
          <i class="bx bx-menu-alt-left text-md"></i>
        </button>
        <div class="flex items-center gap-4">
          <form method="get" action="/search" class="relative">
            <label class="sr-only" for="search"> Search </label>

            <input
              class="h-10 w-full rounded-full border-none bg-white pe-10 ps-4 text-sm shadow-sm sm:w-56"
              id="search"
              type="search"
              name="query"
              placeholder="Search website..."
            />

            <button
              type="button"
              class="absolute end-1 top-1/2 -translate-y-1/2 rounded-full bg-gray-50 p-2 text-gray-600 transition hover:text-gray-700"
            >
              <span class="sr-only">Search</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </form>
          <router-link
            to="/cart"
            class="relative shrink-0 rounded-full bg-white p-2.5 text-gray-600 shadow-sm hover:text-gray-700 flex items-center justify-items-center"
          >
            <span class="sr-only">Cart</span>
            <i class="bx bx-cart-alt text-md"></i>
            <span
              v-if="cartTotalLength !== 0"
              class="absolute top-[-30%] right-[-20%] bg-red-600 text-white rounded w-5 text-center shadow-xl"
              >{{ cartTotalLength }}</span
            >
          </router-link>
        </div>

        <span
          aria-hidden="true"
          class="block h-6 w-px rounded-full bg-gray-200"
        ></span>

        <router-link to="/" class="block shrink-0">
          <span class="sr-only">Home</span>
          <img
            alt="Man"
            src="/img/logo.png"
            class="h-10 w-10 rounded-full object-cover"
          />
        </router-link>
      </div>

      <div class="mt-8 relative sm:hidden z-50">
        <div
          :class="{ flex: showMobileMenu, hidden: !showMobileMenu }"
          class="menu absolute bg-white pl-2 pr-2 pt-5 pb-5 flex gap-3 flex-col w-64 rounded-md shadow-md"
        >
          <button
            @click="(showcategory = !showcategory), (showtags = false)"
            class="hover:bg-gray-50 h-9 rounded-lg flex items-center pl-2"
            to="/"
          >
            Categories <i class="bx bx-chevron-down"></i>
          </button>
          <router-link
            :class="{ flex: showcategory, hidden: !showcategory }"
            class="hover:bg-gray-50 h-9 rounded-lg flex items-center pl-5"
            v-for="category in this.categories"
            :to="'/category/' + category.slug"
          >
            <i class="bx bx-right-arrow-alt"></i> {{ category.name }}
          </router-link>
          <button
            @click="(showtags = !showtags), (showcategory = false)"
            class="hover:bg-gray-50 h-9 rounded-lg flex items-center pl-2"
            to="/"
          >
            Tags <i class="bx bx-chevron-down"></i>
          </button>
          <router-link
            :class="{ flex: showtags, hidden: !showtags }"
            class="hover:bg-gray-50 h-9 rounded-lg flex items-center pl-5"
            v-for="tag in this.tags"
            :to="'/tag/' + tag.slug"
          >
            <i class="bx bx-right-arrow-alt"></i> {{ tag.name }}
          </router-link>
          <router-link
            class="hover:bg-gray-50 h-9 rounded-lg flex items-center pl-2"
            to="/contact"
          >
            Contact
          </router-link>
          <router-link
            class="hover:bg-gray-50 h-9 rounded-lg flex items-center pl-2"
            to="/about-us"
          >
            About
          </router-link>
          <router-link
            class="hover:bg-gray-50 h-9 rounded-lg flex items-center pl-2"
            to="/all-products"
          >
            Products
          </router-link>
          <router-link
            class="hover:bg-gray-50 h-9 rounded-lg flex items-center pl-2"
            to="/User/order-history"
            v-if="this.$store.state.isAuthenticated"
          >
            Order History
          </router-link>
          <div
            v-if="this.$store.state.isAuthenticated"
            class="w-full bg-red-600 h-10 text-white text-center flex items-center justify-center rounded"
          >
            <button @click="Logout()">Logout</button>
          </div>
          <div class="flex items-center gap-4" v-else>
            <div class="grid grid-cols-2 w-full gap-5 place-items-center">
              <router-link
                class="block rounded-md bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-600"
                to="/log-in"
              >
                Login
              </router-link>
              <router-link
                class="block rounded-md bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-600"
                to="/sgin-up"
              >
                Register
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-8">
        <div class="menu hidden relative sm:flex gap-3 flex-row w-full">
          <button
            @click="(showcategory = !showcategory), (showtags = false)"
            class="hover:bg-gray-50 h-9 rounded-lg flex items-center pl-2"
          >
            Categories <i class="bx bx-chevron-down"></i>
          </button>
          <div
            :class="{ flex: showcategory, hidden: !showcategory }"
            class="submenu absolute flex flex-col items-start top-10 bg-white w-60 rounded-lg p-3 shadow-lg"
          >
            <router-link
              class="hover:bg-gray-50 h-9 rounded-lg flex items-center pl-2 w-full"
              v-for="category in this.categories"
              :to="'/category/' + category.name"
            >
              <i class="bx bx-right-arrow-alt"></i> {{ category.name }}
            </router-link>
          </div>
          <button
            @click="(showtags = !showtags), (showcategory = false)"
            class="hover:bg-gray-50 h-9 rounded-lg flex items-center pl-2"
            to="/"
          >
            Tags <i class="bx bx-chevron-down"></i>
          </button>
          <div
            :class="{ flex: showtags, hidden: !showtags }"
            class="submenu absolute flex flex-col items-start top-10 left-24 bg-white w-60 rounded-lg p-3 shadow-lg"
          >
            <router-link
              class="hover:bg-gray-50 h-9 rounded-lg flex items-center pl-2 w-full"
              v-for="tag in this.tags"
              :to="'/tag/' + tag.name"
            >
              <i class="bx bx-right-arrow-alt"></i> {{ tag.name }}
            </router-link>
          </div>
          <router-link
            class="hover:bg-gray-50 h-9 rounded-lg flex items-center pl-2"
            to="/contact"
          >
            Contact
          </router-link>
          <router-link
            class="hover:bg-gray-50 h-9 rounded-lg flex items-center pl-2"
            to="/about-us"
          >
            About
          </router-link>
          <router-link
            class="hover:bg-gray-50 h-9 rounded-lg flex items-center pl-2"
            to="/all-products"
          >
            Products
          </router-link>
          <router-link
            class="hover:bg-gray-50 h-9 rounded-lg flex items-center pl-2"
            to="/User/order-history"
            v-if="this.$store.state.isAuthenticated"
          >
            Order History
          </router-link>
          <div
            v-if="this.$store.state.isAuthenticated"
            class="w-36 ml-auto bg-red-600 h-10 text-white text-center flex items-center justify-center rounded"
          >
            <button @click="Logout()">Logout</button>
          </div>
          <div class="flex items-center gap-4 ml-auto" v-else>
            <div class="sm:flex sm:gap-4">
              <router-link
                class="block rounded-md bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-600"
                to="/log-in"
              >
                Login
              </router-link>

              <router-link
                class="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-red-600 transition hover:bg-white hover:text-red-600/75 sm:block"
                to="/sgin-up"
              >
                Register
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
<script>
export default {
  name: "Header",
  data() {
    return {
      showMobileMenu: false,
    };
  },
};
</script>
