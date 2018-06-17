<template>
  <div id="app">
    <main-view/>
  </div>
</template>
<script>
import MainView from "./views/MainView.vue";
export default {
  components: {
    MainView
  }
};
</script>

<style src="../node_modules/vue-mdc-adapter/dist/layout-app/layout-app.min.css"></style>
<style src="../node_modules/vue-mdc-adapter/dist/toolbar/toolbar.min.css"></style>
<style src="../node_modules/vue-mdc-adapter/dist/card/card.min.css"></style>
<style src="../node_modules/vue-mdc-adapter/dist/typography/typography.min.css"></style>
<style src="../node_modules/vue-mdc-adapter/dist/select/select.min.css"></style>
<style src="../node_modules/vue-mdc-adapter/dist/layout-grid/layout-grid.min.css"></style>
<style lang="scss">
body {
  max-width: 50%;
  margin: auto;
}

.mdc-toolbar {
  background-color: black;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
