<template>
  <div class="sidebar">
    <div class="sidebar-item" v-on:click="filterItems('All')" v-bind:class="{'sidebar-item_active': this.$store.state.selectedFilter === 'All'}">
      <p class="sidebar-item__title">All</p>
    </div>    
    <div class="sidebar-item" v-for="(item, index) in categories" v-bind:key="index" v-on:click="filterItems(item)" v-bind:class="{'sidebar-item_active': this.$store.state.selectedFilter === item}">
      <p class="sidebar-item__title">{{item}}</p>
    </div>
    <p class="sidebar-counter">Всего {{filteredAndSearchedAndSortedItems.length}} заданий</p>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';  

export default {
  name: 'SideBar',
  props: {

  },
  data(){
    return {
      active: "All"
    }
  },
  computed: {
    ...mapGetters(["items", "filteredAndSearchedAndSortedItems"]), 
    categories() {
      let unique = [];
      for (var i = 0; i < this.items.length; i++) {
        if(!unique.includes(this.items[i].category)){
          unique.push(this.items[i].category);
        }
      }
      return unique;
    }
  },
  methods: {
    filterItems: function(val) {
      this.$store.commit('filterItems', val);
    }
  },
  mounted(){
    //console.log("mounted", this.items)
  },
  updated(){
    //console.log("updated", this.items)
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .sidebar {
    width: 300px;
    border: 1px solid tomato;
    padding: 20px 0;
  }

  .sidebar-item {
    padding: 10px 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    transition: .2s all;
  }

  .sidebar-item:hover, .sidebar-item_active {
    background: #E8E8E8;
  }

  .sidebar-counter {
    padding: 10px 15px;
    font-weight: 600;
  }

  .sidebar-item__title, .sidebar-item__checkbox {
    margin: 0;
  }

  .sidebar-item__checkbox {
    height: 20px;
    width: 20px;
    border: 1px solid tomato;
    margin-left: 10px;
  }
</style>
