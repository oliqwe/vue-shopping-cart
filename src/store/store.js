import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
    count: 0,
    products: [{
            name: "Огурцы",
            image: 'cucumber.svg',
            price: "7.99",
            quantity: 1,
        }, {
            name: "баклажаны",
            image: "eggplant.svg",
            price: "4.99",
            quantity: 1,
        }, {
            name: "чеснок",
            image: "garlic.svg",
            price: "5.99",
            quantity: 1,
        }, {
            name: "лук",
            image: "onion.svg",
            price: "1.99",
            quantity: 1,
        }, {
            name: "перец",
            image: "pepper.svg",
            price: "12.99",
            quantity: 1
        }, {
            name: "редис",
            image: "radish.svg",
            price: "11.99",
            quantity: 1,
        }, {
            name: "салат",
            image: "salad.svg",
            price: "10.99",
            quantity: 1,
        }, {
            name: "помидоры",
            image: "tomato.svg",
            price: "2.99",
            quantity: 1,
        },
        // {
        //     name: "горох",
        //     image: "peas.svg",
        //     price: "6.99",
        //     quantity: 1
        // }
    ],
    shoppingCart: []
}
const mutations = {
    addProductToCart(state, product) {
        const obj = {...product }
        state.shoppingCart.unshift(obj)
    },
    removeProductFromCart(state, index) {
        state.shoppingCart.splice(index, 1)
    },
    getProductFromLocalStorage(state, products) {
        state.shoppingCart = products
    },
    changeProductQuantity(state, product) {
        state.shoppingCart[product.index].quantity = product.quantity
    },
    removeAllProductsFromCart(state) {
        state.shoppingCart = []
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
    },
    removeAllProductFromCart({ commit }) {
        localStorage.clear()
        commit('removeAllProductsFromCart')
    }
}
const getters = {
    productList: state => state.products,
    shoppingCart: state => state.shoppingCart,
    getSortedProducts: (state) => {
        return state.shoppingCart.sort((a, b) => b.date - a.date);
    }
}
export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})