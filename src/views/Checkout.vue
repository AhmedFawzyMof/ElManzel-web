<template>
  <div class="mx-5 max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
    <div class="w-full flex flex-col sm:flex-row-reverse gap-5">
      <div class="w-full sm:w-1/2">
        <div class="mt-1 flex justify-center pt-8">
          <div class="w-full space-y-4">
            <dl class="space-y-0.5 text-sm text-gray-700">
              <div class="flex justify-between">
                <dt>Subtotal</dt>
                <dd>{{ cartTotalPrice }} EGP</dd>
              </div>

              <div class="flex justify-between">
                <dt>Shipping</dt>
                <dd>{{ shippingPrice.toFixed(2) }} EGP</dd>
              </div>

              <div class="flex justify-between">
                <dt>Proudcts</dt>
                <dd>{{ cartTotalLength }}</dd>
              </div>

              <div class="flex justify-between" v-if="discount != 0">
                <dt>Discount</dt>
                <dd>-£20</dd>
              </div>

              <div class="flex justify-between !text-base font-medium">
                <dt>Total</dt>
                <dd>{{ (cartTotalPrice + shippingPrice).toFixed(2) }} EGP</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
      <div class="w-full sm:w-1/2">
        <fieldset class="flex flex-wrap gap-3">
          <legend class="sr-only">Payment Method</legend>

          <div>
            <label
              for="cash"
              class="flex cursor-pointer items-center justify-center rounded-md border border-gray-100 bg-white px-3 py-2 text-gray-900 hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-500 has-[:checked]:text-white"
            >
              <input
                type="radio"
                name="PaymentMethod"
                value="cash"
                v-model="method"
                @input="ChingeTheMethod('cash')"
                id="cash"
                class="sr-only"
                checked
              />

              <p class="text-sm font-medium">Cash</p>
            </label>
          </div>
          <div v-if="this.$store.state.isAuthenticated">
            <label
              for="paypal"
              class="flex cursor-pointer items-center justify-center rounded-md border border-gray-100 bg-white px-3 py-2 text-gray-900 hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-500 has-[:checked]:text-white"
            >
              <input
                type="radio"
                name="PaymentMethod"
                id="paypal"
                v-model="method"
                @input="ChingeTheMethod('paypal')"
                class="sr-only"
              />

              <p class="text-sm font-medium">PayPal</p>
            </label>
          </div>
        </fieldset>
        <form
          v-if="method == 'cash'"
          @submit.prevent="Form"
          class="mt-5 flex items-start flex-col justify-center"
        >
          <div class="input grid gap-2 w-full">
            <label>First Name</label>
            <input
              class="border-b border-solid w-full"
              type="text"
              v-model="first_name"
              placeholder="FirstName..."
            />
          </div>
          <div class="input grid gap-2 w-full mt-4">
            <label>Last Name</label>
            <input
              class="border-b border-solid w-full"
              type="text"
              v-model="last_name"
              placeholder="LastName..."
            />
          </div>
          <div
            v-if="!this.$store.state.isAuthenticated"
            class="input grid gap-2 w-full mt-4"
          >
            <label>Email</label>
            <input
              class="border-b border-solid w-full"
              type="text"
              v-model="email"
              placeholder="Email..."
            />
          </div>
          <div class="input grid gap-2 w-full mt-4">
            <label>Phone</label>
            <input
              class="border-b border-solid w-full"
              type="tel"
              v-model="phone"
              placeholder="Phone..."
            />
          </div>
          <div class="input grid gap-2 w-full mt-4">
            <label>Spare Phone</label>
            <input
              class="border-b border-solid w-full"
              type="tel"
              v-model="phone2"
              placeholder="Spare Phone..."
            />
          </div>
          <div class="input grid gap-2 w-full mt-4">
            <label>Address</label>
            <textarea
              class="border rounded-lg"
              v-model="address"
              cols="30"
              rows="5"
            >
            </textarea>
          </div>
          <div
            v-if="errors.length > 0"
            role="alert"
            class="rounded border-s-4 border-red-500 bg-red-50 p-4 w-full mt-4"
          >
            <div
              class="flex items-center gap-2 text-red-800 mt-3"
              v-for="error in errors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="h-5 w-5"
              >
                <path
                  fill-rule="evenodd"
                  d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                  clip-rule="evenodd"
                />
              </svg>

              <strong class="block font-medium capitalize">
                {{ error.message }}
              </strong>
            </div>
          </div>
          <button
            type="submit"
            class="mt-4 bg-red-600 text-white w-full h-11 rounded-md"
          >
            Order
          </button>
        </form>
        <form
          v-if="paypal"
          class="mt-5 flex items-start flex-col justify-center"
        >
          <div class="input grid gap-2 w-full mt-4">
            <label>Phone</label>
            <input
              class="border-b border-solid w-full"
              type="tel"
              v-model="phone"
              placeholder="Phone..."
            />
          </div>
          <div class="input grid gap-2 w-full mt-4">
            <label>Spare Phone</label>
            <input
              class="border-b border-solid w-full"
              type="tel"
              v-model="phone2"
              placeholder="Spare Phone..."
            />
          </div>
          <div
            v-if="errors.length > 0"
            role="alert"
            class="rounded border-s-4 border-red-500 bg-red-50 p-4 w-full mt-4"
          >
            <div
              class="flex items-center gap-2 text-red-800 mt-3"
              v-for="error in errors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="h-5 w-5"
              >
                <path
                  fill-rule="evenodd"
                  d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                  clip-rule="evenodd"
                />
              </svg>

              <strong class="block font-medium capitalize">
                {{ error.message }}
              </strong>
            </div>
          </div>
        </form>
        <div
          :class="{ flex: paypal, hidden: !paypal }"
          class="mt-5"
          id="PayPalButtons"
        ></div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Checkout",
  data() {
    return {
      loaded: false,
      discount: 0,
      paypal: false,
      method: "",
      code: "",
      cart: {
        items: [],
      },
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      phone2: "",
      address: "",
      errors: [],
    };
  },
  async mounted() {
    const script = document.createElement("script");
    script.setAttribute("data-namespace", "paypal_sdk");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AU4ECLDAlYkHzUEY5h4J3AvPN0sCi7P0aU5FL2QoSArKMRqwmok_mKp9Iq11GKU8HA0qlsN1uEkmAJjH"; // Replace YOUR_CLIENT_ID with your actual client ID
    script.addEventListener("load", this.setLoaded);
    document.body.appendChild(script);
    if (this.$store.state.Lang) {
      document.title = "الدفع | البيت بيتك";
    } else {
      document.title = "Checkout | البيت بيتك";
    }

    this.$store.state.loading = true;

    await this.GetDollarPrice();

    this.$store.state.loading = false;
    this.cart = this.$store.state.cart;
    if (this.cart.items.length == 0) {
      this.$router.push("/cart");
    }
    this.method = "cash";
  },
  methods: {
    setLoaded: async function () {
      const dollarPrice = await this.GetDollarPrice();
      const items = this.cart.items;

      let carttotal = 0;
      items.forEach((item) => {
        carttotal += item.product.price * item.quantity;
      });
      let shipping = carttotal * 0.1;

      const subtotal = carttotal + shipping;

      const total = Math.round(subtotal / dollarPrice);

      console.log(total);
      this.loaded = true;
      paypal_sdk
        .Buttons({
          createOrder: (data, actions) => {
            this.errors = [];

            if (this.phone === "") {
              this.errors.push({ message: "The phone is missing " });
            }
            if (this.phone2 === "") {
              this.errors.push({
                message: "The Spare Phone Number is missing ",
              });
            }

            if (this.errors.length > 0) {
              return;
            }
            if (this.errors.length == 0) {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: "USD",
                      value: total.toFixed(2),
                    },
                  },
                ],
              });
            }
          },
          onApprove: async (data, actions) => {
            if (this.errors.length > 0) {
              return;
            }
            const order = await actions.order.capture();
            this.paidFor = true;
            const name = this.first_name + " " + this.last_name;
            this.email = order.payer.email_address;
            const items = [];
            for (let i = 0; i < this.cart.items.length; i++) {
              const item = this.cart.items[i];
              let obj = {};
              if (item.color) {
                obj = {
                  product: item.product.id,
                  quantity: item.quantity,
                  color: item.color,
                };
              } else {
                obj = {
                  product: item.product.id,
                  quantity: item.quantity,
                };
              }

              items.push(obj);
            }

            const Data = {
              name: name,
              email: this.email,
              method: this.method,
              phone: this.phone,
              spare_phone: this.phone2,
              address: this.address,
              items: items,
            };
            if (this.$store.state.isAuthenticated) {
              axios.post("/auth/checkout", Data).then((response) => {
                this.$store.commit("clearCart");

                this.$router.push("/cart/O-S");
              });
            }
            axios.post("/checkout", Data).then((response) => {
              this.$store.commit("clearCart");

              this.$router.push("/cart/O-S");
            });
          },
          onError: (err) => {
            console.log(err);
          },
        })
        .render("#PayPalButtons");
    },
    async GetDollarPrice() {
      const req = await fetch(
        "https://api.currencyfreaks.com/v2.0/rates/latest?apikey=cf8ca466c1fd4643a58b769d6c5c72ff&symbols=EGP"
      );

      const dollarToEgp = await req.json();

      return dollarToEgp.rates.EGP;
    },
    ChingeTheMethod(method) {
      this.method = method;
      if (method == "paypal") {
        this.paypal = true;
      } else {
        this.paypal = false;
      }
    },
    getItemTotal(item) {
      return item.quantity * item.product.price;
    },
    Form() {
      this.errors = [];

      if (this.first_name === "") {
        this.errors.push({ message: "The first name is missing " });
      }
      if (this.last_name === "") {
        this.errors.push({ message: "The last name is missing " });
      }
      if (!this.$store.state.isAuthenticated) {
        if (this.email === "") {
          this.errors.push({ message: "The email is missing " });
        }
      }
      if (this.phone === "") {
        this.errors.push({ message: "The phone is missing " });
      }
      if (this.phone2 === "") {
        this.errors.push({ message: "The Spare Phone Number is missing " });
      }
      if (this.address === "") {
        this.errors.push({ message: "The address is missing " });
      }

      if (this.errors.length > 0) {
        return;
      }
      const name = this.first_name + " " + this.last_name;

      const items = [];
      for (let i = 0; i < this.cart.items.length; i++) {
        const item = this.cart.items[i];
        let obj = {};
        if (item.color) {
          obj = {
            product: item.product.id,
            quantity: item.quantity,
            color: item.color,
          };
        } else {
          obj = {
            product: item.product.id,
            quantity: item.quantity,
          };
        }

        items.push(obj);
      }

      const Data = {
        name: name,
        email: this.email,
        method: this.method,
        phone: this.phone,
        spare_phone: this.phone2,
        address: this.address,
        items: items,
      };

      if (this.$store.state.isAuthenticated) {
        this.$store.state.loading = true;
        axios.post("/auth/checkout", Data).then((response) => {
          this.$store.state.loading = false;
          if (response.data.Error) {
            // do tost with error
          }
          this.$store.commit("clearCart");

          this.$router.push("/order/success");
        });
      } else {
        this.$store.state.loading = true;
        axios.post("/checkout", Data).then((response) => {
          this.$store.state.loading = false;
          if (response.data.Error) {
            // do tost with error
          }
          this.$store.commit("clearCart");

          this.$router.push("/order/success");
        });
      }
    },
  },
  computed: {
    cartTotalLength() {
      return this.cart.items.reduce((acc, curVal) => {
        return (acc += curVal.quantity);
      }, 0);
    },
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
