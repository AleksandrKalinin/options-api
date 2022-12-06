<template>
  <div v-for="item in filteredAndSearchedAndSortedItems" v-bind:key="item.id" class="todo-item" v-bind:class="{'todo-item__completed': item.completed}">
    <h2 v-bind:class="{'todo-header__completed': item.completed}" class="todo-item__header">{{item.title}}</h2>
    <p v-bind:class="{'todo-text__completed': item.completed}" class="todo-item__text">{{item.text}}</p>
    <div class="todo-info">
      <div class="todo-buttons">
        <button class="todo-button" v-on:click="openEditModal(item.id)">Edit</button>
        <button class="todo-button" v-on:click="deleteItem(item.id)">Delete</button>
        <input type="checkbox" v-on:click="toggleItem(item.id)" v-bind:checked="item.completed" class="todo-checkbox">
      </div>
      <p class="todo-category">Category: {{item.category}}</p>      
    </div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
export default {
  name: 'TodoItem',
  props: {

  },
  computed: {
    ...mapGetters(["filteredAndSearchedAndSortedItems"])
  },
  methods: {
    toggleItem: function(id) {
      this.$store.commit('toggleItemState', id)
    },
    deleteItem: function(id) {
      this.$store.commit('deleteItem', id)
    }
  },
  onMounted() {
    console.log("mounted");
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .todo-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
