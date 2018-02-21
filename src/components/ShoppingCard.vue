<template>
<div class="container">
  <div class="columns is-mobile ">
    <div class="column is-2"></div>
    <div class="column is-7  shopping-cart box">
      <nav class="level shopping-card-controls">
        <!-- Left side -->
        <div class="level-left">
          <div class="level-item">
            <p>
              В корзине
              <strong> {{shoppingCart.length}} </strong> продуктов
            </p>
          </div>
        </div>
        <!-- Right side -->
        <div class="level-right">
          <p class="level-item">
            <a class="button is-danger is-small">Удалить все</a>
          </p>
        </div>
      </nav>
      <div class="level cart-product" v-for="(product, index) in getSortedProducts" :key="index">
        <!-- Left side -->
        <div class="level-left">
          <div class="level-item shopping-cart-quantity">
            <div class="field">
              <div class="control">
                <input class="input" v-model="product.quantity" @change="changeQuantity(product.quantity, index)" type="number" name="quantity"
                  min="1">
                <span class="quantity-abbr">/ Кг </span>
              </div>
            </div>
          </div>
          <div class="level-item shopping-cart-image">
            <p class="image is-48x48">
              <img :src="require('./../assets/images/' + product.image + '')">
            </p>
          </div>
          <div class="level-item">
            <p class="subtitle is-6 is-capitalized">
              <strong>{{product.name}}</strong>
            </p>
          </div>
        </div>
        <!-- Right side -->
        <div class="level-right">
          <p class="level-item">
            ${{productPrice(product)}}
          </p>
          <p class="level-item">
            <button class="delete" @click="removeProduct(index)"></button>
          </p>

        </div>
      </div>
    </div>
    <div class="column is-3 box">
      Общая Стоимость : {{cartTotal}}
    </div>
  </div>
</div>


</template>
<script>
  import { mapGetters } from "vuex";
  export default {
    computed: {
      ...mapGetters(["shoppingCart", "getSortedProducts"]),
      cartTotal() {
        let total = "";

        if (this.shoppingCart.length > 0) {
          total = this.shoppingCart.map(product => {
            let quantity = 0;
            if (product.quantity !== "") {
              quantity = parseFloat(product.price) * parseFloat(product.quantity)
            }
            return quantity
          }).reduce((a, b) => a + b)

          total = total.toFixed(2)
        }
        // console.log(total.toFixed(2))

        return total
      }
    },
    created(){
      console.log('im created')
    },
    mounted() {
      console.log(this.shoppingCart, "mounted")
      if (this.shoppingCart.length === 0 && localStorage.getItem("shoppingCart") !== null) {
        this.$store.commit('getProductFromLocalStorage', JSON.parse(window.localStorage.getItem("shoppingCart")))
      }
    },
    methods: {
      productPrice(product) {

        let productTotal = 0;

        if (product.quantity !== "") {
          productTotal = parseFloat(product.price) * parseFloat(product.quantity)
          productTotal = productTotal.toFixed(2)
        }
        return productTotal
      },
      removeProduct(index) {
        this.$store.dispatch('removeProductFromCart', index)
      },
      changeQuantity(quantity, index) {
        const product = {
          quantity: quantity,
          index: index
        }
        this.$store.dispatch('changeProductQuantity', product)
      }
    }
  }

</script>


<style lang="scss" scoped>
.column{
  margin:15px;
}
.shopping-cart{
    min-height: 200px;
    .shopping-card-controls{
      border-bottom: 1px solid #efefef;
      margin-bottom:10px;
      padding-bottom: 10px;
    }
    .cart-product{
      border-bottom: 1px solid #eee;
      &:last-child{
        border-bottom: none;
      }
      img{
        max-height: 40px;
      }
      .cart-product-name{
        line-height: 35px;
      }
    }
    .shopping-cart-image{
       border-right: 1px solid #eee;
       padding-right: 12px;
    }
    .shopping-cart-quantity,{
      border-right: 1px solid #eee;
      padding-right: 20px;
      .quantity-abbr{
        line-height: 36px;
        padding-left: 5px;
        margin-right:5px;
      }
      input{
        width: 70px;
      }
    }
}
</style>

