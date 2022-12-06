<template>
  <section class="todo-section">
    <template v-if="itemsLoaded" >
      <TodoItem v-bind:items = "filteredAndSearchedAndSortedItems"/>
    </template>
    <template v-else>
      Loading
    </template>    
    <TodoItem />
    <div class="pagination">
      <span class="pagination-item" v-for="item in pages" v-bind:key="item.val" v-bind:class="{'pagination-item_active': item.active}">{{item.val}}</span>
    </div>    
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
  data(){
    return {
      pages: []
    }
  },
  computed: {
    ...mapGetters(["filteredAndSearchedAndSortedItems",
                   "itemsLoaded",
                   "itemPerPage"])
  },
  methods: {
    createPagination() {
      let arr = [];
      let number = this.filteredAndSearchedAndSortedItems.length / this.itemsPerPage;
      for (var i = 0; i < number; i++) {
        let obj = {
          val: i + 1,
          active: i === 0 ? true : false
        }
        arr.push(obj)
      } 
      console.log(arr);
      this.pages = arr;
    }
  }, 
  mounted(){
    let arr = [];
    let number = this.filteredAndSearchedAndSortedItems.length / this.itemsPerPage;
    for (var i = 0; i < number; i++) {
      let obj = {
        val: i + 1,
        active: i === 0 ? true : false
      }
      arr.push(obj)
    } 
    console.log(arr);
    this.pages = arr;
  } 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .pagination-item {
    width: 30px;
    height: 30px;
    border: 1px solid tomato;
    color: tomato;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
    transition: .2s all;
    cursor: pointer;
  }

  .pagination-item:hover, .pagination-item_active {
    background: tomato;
    color: #ffffff;
  }
</style>
