<template>
  <header class="navbar">
    <input type="text" name="" v-model="searchValue" class="todo-input" v-on:input="searchItems">
    <button class="todo-button" v-on:click="open()">Add item</button>
    <div class="sorting-order">
      <a class="sorting-order__link" id="default" v-on:click="sortItems" v-bind:class="{'sorting-link_active': activeLink === 'default'}">by default</a>        
      <a class="sorting-order__link" id="title" v-on:click="sortItems" v-bind:class="{'sorting-link_active': activeLink === 'title'}">by title</a>
      <a class="sorting-order__link" id="category" v-on:click="sortItems" v-bind:class="{'sorting-link_active': activeLink === 'category'}">by category</a>
      <a class="sorting-order__link" id="date" v-on:click="sortItems" v-bind:class="{'sorting-link_active': activeLink === 'date'}">by date</a>
    </div>
  </header>
</template>

<script>
export default {
  name: 'NavigationBar',
  props: ["open"],
  data(){
    return {
      activeLink: this.$store.state.sortValue,
      searchValue: ""
    }
  },
  methods: {
    sortItems: function(e){
      this.$store.commit('updateSortOrder');
      switch(e.target.id){
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .sorting-order {
    padding: 15px 0;
  }
  .sorting-order__link {
    cursor: pointer;
    margin: 0 10px;
  }
  .sorting-link_active {
    color: tomato;
  }
</style>
