import Vue from "vue";
import VueToastr from "vue-toastr";

Vue.use(VueToastr, {
  defaultTimeout: 3000,
  defaultPosition: "toast-top-right",
  defaultCloseOnHover: false,
});
