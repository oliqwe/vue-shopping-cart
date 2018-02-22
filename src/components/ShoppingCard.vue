<template>
  <div class="container">
    <div class="columns is-mobile ">
      <div class="column is-2"></div>
      <div class="column is-7 shopping-cart box">
        <nav class="level shopping-card-controls">
          <div class="level-left">
            <div class="level-item">
              <router-link class="button is-primary is-small" tag="a" to="/">Назад</router-link>
            </div>
          </div>
          <div class="level-left">
            <div class="level-item">
              <p>
                В корзине
                <strong> {{shoppingCart.length}} </strong> продуктов
              </p>
            </div>
          </div>
          <div class="level-right">
            <p class="level-item">
              <a class="button is-danger is-small" @click="removeAllProducts">Удалить все</a>
            </p>
          </div>
        </nav>
        <div class="level cart-product" v-for="(product, index) in shoppingCart" :key="index">
          <div class="level-left">
            <div class="level-item shopping-cart-quantity">
              <div class="field">
                <div class="control">
                  <input class="input" v-model.number="product.quantity" @change="changeQuantity(product.quantity, index)" type="number" name="quantity"
                    min="1" max="1000">
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
      <div class="column is-3 box shopping-cart-total">
        Общая Стоимость : ${{cartTotal}}
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";

  export default {
    computed: {
      ...mapGetters(["shoppingCart"]),
      cartTotal() {
        // calculate total shopping cart
        let total = "";

        if (this.shoppingCart.length > 0) {
          total = this.shoppingCart.map(product => {
            let quantity = 0;
            if (product.quantity !== "" && product.quantity !== null) {
              quantity = parseFloat(product.price) * parseFloat(product.quantity)
            }
            return quantity
          }).reduce((a, b) => a + b)

          total = total.toFixed(2)
        }
        return total
      }
    },
    mounted() {
      if (this.shoppingCart.length === 0 && localStorage.getItem("shoppingCart") !== null) {
        this.$store.commit('getProductFromLocalStorage', JSON.parse(window.localStorage.getItem("shoppingCart")))
      }
    },
    methods: {
      productPrice(product) {
         // calculate total for every product
        let productTotal = 0;

        if (product.quantity !== "" && product.quantity > 0) {
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

        if (quantity < 0 || quantity === "") {
          product.quantity = 1
        }
        this.$store.dispatch('changeProductQuantity', product)
      },
      removeAllProducts() {
        this.$store.dispatch('removeAllProductFromCart')
        // this.$router.push('/')
      }
    }
  }

</script>

<style lang="scss" scoped>
.column {
  margin: 15px;
}

.shopping-cart {
  min-height: 100px;
  .shopping-card-controls {
    border-bottom: 1px solid #efefef;
    margin-bottom: 10px;
    padding-bottom: 10px;
  }
  .cart-product {
    transition: all 0.7s ease;
    border-bottom: 1px solid #eee;
    &:last-child {
      border-bottom: none;
    }
    img {
      max-height: 40px;
    }
    .cart-product-name {
      line-height: 35px;
    }
  }
  .shopping-cart-image {
    border-right: 1px solid #eee;
    padding-right: 12px;
  }
  .shopping-cart-quantity,
    {
    border-right: 1px solid #eee;
    padding-right: 20px;
    .quantity-abbr {
      line-height: 36px;
      padding-left: 5px;
      margin-right: 5px;
    }
    input {
      width: 70px;
    }
  }
}

.shopping-cart-total {
  height: 60px;
}

</style>
