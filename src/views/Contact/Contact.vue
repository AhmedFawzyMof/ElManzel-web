<template>
  <section class="bg-gray-50 w-full">
    <div class="w-full mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
        <div class="lg:col-span-2 lg:py-12">
          <p class="max-w-xl text-lg">
            if you like the website you can contact me via phone or whatsapp 👇🏼
          </p>

          <div class="mt-8">
            <a href="" class="text-2xl font-bold text-red-600">
              0121 215 8465
            </a>
          </div>
        </div>

        <div class="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
          <form @submit.prevent="ContactForm" class="space-y-4">
            <div>
              <label class="sr-only" for="name">Name</label>
              <input
                class="w-full rounded-lg border-gray-200 p-3 text-sm"
                placeholder="Name"
                type="text"
                id="name"
                v-model="name"
                required
              />
            </div>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label class="sr-only" for="email">Email</label>
                <input
                  class="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Email address"
                  type="email"
                  id="email"
                  v-model="email"
                  required
                />
              </div>

              <div>
                <label class="sr-only" for="phone">Phone</label>
                <input
                  class="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Phone Number"
                  type="tel"
                  id="phone"
                  v-model="phone"
                  required
                />
              </div>
            </div>

            <div>
              <label class="sr-only" for="message">Message</label>

              <textarea
                class="w-full rounded-lg border-gray-200 p-3 text-sm"
                placeholder="Message"
                rows="8"
                id="message"
                v-model="message"
                required
              ></textarea>
            </div>

            <div class="mt-4">
              <button
                type="submit"
                class="inline-block w-full rounded-lg bg-red-600 px-5 py-3 font-medium text-white sm:w-auto"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import axios from "axios";
export default {
  name: "Contact",
  data() {
    return {
      phone: "",
      message: "",
      name: "",
      email: "",
      errors: [],
    };
  },
  mounted() {
    if (this.$store.state.Lang) {
      document.title = "اتصل بنا | المنزل";
    } else {
      document.title = "Contact Us | المنزل";
    }
  },
  methods: {
    ContactForm() {
      this.errors = [];

      if (this.phone === "") {
        this.errors.push("The phone number is missing ");
      }
      if (this.message === "") {
        this.errors.push("The message is missing ");
      }

      const Data = {
        name: this.name,
        email: this.email,
        phone: this.phone,
        message: this.message,
      };

      this.$store.state.loading = true;
      axios.post(`/contact`, Data).then((response) => {
        this.$router.push("/contact/S");
      });

      this.$store.state.loading = false;
    },
  },
};
</script>
