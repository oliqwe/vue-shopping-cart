import Vue from 'vue'
import Router from 'vue-router'
import ProductList from './../components/ProductList.vue'
import ShoppingCart from './../components/ShoppingCard.vue'
Vue.use(Router)
export default new Router({
    mode: "history",
    routes: [{
        path: '/',
        name: 'products',
        component: ProductList
    }, {
        path: '/cart',
        name: 'cart',
        component: ShoppingCart
    }, {
        path: "*",
        redirect: "/"
    }]
})