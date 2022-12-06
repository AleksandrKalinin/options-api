<template>
  <section class="todo-section">
    <template v-if="itemsLoaded" >
      <TodoItem v-bind:items = "filteredAndSearchedAndSortedItems"/>
    </template>
    <template v-else>
      Loading
    </template>    
    <TodoItem />
  </section>
</template>

<script>
import TodoItem from './TodoItem.vue'
import {mapGetters} from 'vuex';
export default {
  name: 'TodoList',
  components: {
    TodoItem
  },  
  methods: {

  },
  computed: {
    ...mapGetters(["items", 
                   "filteredItems", 
                   "filteredAndSearchedItems", 
                   "filteredAndSearchedAndSortedItems",
                   "itemsLoaded"])
  },
  updated() {
    console.log("items", this.items);
    console.log("filteredItems", this.filteredItems);
    console.log("filteredAndSearchedItems", this.filteredAndSearchedItems);
    console.log("filteredAndSearchedAndSortedItems", this.filteredAndSearchedAndSortedItems);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
