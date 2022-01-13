<template>
  <div class="text-white bg-gray-600 w-2/4 max-w-2xl m-auto mt-12">
    <div class="text-center border-b-2 border-black py-4">
      <h1 class="text-3xl py-4">Your Todos</h1>

      <p class="text-xl p-2" v-if="openTodos.length > 0">
        Open Todos: {{ openTodos.length }}
      </p>
      <p class="text-xl p-2" v-else>Congrats: No Todos!</p>
      <div class="flex space-around">
        <input
          type="text"
          v-model="formValue.title"
          class="py-2 px-2 text-black inline-block w-2/3"
          v-on:keyup="keymonitor"
        />
        <btn @addDelete:todo="addTodo" :buttonProperties="buttonProperties" />
      </div>
      <div>
        <p v-if="submitted" class="errorText">
          {{ "please fill the text field" }}
        </p>
        <p v-if="nameExist" class="errorText">
          {{ "Name is exist" }}
        </p>
      </div>
    </div>
    <div v-for="(todo, index) in todos" :key="index">
      <Todo
        :todoprop="todo"
        :todoindex="index"
        @refresh-todo-list="listTodos"
      />
      <!-- @toggledone-index="setDone" -->
    </div>
  </div>
</template>

<script>
import api from "./api";
import Todo from "./components/Todo";
import btn from "./utils/button.vue";

export default {
  name: "App",
  components: {
    Todo,
    btn,
  },
  data() {
    return {
      todos: [],
      formValue: { id: null, is_checked: false, title: "" },
      submitted: false,
      nameExist: false,
      buttonProperties: {
        title: "Add Todo",
        class: "w-1/3 border-black border-2 bg-yellow-500",
        style: "",
      },
    };
  },
  async mounted() {
    this.listTodos();
  },
  methods: {
    async listTodos() {
      this.todos = await api.loadTodos();
    },
    async addTodo() {
      if (!this.formValue.title) {
        this.submitted = true;
        return;
      } else {
        this.submitted = false;
        let nameExist = this.todos.find(
          (ele) => ele.title == this.formValue.title
        );
        if (!nameExist) {
          this.todos.push({ ...this.formValue });
          await api.addTodo(this.formValue);
          this.clearFormData();
        } else {
          this.nameExist = true;
        }
      }
    },
    clearFormData() {
      this.formValue.title = "";
    },
    setDone(index) {
      this.todos[index].is_checked = !this.todos[index].is_checked;
    },
    keymonitor: function (event) {
      if (event.target.value) {
        this.submitted = false;
        this.nameExist = false;
      } else {
        this.submitted = true;
        this.nameExist = false;
      }
    },
  },
  computed: {
    openTodos() {
      const openTodos = this.todos.filter((todo) => {
        return !todo.is_checked;
      });
      return openTodos;
    },
  },
};
</script>

<style scoped>
.errorText {
  color: #ef4444;
  text-align: left;
  margin-left: 10px;
}
</style>