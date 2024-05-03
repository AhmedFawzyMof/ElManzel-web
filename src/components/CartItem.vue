<template>
  <li class="flex items-center gap-4">
    <img
      :src="item.product.image"
      alt=""
      class="h-16 w-16 rounded object-cover"
    />

    <div>
      <router-link to="/check-out">
        <h3 class="text-sm text-gray-900">
          {{ item.product.name }}
        </h3>
      </router-link>

      <dl class="mt-0.5 space-y-px text-[10px] text-gray-600">
        <div v-if="item.size">
          <dt class="inline">Size:</dt>
          <dd class="inline">{{ item.size }}</dd>
        </div>

        <div v-if="item.color">
          <dt class="inline">Color:</dt>
          <dd class="inline">{{ item.color }}</dd>
        </div>
      </dl>
    </div>

    <div class="flex flex-1 items-center justify-end gap-2">
      <p>{{ item.product.price }}</p>
      <form>
        <label for="Line1Qty" class="sr-only"> Quantity </label>

        <input
          type="number"
          min="1"
          max="20"
          :value="item.quantity"
          @input="updateCart"
          id="Line1Qty"
          class="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none text-sm"
        />
      </form>

      <button
        @click="removeFromCart"
        class="text-gray-600 transition hover:text-red-600"
      >
        <span class="sr-only">Remove item</span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-4 w-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      </button>
    </div>
  </li>
</template>

<script>
export default {
  name: "CartItem",
  props: {
    initialItem: Object,
  },
  data() {
    return {
      item: this.initialItem,
    };
  },
  methods: {
    getItemTotal(item) {
      return item.quantity * item.product.price;
    },
    updateCart() {
      this.item.quantity = parseInt(event.target.value);
      if (this.item.quantity > 20) {
        this.item.quantity = 20;
      } else if (this.item.quantity < 1) {
        this.item.quantity = 1;
      }
      localStorage.setItem("cart", JSON.stringify(this.$store.state.cart));
    },
    removeFromCart(item) {
      this.$emit("removeFromCart", item);
    },
  },
};
</script>

<style lang="scss">
.CartItem {
  display: grid;
  place-items: center;
  grid-template-columns: repeat(6, 1fr) auto;

  .p {
    width: 25px;
    height: 25px;
    border-radius: 50px;
  }
  .Q {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;

    a:first-child {
      i {
        transition: 0.4s;
      }

      &:hover i {
        color: green;
      }
    }
    a:last-child {
      i {
        transition: 0.4s;
      }

      &:hover i {
        color: #c2c205;
      }
    }
  }
  #delete {
    cursor: pointer;
    border-radius: 50px;
    border: none;
    background: none;
    width: 25px;
    height: 25px;
    font-size: 20px;
    display: grid;
    place-items: center;
    i {
      transition: 0.4s;
      color: gray;
    }

    &:hover i {
      color: red;
    }
  }
  img {
    width: 75px;
    height: 75px;
    border-radius: 10px;
    box-shadow: 0 0 5px 2px #3333335a;
  }
}
</style>
