<template>
  <header class="navbar">
    <custom-input type="text" name="" v-model="searchValue" v-on:input="searchItems" />
    <custom-button v-on:click="toggle()">Add item</custom-button>
    <div class="navbar-navigation">
      <div class="sorting-order">
        <a class="sorting-order__link" id="default" v-on:click="sortItems" v-bind:class="{'sorting-link_active': sortValue === 'default'}">by default</a>        
        <a class="sorting-order__link" id="title" v-on:click="sortItems" v-bind:class="{'sorting-link_active': sortValue === 'title'}">by title</a>
        <a class="sorting-order__link" id="category" v-on:click="sortItems" v-bind:class="{'sorting-link_active': sortValue === 'category'}">by category</a>
        <a class="sorting-order__link" id="date" v-on:click="sortItems" v-bind:class="{'sorting-link_active': sortValue === 'date'}">by date</a>
        <p class="sort-order__pending"><input class="pending-checkbox" type="checkbox" name="" v-on:click="selectPending"> Show only pending </p>
      </div>
      <div class="navbar-pagination">
        <span class="navbar-pagination__text">Показывать по: </span>
        <select class="pagination-select" v-model="itemsPerPage" >
          <option class="pagination-select__option">6</option>
          <option class="pagination-select__option">12</option>
          <option class="pagination-select__option">18</option>
        </select>
      </div>      
    </div>
  </header>
</template>

<script>
import {mapGetters} from "vuex";
export default {
  name: 'NavigationBar',
  props: ["toggle"],
  components: {
 
  },
  data(){
    return {
      searchValue: ""
    }
  },
  computed: {
    ...mapGetters(["sortValue"]),
    itemsPerPage: {
      get() { return this.$store.state.pagination.itemsPerPage },
      set(value) { this.$store.commit('pagination/selectPagesRender', value) }
    }
  },
  methods: {
    sortItems: function(e){
      this.$store.commit('updateSortOrder');
      switch(e.target.id){
        case "default": {
          this.$store.commit('updateSortValue', "default");
          break;
        }         
        case "date": {
          this.$store.commit('updateSortValue', "date");
          break;
        } 
        case "title": {
          this.$store.commit('updateSortValue', "title");
          break;
        } 
        case "category": {
          this.$store.commit('updateSortValue', "category");
          break;
        }
      }
    },
    searchItems: function() {
      this.$store.commit('searchItems', this.searchValue);
    },
    selectPending: function() {
      this.$store.commit('selectPending');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .navbar-navigation {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .sorting-order {
    padding: 15px 0;
    display: flex;
  }

  .sort-order__pending {
    margin: 0 0 0 30px;
    display: flex;
    align-items: center;
  } 

  .sorting-order__link {
    cursor: pointer;
    margin: 0 10px;
  }

  .sorting-link_active {
    color: tomato;
  }

  .pending-checkbox {
    height: 20px;
    width: 20px;
    border: 1px solid tomato;
    border-radius: 0;
    margin: 0 10px 0 0;
  }

  .navbar-pagination__text {
    margin-right: 8px;
  }
</style>
