<template>
  <div>
    <tab-bar>
       <tab-bar-item path="/home" activeColor="#ff8198">
          <template #item-icon><img src="~assets/img/tabbar/home.svg" alt=""></template>
          <template #item-icon-active><img src="~assets/img/tabbar/home_active.svg" alt=""></template>
          <template #item-text><div>首页</div></template>
       </tab-bar-item>
       <tab-bar-item path="/category" activeColor="#ff8198">
          <template #item-icon><img src="~assets/img/tabbar/category.svg" alt=""></template>
          <template #item-icon-active><img src="~assets/img/tabbar/category_active.svg" alt=""></template>
          <template #item-text><div>分类</div></template>
       </tab-bar-item>
       <tab-bar-item path="/cart" activeColor="#ff8198">
          <template #item-icon><img src="~assets/img/tabbar/shopcart.svg" alt=""></template>
          <template #item-icon-active><img src="~assets/img/tabbar/shopcart_active.svg" alt=""></template>
          <template #item-text><div>购物车</div></template>
       </tab-bar-item>
       <tab-bar-item path="/profile" activeColor="#ff8198">
          <template #item-icon><img src="~assets/img/tabbar/profile.svg" alt=""></template>
          <template #item-icon-active><img src="~assets/img/tabbar/profile_active.svg" alt=""></template>
          <template #item-text><div>我的</div></template>
       </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
// 不是使用import的引入的，在html使用src方式的在链接名字前加 ‘ ~ ’ 符号才行
  import TabBar from 'components/common/tabbar/TabBar' 
  import TabBarItem from 'components/common/tabbar/TabBarItem'

  export default {
    name: 'MainTabBar',
    components: {
      TabBar,
      TabBarItem
    }
  }
</script>

<style>

</style>