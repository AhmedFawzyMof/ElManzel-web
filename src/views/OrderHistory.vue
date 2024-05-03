<template>
  <div class="w-full flex items-center justify-center mt-10 mb-10 flex-nowrap">
    <OrderSummary v-for="order in orders" v-bind:order="order" />
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
      await axios.get("/order-histroy").then((response) => {
        this.orders = response.data.Orders;
        console.log(this.orders);
      });

      this.$store.state.loading = false;
    },
  },
};
</script>
