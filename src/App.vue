<template>
    <template v-if="addModalOpen">
      <AddModal :toggle = "toggleAddModal"/>
    </template>
    <template v-if="editModalOpen">
      <div class="overlay">
        <form class="todo-form">
          <input type="text" name="" class="todo-input" v-model="todoTitle" placeholder="Enter title">
          <input type="text" name="" class="todo-input" v-model="todoText" placeholder="Enter text">
          <custom-button class="todo-button">submit</custom-button>
          <custom-button  v-on:click="editItem">submit</custom-button>
        </form>
      </div>        
    </template>
  <NavigationBar :toggle = "toggleAddModal"/>
  <div class="main-container">
    <SideBar />
    <TodoList />
  </div>
</template>

<script>
import TodoList from './components/TodoList.vue'
import SideBar from './components/SideBar.vue'
import NavigationBar from './components/NavigationBar.vue'
import AddModal from './components/AddModal.vue'
import {mapActions} from "vuex";
export default {
  name: 'App',
  data(){
    return {
      addModalOpen: false,
      editModalOpen: false
    }
  },
  methods: {
    ...mapActions(["fetchItems"]),
    addItem: function(e) {
      e.preventDefault();
      let newItem = {
        "id": 5,
        "date": new Date(),
        "title": this.todoTitle,
        "text": this.todoText
      }
      this.items.push(newItem);
      this.todoText = "";
      this.todoTitle ="";
      this.addModalOpen = false;
    },

    editItem: function() {
      this.todoText = "";
      this.todoTitle ="";      
      this.editModalOpen = true;
    },

    toggleAddModal: function() {
      this.addModalOpen = !this.addModalOpen;
    },

    openEditModal: function(id) {
      let el = this.items.map(item => item.id).indexOf(id);
      this.todoTitle = this.items[el].title; 
      this.todoText = this.items[el].text;       
      this.editModalOpen = true;
    }
  },
  mounted() {
    this.fetchItems();
  },
  components: {
    TodoList,
    NavigationBar,
    SideBar,
    AddModal
  }
}
</script>

<style>

.main-container {
  width: 100%;
  padding: 20px;
  display: flex;
}

body {
  margin: 0;
  padding: 0;
  position: relative;
}

* {
  box-sizing: border-box;
  font-family: "Open Sans", sans-serif;
}

.navbar {
  padding: 20px;
}

.todo-section {
  width: calc(100% - 270px);
  margin-left: 20px;
}

.todo-item {
  margin-bottom: 20px;
  border: 1px solid tomato;
  padding: 20px;
  transition: .1s all;
}

.todo-footer {
  display: flex;
  justify-content: space-between;
}

.todo-date {
  color: tomato;
  font-size: 13px;
  margin: 16px 0 0 0;
}

.todo-item__header {
  margin: 0 0 16px 0;
  font-size: 16px;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: .1s all;
}

.todo-item__text {
  font-size: 14px;
  color: #444;
  letter-spacing: 0.5;
  transition: .1s all;
}

.todo-item__completed {
  border: 1px solid #CCCCCC;
}

.todo-text__completed, .todo-header__completed {
  color: #CCCCCC;
  text-decoration: line-through;
}

.todo-buttons {
  display: flex;
  align-items: center;
}

.todo-form {
  display: flex;
  flex-direction: column;
  width: 400px;
  padding: 20px;
  background: white;
}

.todo-select {
  border: 1px solid tomato;
  outline: 1px solid tomato;
  border-radius: 0;
  padding: 5px 10px;
  margin: 5px;
  height: 34px;
}

.todo-select {
  cursor: pointer;
}

.todo-checkbox {
  border: 1px solid tomato;
  height: 30px;
  width: 30px;
  border-radius: none;
}

.todo-form .todo-button {
  align-self: flex-end;
}

</style>
