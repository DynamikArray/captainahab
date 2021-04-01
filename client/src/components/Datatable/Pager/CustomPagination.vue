<script>
import { VPagination } from "vuetify/lib";
export default {
  extends: VPagination,
  methods: {
    genItem(h, i) {
      const color = i === this.value && (this.color || "primary");
      const isCurrentPage = i === this.value;
      const ariaLabel = isCurrentPage ? this.currentPageAriaLabel : this.pageAriaLabel;

      return h(
        "button",
        this.setBackgroundColor(color, {
          staticClass: "v-pagination__item",
          class: {
            "v-pagination__item--active": i === this.value,
          },
          attrs: {
            type: "button",
            "aria-current": isCurrentPage,
            "aria-label": this.$vuetify.lang.t(ariaLabel, i),
          },
          on: {
            click: () => this.$emit("input", i),
          },
        }),
        [i.toString()]
      );
    },
  },
};
</script>

<style scoped>
.v-pagination__item {
}
</style>
