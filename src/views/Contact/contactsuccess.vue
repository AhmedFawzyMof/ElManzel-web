<template>
  <div class="w-full flex items-center justify-center h-screen">
    <article
      class="rounded-xl bg-white p-4 ring ring-red-50 sm:p-6 lg:p-8 sm:w-1/2"
    >
      <div class="flex items-start sm:gap-8">
        <div
          class="hidden sm:grid sm:h-20 sm:w-20 sm:shrink-0 sm:place-content-center sm:rounded-full sm:border-2 sm:border-red-500"
          aria-hidden="true"
        >
          <div class="flex items-center gap-1">
            <i class="bx bx-check text-red-500 text-5xl"></i>
          </div>
        </div>

        <div>
          <strong
            class="rounded border border-red-500 bg-red-500 px-3 py-1.5 text-[10px] font-medium text-white"
          >
            Success
          </strong>

          <h3 class="mt-4 text-lg font-medium sm:text-xl">
            <a href="" class="hover:underline"> Thanks For Contacting Us </a>
          </h3>
        </div>
      </div>
    </article>
  </div>
</template>
<script>
export default {
  name: "contactsuccess",
  mounted() {
    if (this.$store.state.Lang) {
      document.title = "تم إرسال الرسالة بنجاح | المنزل";
    } else {
      document.title = "the message sent successfully | المنزل";
    }
  },
};
</script>
<style>
.successmessage {
  width: 500px;
  background: #eee;
  padding: 30px 20px;
  border-radius: 5px;
  box-shadow: -2px 2px 3px 3px #33333369;
  display: grid;
  place-items: center;
  gap: 30px;
  text-transform: capitalize;
}

@media (max-width: 500px) {
  .successmessage {
    width: 95%;
  }
}
</style>
