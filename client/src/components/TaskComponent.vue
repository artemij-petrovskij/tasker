<template>
  <div>
    <el-header style="font-size:40px;  ">TASKER</el-header>

    <el-main>
      <el-form style="max-width: 400px;position: relative;margin:0px auto;padding:20px;">
        <el-form-item label="Название">
          <el-input v-model="controls.label" name="label"></el-input>
        </el-form-item>
        <el-form-item label="Описание задачи">
          <el-input name="text" type="textarea" v-model="controls.text"></el-input>
        </el-form-item>
        <el-button type="primary" @click="checkForm" spellcheck="true" style="width: 100%;">Task!</el-button>
      </el-form>

      <div class="tasks">
        <div
          v-for="(post, index) in tasks"
          v-bind:item="post"
          v-bind:index="index"
          v-bind:key="post._id"
        >
          <el-card class="box-card">
            <h3>{{ post.label }}</h3>
            <p>{{ post.text }}</p>
            <span>
              {{new Date(post.date).getHours()}}:{{new Date(post.date).getMinutes()}}
              {{new Date(post.date).getDate() > 10 ? new Date(post.date).getDate():'0' + new Date(post.date).getDate()}}.{{new Date(post.date).getMonth() > 10 ? new Date(post.date).getMonth():'0' + (new Date(post.date).getMonth() + 1)}}.{{new Date(post.date).getFullYear() }}
            </span>
          </el-card>
        </div>
      </div>
    </el-main>
  </div>
</template>

<script>
import TaskService from "../TaskService.js";

export default {
  name: "TaskComponent",
  data() {
    return {
      tasks: [],
      error: "",
      text: "",
      controls: {
        login: "",
        password: ""
      }
    };
  },
  async created() {
    try {
      const response = await TaskService.getTasks();
      this.tasks = response.reverse();
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    eMessage(err) {
      this.$message(err);
    },
    async sendData(label, text) {
      let data = {
        label: label,
        text: text
      };
      await TaskService.insertTask(data);
      const response = await TaskService.getTasks();
      this.tasks = response.reverse();
    },
    checkForm: function(e) {
      if (!this.controls.label && !this.controls.text) {
        this.eMessage("Заполните форму");
        return;
      }

      if (!this.controls.label) {
        this.eMessage("Введите название задачи");
      }

      if (!this.controls.text) {
        this.eMessage("Введите описание задачи");
      }
      if (this.controls.label && this.controls.text) {
        this.sendData(this.controls.label, this.controls.text);
        this.success();
      }

      e.preventDefault();
    },
    success() {
      this.$notify({
        title: "Added",
        message: "Task:" + this.controls.label + " successful added",
        type: "success"
      });
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
  max-width: 400px;
  min-width: 300px;
}
.el-button-group {
            float: right;
        }
        i.el-icon-delete{
            pointer-events: none;
        }
</style>
