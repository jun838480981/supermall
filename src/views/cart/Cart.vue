<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="cart-nav">
      <template #center>购物车({{ length }})</template>
    </nav-bar>

    <!-- 商品列表 -->
    <scroll
      class="content"
      ref="scroll"
      @scroll="contentScroll"
      :probeType="3"
      :pull-up-load="true"
    >
      <cart-list></cart-list>
    </scroll>

    <!-- 底部汇总 -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";

import CartList from "./childCopms/CartList";

export default {
  name: "Cart",
  methods: {
    contentScroll(position) {
      // 1.获取y值
      // const positionY = -position.y;
    },
  },
  components: {
    NavBar,
    Scroll,
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
.cart {
  position: relative;
  height: 100vh;
}
.cart-nav {
  background-color: var(--color-tint);
  color: #fff;
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>
