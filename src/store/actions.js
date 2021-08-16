import { ADD_COUNTER, ADD_TO_CART } from "./mutations-types";

export default {
  // 上下文context中包含state, commit这里可以使用对象结构{state, commit}
  addCart(context, payload) {
    // find查找并返回符合的值
    let oldProduct = context.state.cartList.find(
      val => val.iid === payload.iid
    );
    if (oldProduct) {
      // oldProduct.count += 1;
      context.commit(ADD_COUNTER, oldProduct);
    } else {
      payload.count = 1;
      context.commit(ADD_TO_CART, payload);
      // state.cartList.push(payload);
    }
  }
};
