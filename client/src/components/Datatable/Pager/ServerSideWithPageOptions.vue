<template>
  <div class="d-flex align-center caption">
    <ItemsPerPageDropdown :limit="limit" @limitChanged="handleLimitChanged" />
    <ServerSidePager
      v-if="page > 0"
      :page="page"
      :totalPages="totalPages"
      :totalRecords="totalRecords"
      :pageLimit="limit"
      @pageChange="handlePageChange"
    />
  </div>
</template>

<script>
import ItemsPerPageDropdown from "./ItemsPerPageDropdown";
import ServerSidePager from "./ServerSidePager";
export default {
  props: {
    page: {
      type: Number,
      default: 1,
    },
    totalPages: {
      type: Number,
      default: 0,
    },
    limit: {
      type: Number,
      default: 0,
    },
    totalRecords: {
      type: Number,
      default: 0,
    },
  },
  components: {
    ItemsPerPageDropdown,
    ServerSidePager,
  },
  computed: {
    createPagerString() {
      const startCount = this.page * this.pageLimit + 1 - this.pageLimit;
      let endCount = 0;
      if (this.page == Math.ceil(this.rowsTotal / this.pageLimit)) {
        endCount = this.totalRecords;
      } else {
        endCount = this.page * this.pageLimit;
      }
      if (this.totalRecords > 5000) {
        return `Results ${startCount} to ${endCount} Limited to first 5000 of ${this.totalRecords} total`;
      } else {
        return `Results ${startCount} to ${endCount} of ${this.totalRecords} total`;
      }
    },
  },
  methods: {
    handlePageChange(page) {
      this.$emit("pageChange", page);
    },
    handleLimitChanged(page) {
      this.$emit("limitChange", page);
    },
  },
};
</script>

<style scoped></style>
