<template>
<div class="container has-text-centered">
  <div class="columns is-vcentered is-multiline">
    <div class="column is-3" v-for="(product) in productList" :key="product.name">
      <div class="card product box">
        <div class="card-image">
          <figure class="image">
            <!-- <img :src='require("" + product.image + "")'> -->
            <img :src="require('./../assets/images/' + product.image + '')">
          </figure>
        </div>
        <div class="card-content">
          <div class="content">
            <p class="is-capitalized"> {{product.name}}</p>
          </div>
          <div class="media">
            <div class="media-content">
              <p class="product-price has-text-weight-bold">${{product.price}} / Кг</p>
            </div>
            <div class="media-right">
              <a class="button is-small" @click="addToBasket(product)">Добавить</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed:{
    ...mapGetters(["productList"])
  },
  mounted(){
  if (window.localStorage.getItem("shoppingCart") !== null) {
        const products = JSON.parse(window.localStorage.getItem("shoppingCart"))
        this.$store.commit('getProductFromLocalStorage', products)
    }
  },
  methods:{
    addToBasket(product){
        this.$store.dispatch('addProductToCart', product)
    }
  }
}
</script>
<style lang="scss" scoped>
.card {
  &:hover {
    box-shadow: 0 3px 9px rgba(0, 0, 0, .28);
  }
  .card-image {
    .image {
      img {
        max-height: 120px;
        padding: 15px;
        margin: auto;
      }
    }
  }
  .card-content {
    .content {
      margin-bottom: 10px;
    }
    .media {
      border-top: 1px solid #f0f0f0;
      padding-top: 10px;
      .button {
        background-color: #ffdb4d;
        border: none;
      }
    }
  }
}


</style>
