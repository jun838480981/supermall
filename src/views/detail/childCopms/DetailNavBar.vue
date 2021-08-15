<template>
  <div class="detail-nav-bar">
    <nav-bar>
      <template #left>
        <div class="back" @click="backClick"></div>
      </template>
      <template v-slot:center>
        <div class="title">
          <div
            v-for="(item, index) in titles"
            :key="index"
            class="title-item"
            :class="{ active: currentIndex === index }"
            @click="titleClick(index)"
          >
            <span>{{ item }}</span>
          </div>
        </div>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",
  props: {
    currentIndex: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
    };
  },
  methods: {
    titleClick(index) {
      this.$emit("titleClick", index);
    },
    backClick() {
      this.$router.back();
    },
  },
  components: {
    NavBar,
  },
};
</script>

<style scoped>
.title {
  display: flex;
  font-size: 13px;
}
.title-item {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
/* .active span { */
/* border-bottom: 3px solid var(--color-tint); */
/* } */
.back {
  height: 100%;
  background: url("~assets/img/common/back.svg") no-repeat 20px 12px;
}
</style>
