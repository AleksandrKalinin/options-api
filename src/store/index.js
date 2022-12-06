import { createStore } from 'vuex'

export default createStore({
  state: {
    items: [],
    searchQuery: "",
    selectedFilter: "All",
    itemsLoaded: false,
    sortOrder: false,
    sortValue: "default"
  },
  getters: {
    itemsLoaded: state => {
      return state.itemsLoaded;
    },

    items: state => {
      return state.items;
    },

    filteredItems(state) {
      if (state.selectedFilter !== 'All') {
        return [...state.items].filter(item => item.category === state.selectedFilter)
      } else {
        return state.items;
      }      
    },

    filteredAndSearchedItems(state, getters) {
      return [...getters.filteredItems.filter(item => item.title.toLowerCase().includes(state.searchQuery.toLowerCase()))]
    },

    filteredAndSearchedAndSortedItems(state, getters) {
      //let arr = [...getters.filteredAndSearchedItems];
      //console.log(arr());
      //console.log(getters.filteredItems);
      if (state.sortValue === "default") {
        return [ ...getters.filteredAndSearchedItems ]
      }
      else if (state.sortOrder) {
        return [...getters.filteredAndSearchedItems.sort((a,b) => a.title.localeCompare(b.title)) ] 
      }
      else {
        return [...getters.filteredAndSearchedItems.sort((a,b) => b.title.localeCompare(a.title)) ] 
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
    }
  },
  actions: {
  },
  modules: {
  }
})
