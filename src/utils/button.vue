<template>
  <button :class="buttonProperties.class" @click.prevent="todoEventEmmit">
    {{ buttonProperties.title }}
  </button>
</template>
<script>
export default {
  name: "custom-button",
  props: {
    buttonProperties: Object,
  },
  data: () => ({}),
  methods: {
    todoEventEmmit() {
      this.$emit("addDelete:todo");
    },
  },
};
</script>
