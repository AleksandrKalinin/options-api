<template>
  <input class="todo-input" />
</template>

<script>
export default {
  name: "custom-input",
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .todo-input{
    border: 1px solid tomato;
    outline: 1px solid tomato;
    border-radius: 0;
    padding: 5px 10px;
    margin: 5px;
    height: 34px;
  }
</style>
