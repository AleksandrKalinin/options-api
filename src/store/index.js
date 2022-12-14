import { createStore } from 'vuex'
import { paginationModule } from '@/store/paginationModule';

export default createStore({
  state: {
    items: [],
    searchQuery: "",
    selectedFilter: "All",
    itemsLoaded: false,
    sortOrder: false,
    sortValue: "default",
    onlyPending: false
  },

  getters: {

    itemsLoaded: state => {
      return state.itemsLoaded;
    },

    sortValue: state => {
      return state.sortValue;
    },

    onlyPending: state => {
      return state.onlyPending;
    },

    items: state => {
        return state.items;
    },

    filteredItems(state, getters) {
      if (state.selectedFilter !== 'All') {
        return [...getters.items.filter(item => item.category === state.selectedFilter)]
      } else {
        return getters.items;
      }      
    },

    filteredAndSearchedItems(state, getters) {
      return [...getters.filteredItems.filter(item => item.title.toLowerCase().includes(state.searchQuery.toLowerCase()))]
    },

    pendingItems(state, getters) {
      if (state.onlyPending) {
        return [...getters.filteredAndSearchedItems.filter(item => item.completed !== true)] 
      } else {
        return getters.filteredAndSearchedItems;
      }      
    },    

    filteredAndSearchedAndSortedItems(state, getters) {
      let val = state.sortValue;
      if (val === "default") {
        return [ ...getters.pendingItems ]
      }
      else if (state.sortOrder) {
        return [...getters.pendingItems.sort((a,b) => a[val].localeCompare(b[val])) ] 
      }
      else {
        return [...getters.pendingItems.sort((a,b) => b[val].localeCompare(a[val])) ] 
      }      
    }

  },

  mutations: {
    updateItems(state, items) {
      state.items = items;
    },

    itemsFetched(state) {
      state.itemsLoaded = true;
    },

    updateSortOrder(state) {
      state.sortOrder = !state.sortOrder;
    },

    updateSortValue(state, value) {
      state.sortValue = value;
    },

    filterItems(state, value) {
      state.selectedFilter = value;
    },

    searchItems(state, value) {
      state.searchQuery = value;
    },

    selectPending(state) {
      state.onlyPending = !state.onlyPending;
    },

    toggleItemState(state, id) {
      let index = state.items.map(item => item.id).indexOf(id);
      state.items[index].completed = !state.items[index].completed;      
    },

    deleteItem(state, id) {
      let index = state.items.map(item => item.id).indexOf(id);
      state.items.splice(index, 1);      
    },

    addItem(state, value) {
      state.items.push(value);
    }  

  },
  actions: {
    async fetchItems({commit}) {
      try {
        await fetch('./todos.json')
          .then(response => response.json())
          .then(data => {
            commit('updateItems', data);
          })
          .then(() => commit('itemsFetched'))        
      } catch (e) {
          console.log(e)
      } finally {
          commit('itemsFetched');
      }
    }
  },
  modules: {
    pagination: paginationModule
  }
})
