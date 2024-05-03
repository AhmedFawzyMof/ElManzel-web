<template>
  <section>
    <div
      v-if="cart.items.length > 0"
      class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8"
    >
      <div class="mx-auto max-w-3xl">
        <header class="text-center">
          <h1 class="text-xl font-bold text-gray-900 sm:text-3xl">My Cart</h1>
        </header>

        <div class="mt-8">
          <ul class="space-y-4">
            <CartItem
              v-for="item in cart.items"
              v-bind:key="item.product.id"
              v-bind:initialItem="item"
              v-on:removeFromCart="removeFromCart(item)"
            />
          </ul>

          <div class="mt-8 flex justify-end border-t border-gray-100 pt-8">
            <div class="w-screen max-w-lg space-y-4">
              <dl class="space-y-0.5 text-sm text-gray-700">
                <div class="flex justify-between">
                  <dt>Subtotal</dt>
                  <dd>{{ cartTotalPrice }} EGP</dd>
                </div>

                <div class="flex justify-between">
                  <dt>Shipping</dt>
                  <dd>{{ shippingPrice.toFixed(2) }} EGP</dd>
                </div>

                <div class="flex justify-between !text-base font-medium">
                  <dt>Total</dt>
                  <dd>{{ (cartTotalPrice + shippingPrice).toFixed(2) }} EGP</dd>
                </div>
              </dl>

              <div class="flex justify-end">
                <router-link
                  to="/check-out"
                  class="block rounded bg-red-600 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                >
                  Checkout
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="cart.items.length == 0"
      class="bg-gray-50 w-full flex items-center flex-col justify-center"
    >
      <img src="/cart.png" alt="Empty Cart" class="sm:w-1/2" />
      <p class="capitalize">
        the cart is empty go
        <router-link to="/" class="text-red-600"> shopping </router-link>
      </p>
    </div>
  </section>
</template>
<script>
import CartItem from "../components/CartItem.vue";

export default {
  name: "Cart",
  components: {
    CartItem,
  },
  data() {
    return {
      cart: {
        items: [],
      },
    };
  },
  mounted() {
    this.cart = this.$store.state.cart;

    if (this.$store.state.Lang) {
      document.title = "عربة التسوق الخاصة بي | البيت بيتك";
    } else {
      document.title = "My Cart | البيت بيتك";
    }
  },
  methods: {
    removeFromCart(item) {
      const cart = [];
      this.cart.items.forEach((i) => {
        if (i.product.id !== item.product.id) {
          cart.push(i);
        } else if (i.product.id === item.product.id && i.color !== item.color) {
          cart.push(i);
        }
      });
      localStorage.setItem("cart", JSON.stringify({ items: cart }));
      location.reload();
    },
  },
  computed: {
    cartTotalPrice() {
      return this.cart.items.reduce((acc, curVal) => {
        return (acc += curVal.product.price * curVal.quantity);
      }, 0);
    },
    shippingPrice() {
      let shippingPrice = this.cartTotalPrice * 0.1;

      return shippingPrice;
    },
  },
};
</script>
