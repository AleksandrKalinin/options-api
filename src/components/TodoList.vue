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
    ...mapGetters(["filteredAndSearchedAndSortedItems",
                   "itemsLoaded"])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
