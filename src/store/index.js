import { createStore } from "vuex";

export default createStore({
  state: {
    cart: {
      items: [],
    },
    isAuthenticated: false,
    token: "",
    loading: false,
  },
  getters: {},
  mutations: {
    reloadCart(state, cart) {
      state.cart.items = cart;
      if (localStorage.getItem("cart")) {
        state.cart = JSON.parse(localStorage.getItem("cart"));
      } else {
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    initializeStore(state) {
      if (localStorage.getItem("cart")) {
        state.cart = JSON.parse(localStorage.getItem("cart"));
      } else {
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }

      if (localStorage.getItem("token")) {
        state.token = localStorage.getItem("token");
        state.isAuthenticated = true;
      } else {
        state.token = "";
        state.isAuthenticated = false;
      }
    },
    addToCart(state, item) {
      const exists = state.cart.items.find(
        (i) => i.product.id === item.product.id && item.color === i.color
      );

      if (!exists) {
        state.cart.items.push(item);
        localStorage.setItem("cart", JSON.stringify(state.cart));
        return;
      }

      if (exists.quantity < 20) {
        const newQuantity = exists.quantity + item.quantity;
        if (newQuantity > 20 && exists.quantity > 20) {
          exists.quantity++;
        } else {
          exists.quantity = newQuantity;
        }
      }

      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    setToken(state, token) {
      state.token = token;
      state.isAuthenticated = true;
    },
    removeToken(state) {
      state.token = "";
      state.isAuthenticated = false;
    },
    clearCart(state) {
      state.cart = {
        items: [],
      };

      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
  },
  actions: {
    logout({ commit }) {
      commit("removeToken");
      commit("clearCart");
    },
  },
  modules: {},
});
