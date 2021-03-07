<template>
  <div id="app">
    <task-component></task-component>
  </div>
</template>

<script>
import TaskComponent from "./components/TaskComponent.vue";

export default {
  name: "App",
  components: {
    TaskComponent,
  },
};
</script>

<style>
body {
  background: rgb(252, 92, 125);
  background: linear-gradient(
    90deg,
    rgba(252, 92, 125, 1) 0%,
    rgba(106, 130, 251, 1) 100%
  );
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
