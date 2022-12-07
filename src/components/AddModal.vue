<template>
  <div class="overlay">
    <form class="todo-form">
      <input type="text" name="" class="todo-input" v-model="todoTitle" placeholder="Enter title">
      <input type="text" name="" class="todo-input" v-model="todoText" placeholder="Enter text">
      <select class="todo-select" v-model="todoCategory">
        <option class="todo-select__option" disabled value="">Select category:</option>
        <option class="todo-select__option">General</option>
        <option class="todo-select__option">Work</option>
        <option class="todo-select__option">Study</option>
      </select>
      <button class="todo-button" v-on:click="addItem">submit</button>
    </form>
  </div> 
</template>

<script>
export default {
  name: 'AddModal',
  props: ["toggle"],
  methods: {
    addItem: function(e) {
      e.preventDefault();
      let newItem = {
        "id": new Date().getTime(),
        "date": new Date(),
        "title": this.todoTitle,
        "text": this.todoText,
        "category": this.todoCategory,
        "completed": false
      }
      this.$store.commit("addItem", newItem);
      this.todoText = "";
      this.todoTitle ="";
      this.toggle();      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(51, 51, 51, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
  }


</style>
