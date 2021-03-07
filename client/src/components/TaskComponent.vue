<template>
  <div class="tasker">
    <el-header style="font-size: 40px">TASKER</el-header>

    <el-main>
      <el-form
        style="
          max-width: 400px;
          position: relative;
          margin: 0px auto;
          padding: 20px;
        "
      >
        <el-form-item label="Название">
          <el-input v-model="controls.label" name="label"></el-input>
        </el-form-item>
        <el-form-item label="Описание задачи">
          <el-input
            name="text"
            type="textarea"
            v-model="controls.text"
          ></el-input>
        </el-form-item>
        <el-button
          type="primary"
          @click="checkForm"
          spellcheck="true"
          style="width: 100%"
          >Task!</el-button
        >
      </el-form>

      <el-tabs type="border-card" @tab-click="handleClick">
        <el-tab-pane label="Карточки">
          <div class="tasks">
            <div
              v-for="(post, index) in tasks"
              v-bind:item="post"
              v-bind:index="index"
              v-bind:key="post._id"
            >
              <el-card class="box-card">
                <el-row>
                  <el-col :span="18">
                    <div class="grid-content bg-purple">
                      <h3>{{ post.label }}</h3>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content bg-purple-light">
                      <el-button-group>
                        <el-button
                          size="small"
                          type="danger"
                          icon="el-icon-delete"
                          @click="deleteTask(post._id)"
                          v-bind:value="post._id"
                        ></el-button>
                      </el-button-group>
                    </div>
                  </el-col>
                </el-row>

                <p>{{ post.text }}</p>
                <span>
                  {{ post.date }}
                </span>
              </el-card>
            </div>
          </div></el-tab-pane
        >
        <el-tab-pane label="Список">
          <el-table :data="tasks" style="width: 100%">
            <el-table-column prop="label" label="Название"> </el-table-column>
            <el-table-column prop="text" label="Описание"> </el-table-column>
            <el-table-column prop="date" label="Дата"> </el-table-column>
            <el-table-column label="">
              <template slot-scope="scope">
                <el-button
                  @click="deleteTask(scope.row._id)"
                  type="danger"
                  size="small"
                  >Delete</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
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
        password: "",
      },
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
    async createTask(label, text) {
      let data = {
        label: label,
        text: text,
      };
      await TaskService.insertTask(data);
      const response = await TaskService.getTasks();
      this.tasks = response.reverse();
    },
    async deleteTask(e) {
      let data = {
        id: e,
      };
      await TaskService.deleteTask(data);
      const response = await TaskService.getTasks();
      this.tasks = response.reverse();
    },
    checkForm: function (e) {
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
        this.createTask(this.controls.label, this.controls.text);
        this.clearForm();
        this.success();
      }

      e.preventDefault();
    },
    clearForm() {
      this.controls.label = "";
      this.controls.text = "";
    },
    success() {
      this.$notify({
        title: "Added",
        message: "Task:" + this.controls.label + " successful added",
        type: "success",
      });
    },
    eMessage(err) {
      this.$message(err);
    },
  },
};
</script>

<style>
.el-header {
  font-weight: bold;
  color: #fff;
}
.el-form {
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 5px;
}
.el-form-item {
  font-weight: bold;
}
.tasks {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.el-table {
  border-radius: 5px;
}
h3 {
  margin-top: 0px;
}
.el-tabs {
  margin-top: 20px;
  border-radius: 5px;
}
.el-tabs__item {
  color: #000;
}
.el-tabs__item.is-active {
  color: #fff;
}
.box-card {
  margin: 5px;
  max-width: 400px;
  min-width: 300px;
}
.el-button-group {
  float: right;
}
i.el-icon-delete {
  pointer-events: none !important;
}
</style>
