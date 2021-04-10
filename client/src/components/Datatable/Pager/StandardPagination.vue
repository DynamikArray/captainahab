<template>
  <div>
    <div class="d-flex align-center justify-space-between">
      <div class="d-flex align-center justify-space-between">
        <!-- PLaceholder -->
      </div>
      <div class="d-flex align-center justify-space-between">
        <v-data-footer
          next-icon="fa fa-chevron-circle-right"
          prev-icon="fa fa-chevron-circle-left"
          style="border-width: 0px !important"
          :pagination="pagination"
          :options="options"
          @update:options="updateOptions"
          items-per-page-text="$vuetify.dataTable.itemsPerPageText"
        />
      </div>
    </div>
    <v-divider></v-divider>
  </div>
</template>

<script>
export default {
  props: {
    pagination: {
      type: [Boolean, Object],
    },
    options: {
      type: [Boolean, Object],
    },
  },
  methods: {
    updateOptions(options) {
      console.log("NEW OTIONS", options);
      this.$emit("update:options", options);
    },
  },
};
</script>

<style scoped></style>
