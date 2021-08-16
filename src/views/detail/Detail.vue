<template>
  <div id="detail">
    <detail-nav-bar
      class="detail-nav-bar"
      @titleClick="titleClick"
      ref="nav"
      :currentIndex="currentIndex"
    />
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probeType="3">
      <detail-swiper ref="swiper" :topImages="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info ref="param" :paramInfo="paramInfo" />
      <detail-comment-info ref="comment" :commentInfo="commentInfo" />
      <goods-list ref="recommend" :goods="recommends" />
    </scroll>
    <detail-bottom-bar @addCart="addToCart" />
  </div>
</template>

<script>
import DetailNavBar from "./childCopms/DetailNavBar";
import DetailSwiper from "./childCopms/DetailSwiper";
import DetailBaseInfo from "./childCopms/DetailBaseInfo";
import DetailShopInfo from "./childCopms/DetailShopInfo";
import DetailGoodsInfo from "./childCopms/DetailGoodsInfo";
import DetailParamInfo from "./childCopms/DetailParamInfo";
import DetailCommentInfo from "./childCopms/DetailCommentInfo";
import DetailBottomBar from "./childCopms/DetailBottomBar";

import GoodsList from "../../components/content/goods/GoodsList";

import Scroll from "components/common/scroll/Scroll";

import { getDetail, getRecommend, Goods, Shop, GoodsParam } from "network/detail";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      currentIndex: 0,
    };
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
      // 获取对应的offsetTop
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index] + 44, 300);
    },
    contentScroll(position) {
      // 1.获取y值
      const positionY = -position.y;

      // 2.和主题中的y对比
      let length = this.themeTopYs.length;
      // for (let i = 0; i < length; i++) {
      //   let iPos = this.themeTopYs[i];
      //   /**
      //    * 判断的方案:
      //    *  方案一:
      //    *    条件: (i < (length-1) && currentPos >= iPos && currentPos < this.themeTops[i+1]) || (i === (length-1) && currentPos >= iPos),
      //    *    优点: 不需要引入其他的内容, 通过逻辑解决
      //    *    缺点: 判断条件过长, 并且不容易理解
      //    *  方案二:
      //    *    条件: 给themeTops最后添加一个很大的值, 用于和最后一个主题的top进行比较.
      //    *    优点: 简洁明了, 便于理解
      //    *    缺点: 需要引入一个较大的int数字
      //    * 疑惑: 在第一个判断中, 为什么不能直接判断(currentPos >= iPos)即可?
      //    * 解答: 比如在某一个currentPos大于第0个时, 就会break, 不会判断后面的i了.
      //    */
      //   if (positionY >= iPos - 44 && positionY < this.themeTopYs[i + 1] - 44) {
      //     if (this.currentIndex !== i) {
      //       this.currentIndex = i;
      //     }
      //     break;
      //   }
      // }
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] - 44 &&
          positionY < this.themeTopYs[i + 1] - 44
        ) {
          this.currentIndex = i;
        }

        // if (
        //   this.currentIndex !== i &&
        //   ((i < length - 1 &&
        //     positionY >= this.themeTopYs[i] &&
        //     positionY < this.themeTopYs[i + 1]) ||
        //     (i === length - 1 && positionY >= this.themeTopYs[i]))
        // ) {
        //   this.currentIndex = i;
        //   console.log(this.currentIndex);
        //   this.$refs.nav.currentIndex = this.currentIndex;
        // }
      }
    },
    addToCart() {
      // 获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      // 使用vuex上定义的方法
      // this.$store.commit("addCart", product);
      // actions调用
      this.$store.dispatch("addCart", product);
    },
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid;

    // 2.根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      const data = res.result;
      // console.log(res);
      // 1.获取顶部轮播图数据
      this.topImages = data.itemInfo.topImages;

      // 2.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);

      // 3.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);

      // 4.保存商品的详情数据
      this.detailInfo = data.detailInfo;

      // 5.获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

      // 6.取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });

    // 3.请求推荐数据
    getRecommend().then((res) => {
      this.recommends = res.data.list;
    });

    // // 4.给GetThemeTopY赋值
    // this.getThemeTopY = debounce(() => {
    //   this.themeTopYs = [];
    //   this.themeTopYs.push(0);
    //   this.themeTopYs.push(this.$refs.param.$el.offsetTop);
    //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
    //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
    //   console.log(this.themeTopYs);
    // }, 500);
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,

    GoodsList,

    Scroll,
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 10;
  background-color: #fff;
  height: 100vh;
}
.detail-nav-bar {
  position: relative;
  background-color: #fff;
  z-index: 10;
}

.content {
  height: calc(100% - 44px - 58px);
  overflow: hidden;
}
</style>
