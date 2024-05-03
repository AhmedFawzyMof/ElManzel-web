import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import store from "../store/index";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about-us",
    name: "AboutUs",
    component: () => import("../views/Contact/AboutUs.vue"),
  },
  {
    path: "/all-products",
    name: "AllProduct",
    component: () => import("../views/AllProducts.vue"),
  },
  {
    path: "/contact/S",
    name: "contactsuccess",
    component: () => import("../views/Contact/contactsuccess.vue"),
  },
  {
    path: "/products/:id",
    name: "Product",
    component: () => import("../views/Product.vue"),
  },
  {
    path: "/category/:id",
    name: "Category",
    component: () => import("../views/Category.vue"),
  },
  {
    path: "/subcategory/:id",
    name: "SubCategory",
    component: () => import("../views/Subcategory.vue"),
  },
  {
    path: "/search",
    name: "Search",
    component: () => import("../views/Search.vue"),
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("../views/Cart.vue"),
  },
  {
    path: "/log-in",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/sgin-up",
    name: "Signup",
    component: () => import("../views/Signup.vue"),
  },
  {
    path: "/faq",
    name: "FAQ",
    component: () => import("../views/Contact/FAQ.vue"),
  },
  {
    path: "/contact",
    name: "Contact",
    component: () => import("../views/Contact/Contact.vue"),
  },
  {
    path: "/check-out",
    name: "Checkout",
    component: () => import("../views/Checkout.vue"),
  },
  {
    path: "/order/success",
    name: "OS",
    component: () => import("../views/OS.vue"),
  },
  {
    path: "/User/order-history",
    name: "OrderHistory",
    component: () => import("../views/OrderHistory.vue"),
    meta: {
      requireLogin: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (
    to.matched.some((record) => record.meta.requireLogin) &&
    !store.state.isAuthenticated
  ) {
    next({ name: "Login", query: { to: to.path } });
  } else {
    next();
  }
});

export default router;
