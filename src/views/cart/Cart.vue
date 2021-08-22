<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="cart-nav">
      <template #center>购物车({{ length }})</template>
    </nav-bar>

    <!-- 商品列表 -->
    <cart-list></cart-list>

    <!-- 底部汇总 -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import NavBar from "components/common/navbar/NavBar";
import CartList from "./childCopms/CartList";

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
  },
  computed: {
    // ...mapGetters(["cartLength", "cartList"]),
    // 自定义名称用法
    ...mapGetters({
      length: "cartLength",
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
