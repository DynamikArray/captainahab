<template>
  <div class="d-flex-column align-start justify-space-start flex-grow-1">
    <div class="d-flex align-center justify-center">{{ createPagerString }}</div>
    <div class="d-flex align-center justify-space-between">
      <v-pagination
        color="primary"
        :key="Date.now()"
        style="max-width: 590px"
        :value="page"
        :length="totalPages"
        @input="handleInput"
        total-visible="7"
        prev-icon="fa-caret-left"
        next-icon="fa-caret-right"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
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
    pageLimit: {
      type: Number,
      default: 0,
    },
    totalRecords: {
      type: Number,
      default: 0,
    },
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
    handleInput(page) {
      this.$emit("pageChange", page);
    },
  },
};
</script>

<style scoped></style>
