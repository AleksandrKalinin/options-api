export const paginationModule =  {
  state: () => ({
    currentPage: 1,
    itemsPerPage: 6
  }),

  getters: {
    itemsPerPage: state => {
      return state.itemsPerPage;
    },

    currentPage: state => {
      return state.currentPage;
    },

  },

  mutations: {
    selectPage(state, value) {
      state.currentPage = value;
    },

    selectPagesRender(state, value) {
      state.itemsPerPage = value;
    }
  },
   namespaced: true	
}