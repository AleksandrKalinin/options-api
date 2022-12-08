<template>
  <section class="todo-section">
    <template v-if="itemsLoaded && filteredAndSearchedAndSortedItems.length !== 0" >
      <TodoItem v-bind:items = "filteredAndSearchedAndSortedItems"/>
    </template>
    <template v-else-if="itemsLoaded && filteredAndSearchedAndSortedItems.length === 0">
      <div class="empty-placeholder">
        Sorry, no items for display        
      </div>
    </template>
    <template v-else>
      Loading
    </template>         
    <div class="pagination">
      <template v-if="itemsLoaded" >
        <span class="pagination-item" v-for="item in pages" v-on:click="selectPage(item.val)" v-bind:key="item.val" v-bind:class="{'pagination-item_active': item.val === currentPage}">{{item.val}}</span>
      </template>
      <template v-else>
        Loading
      </template>        
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
                   "itemsLoaded"]),
    ...mapGetters("pagination", ["itemsPerPage",
                   "currentPage"]),    
  },
  methods: {
    selectPage: function(value){
      this.$store.commit("pagination/selectPage", value)
    },
    renderPagination: function() {
      let arr = [];
      let number = this.filteredAndSearchedAndSortedItems.length / this.itemsPerPage;
      for (var i = 0; i < number; i++) {
        let obj = {
          "val": i + 1
        }
        arr.push(obj)
      } 
      this.pages = arr;      
    }
  }, 
  watch: {
   filteredAndSearchedAndSortedItems: {
      deep: true,
      handler: function() {
        this.renderPagination()
      }
    },
   itemsPerPage: {
      deep: true,
      handler: function() {
        this.renderPagination()
      }
    }      
  },
  mounted(){

  },
  updated(){

  } 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .empty-placeholder {
    width: 100;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: centerf;
  }

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
    transition: .1s all;
    cursor: pointer;
  }

  .pagination-item:hover, .pagination-item_active {
    background: tomato;
    color: #ffffff;
  }

</style>
