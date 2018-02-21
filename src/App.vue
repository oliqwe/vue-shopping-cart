<template>
<div id="app">
  <section >
    <app-nav></app-nav>
   
    <div class="products-container">
      <div class="container">
            <router-view />
      </div>
    </div>
  </section>
</div>

</template>

<script>
import Nav from "./components/Nav"

export default {
  name: 'App',
  components:{
    appNav:Nav,
  }
}
</script>

<style  lang="scss">
html {
  height: 100%;
  body {
    height: 100%;
    #app {
      background-color: #f8f8f8;
      height: 100%;
      .products-container {
        padding-top: 30px;
      }
    }
  }
}



</style>
