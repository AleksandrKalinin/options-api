<template>
  <button class="todo-button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "custom-button",
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .todo-button {
    font-size: 12px;
    border: 1px solid tomato;
    color: tomato;
    background: transparent;
    padding: 8px 15px;
    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: .2s;
    margin: 0 5px;
  }

  .todo-button:hover{
    color: white;
    background: tomato;  
  }
</style>
