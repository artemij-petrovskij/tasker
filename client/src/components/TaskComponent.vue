<template>
 <div class="post-container">
   <div class="post"
    v-for="(label, text) in tasks"
    v-bind:item="label"
    v-bind:text="text"
    v-bind:key="label._id"
   >
    <p>{{label.label}}</p>
    <p>{{label.text}}</p>
   </div>
 </div>
</template>

<script>
import getTasks from '../TaskService.js';
export default {
  name: "TaskComponent",
  data() {
    return {
      tasks: [],
      error: "",
      text: ""
    };
  },
  async created() {
    try{
      this.tasks = await getTasks()
      console.log(await getTasks())
    }catch(err){
      console.log(err)
    }
  }
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
