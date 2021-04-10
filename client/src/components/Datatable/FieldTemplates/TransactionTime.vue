<template>
  <v-slide-x-reverse-transition mode="out-in">
    <div class="textShadow d-flex flex-column justify-center align-start my-1" :key="`transition_txTime_${item._id}`">
      <div class="d-flex align-start justify-center">
        <Timeago
          :key="item.hash"
          :datetime="item.createdAt"
          class="font-weight-thin mb-1"
          style="line-height: 1.2; font-size: 90%"
        />
      </div>
      <div class="d-flex align-center justify-start grey--text" style="font-size: 80%">
        {{ new Date(item.createdAt) | dateTime }}
      </div>
    </div>
  </v-slide-x-reverse-transition>
</template>

<script>
export default {
  props: {
    item: {
      type: [Boolean, Object],
      default: false,
    },
  },
};
</script>

<style scoped></style>
