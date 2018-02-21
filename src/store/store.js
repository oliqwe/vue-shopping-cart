import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
    count: 0,
    products: [{
        name: "Огурцы",
        image: 'cucumber.svg',
        price: "7.99",
        quantity: null,
    }, {
        name: "баклажаны",
        image: "eggplant.svg",
        price: "4.99",
        quantity: null,
    }, {
        name: "чеснок",
        image: "garlic.svg",
        price: "5.99",
        quantity: null,
    }, {
        name: "лук",
        image: "onion.svg",
        price: "1.99",
        quantity: null,
    },  {
        name: "перец",
        image: "pepper.svg",
        price: "12.99",
        quantity: null
    }, {
        name: "редис",
        image: "radish.svg",
        price: "11.99",
        quantity: null,
    }, {
        name: "салат",
        image: "salad.svg",
        price: "10.99",
        quantity: null,
    }, {
        name: "помидоры",
        image: "tomato.svg",
        price: "2.99",
        quantity: null,
    },
    // {
    //     name: "горох",
    //     image: "peas.svg",
    //     price: "6.99",
    //     quantity: null
    // }
],
    shoppingCart: []
}
const mutations = {
    addProductToCart(state, product) {
        product.quantity = 1
        const obj = {...product }
        console.log(obj)
        state.shoppingCart.unshift(obj)
    },
    removeProductFromCart(state, index) {
        state.shoppingCart.splice(index, 1)
    },
    getProductFromLocalStorage(state, products) {
        state.shoppingCart = products
    },
    changeProductQuantity(state, product) {
        console.log('here')
        state.shoppingCart[product.index].quantity = product.quantity
            // Vue.set(state.shoppingCart[product.index], "quantity", product.quantity)
    }
}
const actions = {
        addProductToCart: ({ commit }, product) => {
            if (localStorage.getItem("shoppingCart") !== null) {
                const cart = [...JSON.parse(localStorage.getItem("shoppingCart"))]
                cart.unshift(product)
                localStorage.setItem("shoppingCart", JSON.stringify(cart))
            } else {
                localStorage.setItem("shoppingCart", JSON.stringify(product))
            }
            commit('addProductToCart', product)
        },
        removeProductFromCart({ commit }, index) {
            const cart = [...JSON.parse(localStorage.getItem("shoppingCart"))]
            cart.splice(index, 1)
            localStorage.setItem("shoppingCart", JSON.stringify(cart))
            commit('removeProductFromCart', index)
        },
        changeProductQuantity({ commit }, product) {
            const cart = [...JSON.parse(localStorage.getItem("shoppingCart"))]
            cart[product.index].quantity = product.quantity;
            localStorage.setItem("shoppingCart", JSON.stringify(cart))
            commit('changeProductQuantity', product)
        }
    }
    // getters are functions
const getters = {
        productList: state => state.products,
        shoppingCart: state => state.shoppingCart,
        getSortedProducts: (state, getters) => {
            console.log(state, getters)
            return state.shoppingCart.sort((a, b) => b.date - a.date);
        }
    }
    // A Vuex instance is created by combining the state, mutations, actions,
    // and getters.
export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})