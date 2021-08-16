<template>
  <div class="cart">
    <nav-bar class="cart-nav">
      <template #center>购物车({{ length }})</template>
    </nav-bar>
    <ul>
      <li v-for="(item, index) in list" :key="index">
        <img width="100%" :src="item.image" alt="" />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import NavBar from "components/common/navbar/NavBar";
export default {
  name: "Cart",
  components: {
    NavBar,
  },
  computed: {
    // ...mapGetters(["cartLength", "cartList"]),
    // 自定义名称用法
    ...mapGetters({
      length: "cartLength",
      list: "cartList",
    }),
  },
};
</script>

<style scoped>
.cart-nav {
  background-color: var(--color-tint);
  color: #fff;
}
</style>
