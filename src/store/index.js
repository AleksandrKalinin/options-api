import { createStore } from 'vuex'

export default createStore({
  state: {
    items: [],
    searchQuery: "",
    selectedFilter: "All",
    itemsLoaded: false,
    sortOrder: false,
    sortValue: "default",
    onlyPending: false,
    activePage: 1,
    itemsPerPage: 6
  },
  getters: {

    itemsPerPage: state => {
      return state.itemsPerPage;
    },

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
      if (state.onlyPending) {
        console.log("filtering");
        console.log([...state.items].filter(item => item.completed !== true))
        return [...state.items.filter(item => item.completed !== true)] 
      } else {
        return state.items;
      }
    },

    filteredItems(state, getters) {
      console.log(state.items);
      if (state.selectedFilter !== 'All') {
        return [...getters.items.filter(item => item.category === state.selectedFilter)]
      } else {
        return getters.items;
      }      
    },

    filteredAndSearchedItems(state, getters) {
      return [...getters.filteredItems.filter(item => item.title.toLowerCase().includes(state.searchQuery.toLowerCase()))]
    },

    filteredAndSearchedAndSortedItems(state, getters) {
      let val = state.sortValue;
      if (val === "default") {
        return [ ...getters.filteredAndSearchedItems ]
      }
      else if (state.sortOrder) {
        return [...getters.filteredAndSearchedItems.sort((a,b) => a[val].localeCompare(b[val])) ] 
      }
      else {
        return [...getters.filteredAndSearchedItems.sort((a,b) => b[val].localeCompare(a[val])) ] 
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

  },
  actions: {
  },
  modules: {
  }
})
