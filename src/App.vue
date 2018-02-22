<template>
  <div id="app">
    <app-nav></app-nav>
    <div class="products-container">
      <transition name="component-fade" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
import Nav from "./components/Nav"

export default {
  name: 'App',
  components: {
    appNav: Nav,
  }
}
</script>

