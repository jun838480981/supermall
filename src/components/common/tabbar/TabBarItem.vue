<template>  
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
  export default {
    name: 'TabBarItem',
    data() {
      return {
        // isActive: true
      }
    },
    computed: {
      isActive() {
        // 思路
        // $route当前活跃的路由对象
        // 通过判断活跃的路径和当前路径进行判断

        // 方法1
        // includes() 方法用于判断字符串是否包含指定的子字符串。
        // 如果找到匹配的字符串则返回 true，否则返回 false。
        return this.$route.path.includes(this.path)

        // 方法2
        // return this.$route.path.indexOf(this.path) !== -1
        // ndexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。
        // 如果要检索的字符串值没有出现，则该方法返回 -1。

        // 方法3
        // return this.$route.path === this.path
      },
      activeStyle() {
        return this.isActive ? {color: this.activeColor} : {}
      }
    },
    props: {
     path: String,
     activeColor: {
       type: String,
       default: 'red'
     }
    },
    methods: {
      itemClick() {
        this.$router.replace(this.path);
      }
    }
  }
</script>

<style>
  .tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }

  .tab-bar-item img{
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
  /* .active{
    color: red
  } */
</style>