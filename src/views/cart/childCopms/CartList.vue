<template>
  <div class="cart-list">列表</div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "CartList",
  computed: {
    ...mapGetters(["cartList"]),
  },
};
</script>

<style scoped></style>
