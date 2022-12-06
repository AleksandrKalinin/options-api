<template>
    <template v-if="addModalOpen">
      <div class="overlay">
        <form class="todo-form">
          <input type="text" name="" class="todo-input" v-model="todoTitle" placeholder="Enter title">
          <input type="text" name="" class="todo-input" v-model="todoText" placeholder="Enter text">
          <button class="todo-button" v-on:click="addItem">submit</button>
        </form>
      </div>      
    </template>
    <template v-if="editModalOpen">
      <div class="overlay">
        <form class="todo-form">
          <input type="text" name="" class="todo-input" v-model="todoTitle" placeholder="Enter title">
          <input type="text" name="" class="todo-input" v-model="todoText" placeholder="Enter text">
          <button class="todo-button" v-on:click="editItem">submit</button>
        </form>
      </div>        
    </template>
  <NavigationBar :open = "openAddModal"/>
  <div class="main-container">
    <SideBar />
    <TodoList />
  </div>
</template>

<script>
import TodoList from './components/TodoList.vue'
import SideBar from './components/SideBar.vue'
import NavigationBar from './components/NavigationBar.vue'

export default {
  name: 'App',
  data(){
    return {
      addModalOpen: false,
      editModalOpen: false
    }
  },
  methods: {
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

    deleteItem: function(id) {
      let el = this.items.map(item => item.id).indexOf(id);
      this.items.splice(el,1);
    },

    openAddModal: function() {
      this.addModalOpen = true;
    },

    openEditModal: function(id) {
      let el = this.items.map(item => item.id).indexOf(id);
      this.todoTitle = this.items[el].title; 
      this.todoText = this.items[el].text;       
      this.editModalOpen = true;
    },

    toggleItem: function(id) {
      let el = this.items.map(item => item.id).indexOf(id);
      this.items[el].completed = !this.items[el].completed;
    },
  },
  mounted() {
    fetch('./todos.json')
      .then(response => response.json())
      .then(data => {
        this.$store.commit('updateItems', data);
      })
      .then(() => this.$store.commit('itemsFetched'))
  },
  components: {
    TodoList,
    NavigationBar,
    SideBar
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

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(51, 51, 51, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}

.navbar {
  padding: 20px;
}

.todo-section {
  width: calc(100% - 320px);
  margin-left: 20px;
}

.todo-item {
  margin-bottom: 20px;
  border: 1px solid tomato;
  padding: 20px;
  transition: .1s all;
}

.todo-item__completed {
  border: 1px solid #CCCCCC;
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

.todo-text__completed, .todo-header__completed {
  color: #CCCCCC;
  text-decoration: line-through;
}

.todo-buttons {
  display: flex;
  align-items: center;
}

.todo-button {
  font-size: 12px;
  border: 1px solid tomato;
  color: tomato;
  background: transparent;
  padding: 8px 15px;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: .2s;
  margin: 0 5px;
}

.todo-button:hover{
  color: white;
  background: tomato;  
}

.todo-form {
  display: flex;
  flex-direction: column;
  width: 400px;
  padding: 20px;
  background: white;
}

.todo-input {
  border: 1px solid tomato;
  padding: 5px 10px;
  margin: 5px;
  height: 34px;
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
