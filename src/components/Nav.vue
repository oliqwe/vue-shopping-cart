<template>
<div class="container">
  <nav class="level is-mobile top-nav">
    <div class="level-left"></div>
    <div class="level-right">
      <div class="level-item basket">        
        <!-- <img src="./../assets/images/basket_long.svg" alt=""> -->
        <img src="./../assets/images/basket.svg" alt="">
      </div>
      <div class="level-item">
        <div>
          <router-link tag="a" to="cart" class="title is-size-4 badge" :data-badge="shoppingCart.length"> Корзина</router-link>
        </div>
      </div>
    </div>
  </nav>
</div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed:{
    ...mapGetters(["shoppingCart"])
  },
}
</script>
<style lang="scss" scoped>
.top-nav {
  padding-top: 20px;
  .basket {
    margin-right: 5px;
    img {
      position: relative;
      top: -3px;
      width: 35px;
    }
  }
  .badge {
    position: relative;
    &:after {
      content: attr(data-badge);
      position: absolute;
      top: -7px;
      right: -18px;
      font-size: 11px;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
      font-weight: 600;
      text-align: center;
      line-height: 23px;
      background: #ff4081;
      color: white;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      /* box-shadow: 1px 2px 5px #888; */
    }
  }
}


</style>
