<template>
<div> <el-header>Header</el-header>
        <el-header style="font-size:40px;  ">TASKER</el-header>
<!--
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




  <el-header>Header</el-header>
        <el-header style="font-size:40px;  ">TASKER</el-header>
        <el-main>

            <el-form style="width: 500px;position: relative;margin:0px auto;">
            <el-form style="max-width: 400px;position: relative;margin:0px auto;padding:20px;">
                <el-form-item label="Название">
                    <el-input v-model="controls.label" name="label"></el-input>
                </el-form-item>
                <el-form-item label="Описание задачи">
                    <el-input v-model="controls.text" name="text"></el-input>
                    <el-input name="text" type="textarea" v-model="controls.text"></el-input>
                </el-form-item>
                <el-button type="primary" @click="checkForm">Task!</el-button>
                <el-button type="primary" @click="checkForm" spellcheck="true" style="width: 100%;">Task!</el-button>
            </el-form>
-->


 <div class="post-container">
   <div class="post"
    v-for="(post, index) in tasks"
    v-bind:item="post"
    v-bind:index="index"
    v-bind:key="post._id"
   >


      <el-card class="box-card">
    
                    {{ post.label }}
                    {{ post.text }}
       </el-card>
   </div>
 </div>




<!--
            <div v-for="value in res" class="text item">
              
            <div class="tasks">
                <div v-for="value in res" class="text item">
                    <el-card class="box-card">
                        <h3>{{ value.label }}</h3>
                        <p>{{ value.text }}</p>
                        <span>

                            {{new Date(value.date).getHours()}}:{{new Date(value.date).getMinutes()}}
                            {{new Date(value.date).getDate() > 10 ? new Date(value.date).getDate():'0' + new Date(value.date).getDate()}}.{{new Date(value.date).getMonth() > 10 ? new Date(value.date).getMonth():'0' + (new Date(value.date).getMonth() + 1)}}.{{new Date(value.date).getFullYear() }}
                        </span>
                    </el-card>
                </div>
            </div>




            <el-main>




-->


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

        .tasks {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
        }

        .box-card {
            margin: 5px;
            max-width: 500px;
            min-width: 500px;

        }
</style>
