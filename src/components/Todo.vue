<template>
  <div
    class="flex justify-between items-center py-4 px-2 border-t-2 border-black"
    :class="{
      'bg-green-600': todo.is_checked,
      'bg-red-500': !todo.is_checked,
    }"
  >
    <p
      class="cursor-pointer"
      @click="toggleTodo"
      :class="{
        'text-decoration: line-through': todo.is_checked,
        'bg-red-500': !todo.is_checked,
      }"
    >
      <input
        type="checkbox"
        v-model="todo.is_checked"
        class="mr-1"
        @change="onCheckUncheck($event)"
      />
      {{ todo.title }}
    </p>
    <btn @addDelete:todo="deleteTodo" :buttonProperties="buttonProperties" />
  </div>
</template>

<script>
import api from "../api";
import btn from "../utils/button.vue";

export default {
  name: "Todo",
  props: ["todoprop", "todoindex"],
  components: {
    btn
  },
  data() {
    return {
      todo: this.todoprop,
      lineThrough: false,
      buttonProperties: {
        title: "Delete",
        class: "py-2 px-4 bg-black rounded",
        style: "",
      },
    };
  },
  methods: {
    toggleTodo() {
      this.$emit("toggledone-index", this.todoindex);
    },
    onCheckUncheck(event) {
      event.target.checked
        ? (this.lineThrough = true)
        : (this.lineThrough = false);
      this.updateTodo(this.todoindex);
    },
    async updateTodo() {
      let formData = {};
      formData.is_checked = this.lineThrough;
      await api.editTodo(this.todoindex, formData);
    },
    async deleteTodo() {
      await api.deleteTodo(this.todoindex);
      this.$emit("refresh-todo-list");
    },
  },
};
</script>