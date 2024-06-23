<template>
  <div
    class="flow-root rounded-lg border border-gray-100 py-3 shadow-sm mx-5 sm:mx-14"
  >
    <dl class="-my-3 divide-gray-100 text-sm">
      <div
        class="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
      >
        <dt class="font-bold text-gray-900">Order Number</dt>
        <dd class="text-gray-700 sm:col-span-2">
          {{ order.id.substr([], 8) }}
        </dd>
      </div>

      <div
        class="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
      >
        <dt class="font-bold text-gray-900">Order Date</dt>
        <dd class="text-gray-700 sm:col-span-2">
          {{ new Date(order.created_at).toUTCString() }}
        </dd>
      </div>
      <div
        class="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
      >
        <dt class="font-bold text-gray-900">Payment Method</dt>
        <dd class="text-gray-700 sm:col-span-2 capitalize">
          {{ order.method }}
        </dd>
      </div>
      <div
        class="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
      >
        <dt class="font-bold text-gray-900">Order Status</dt>
        <dd class="text-gray-700 sm:col-span-2">
          {{ order.order_status }}
        </dd>
      </div>
      <div
        class="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
      >
        <dt class="font-bold text-gray-900">Order Products</dt>
        <dd class="text-gray-700 sm:col-span-2">
          <table class="w-full">
            <thead class="grid grid-cols-4">
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </thead>
            <tbody class="divide-y">
              <tr
                v-for="product in order.items"
                class="grid grid-cols-4 place-items-center"
              >
                <td class="text-center sm:hidden">
                  {{
                    product.name.length <= 20
                      ? product.name
                      : product.name.substr(0, 18) + "..."
                  }}
                </td>
                <td class="text-center hidden sm:block">{{ product.name }}</td>
                <td class="text-center">{{ product.price }}</td>
                <td class="text-center">{{ product.quantity }}</td>
                <td class="text-center">
                  {{ product.quantity * product.price }}
                </td>
              </tr>
            </tbody>
          </table>
        </dd>
      </div>
      <div
        class="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
      >
        <dt class="font-bold text-gray-900">Order Total</dt>
        <dd class="text-gray-700 sm:col-span-2">
          {{ OrderTotal(order.items) }} EGP
        </dd>
      </div>
      <div
        class="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
      >
        <dt class="font-bold text-gray-900">Order Is Paid</dt>
        <dd class="text-gray-700 sm:col-span-2 capitalize">
          {{ order.ispaid == true ? "yes" : "no" }}
        </dd>
      </div>
      <div
        class="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
      >
        <dt class="font-bold text-gray-900">Order Is Delivered</dt>
        <dd class="text-gray-700 sm:col-span-2 capitalize">
          {{ order.isdelivered == true ? "yes" : "no" }}
        </dd>
      </div>
    </dl>
  </div>
</template>

<script>
export default {
  name: "OrderSummary",
  props: {
    order: Object,
  },
  mounted() {
    if (this.order.order_status == "pending") {
      this.order.order_status = "⏳ pending";
    }
  },
  methods: {
    OrderTotal(items) {
      return items.reduce((acc, curVal) => {
        return (acc += curVal.price * curVal.quantity);
      }, 0);
    },
  },
};
</script>
