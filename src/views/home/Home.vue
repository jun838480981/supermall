<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template #center>购物街</template>
    </nav-bar>

    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabConrtol"
      />
      <goods-list :goods="showGoods" />
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop" />
    <!-- native修饰符：当我们监听一个组件的原生事件，必须加上native修饰符 -->
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "views/home/childComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import { getHomeMultidata, getHomeGoods } from "network/home";

export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      saveY: 0,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  // 组件创建生命周期函数
  created() {
    // 1.请求多个数据
    this.getHomeMultidata();

    // 请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // 1.获取tabOffsetTop
    // 所有的组件都有一个属性$el,用于获取组件中的元素
    // this.tabOffsetTop = this.$refs.tabConrtol.$el.offsetTop;
    // setTimeout(() => {
    //   console.log(this.tabOffsetTop);
    // }, 5000);
  },
  updated() {
    // mounted表示vue实例挂载完成；
    // beforeUpdate在data数据被改变后触发
    // updated表示更新DOM完成
    this.$refs.scroll.scroll.refresh();
    // 重新计算可滚动区域
  },
  activated() {
    // 被 keep-alive 缓存的组件激活时调用。
    // console.log("home activated");
    this.$refs.scroll.scroll.refresh();
    // 跳转到离开时保存的
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
  },
  deactivated() {
    // 被 keep-alive 缓存的组件停用时调用。
    // console.log("home deactivated");
    // 离开时记录当前滚动的位置并保存
    this.saveY = this.$refs.scroll.getScrollY();
  },
  destroyed() {
    console.log("home destroyed");
  },
  methods: {
    // 事件监听相关方法
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },
    backClick() {
      // 1,拿到this.$refs.scroll组件对象
      // 2,拿到组件对象里面的scroll属性
      // 3,再调用scroll的scrollTo()方法
      // this.$refs.scroll.scroll.scrollTo(0, 0, 500);

      // ref可以获取当前组件对象
      this.$refs.scroll.scrollTo(0, 0, 500);
      // 直接在this.$refs.scroll里封装一个scrollTo()方法,省去了第二步

      //scrollTo(x, y, time, easing, extraTransform,  )
    },
    contentScroll(position) {
      this.isShowBackTop = -position.y > 1000;
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
    },

    // 网络请求相关方法
    async getHomeMultidata() {
      let res = await getHomeMultidata();
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
      // getHomeMultidata().then((res) => {
      //   this.banners = res.data.banner.list;
      //   this.recommends = res.data.recommend.list;
      // });
    },
    async getHomeGoods(type) {
      let page = this.goods[type].page + 1;
      let res = await getHomeGoods(type, page);
      this.goods[type].list.push(...res.data.list);
      this.goods[type].page += 1;

      // 调用封装好的finishPullUp()
      this.$refs.scroll.finishPullUp();
      // getHomeGoods(type, page).then((res) => {
      //   this.goods[type].list.push(...res.data.list);
      //   this.goods[type].page += 1;

      //   // 调用封装好的finishPullUp()
      //   this.$refs.scroll.finishPullUp();
      // });
    },
  },
};
</script>

<style scoped>
/* scoped作用域 */
#home {
  /* padding-top: 44px; */
  height: 100vh;
  /* viewport height 可视窗口高度 */
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /* 在浏览器使用原生滚动时使用 */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

/* .content {
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px;
} */
</style>
