<template>
  <div class="incomingTxsWrapper">
    <IncomingTxsContainer />
  </div>
</template>

<script>
import IncomingTxsContainer from "@/components/IncomingTxs/IncomingTxsContainer";
export default {
  name: "IncomingView",
  components: {
    IncomingTxsContainer,
  },
};
</script>

<style scoped></style>
