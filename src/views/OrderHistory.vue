<template>
  <div
    class="w-full flex flex-col items-center justify-center mt-10 mb-10 flex-nowrap gap-3"
    v-if="orders.length > 0"
  >
    <OrderSummary v-for="order in orders" v-bind:order="order" />
  </div>
  <div class="h-screen grid place-items-center" v-else>
    <h1 class="text-3xl font-bold">No Offers Found</h1>
  </div>
</template>

<script>
import axios from "axios";
import OrderSummary from "../components/OrderSummary.vue";

export default {
  name: "OrderHistory",
  components: {
    OrderSummary,
  },
  data() {
    return {
      orders: [],
    };
  },
  mounted() {
    document.title = "Order History | البيت بيتك";

    this.getMyOrders();
  },
  methods: {
    async getMyOrders() {
      this.$store.state.loading = true;
      await axios.get("/api/orderhistory").then((response) => {
        this.orders = response.data.Orders;
        console.log(this.orders);
      });

      this.$store.state.loading = false;
    },
  },
};
</script>
