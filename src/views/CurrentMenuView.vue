<template>
    <div class="container">
        <main>
            <h1>Menu</h1>
            <div class="menu">
              <div v-if="active" class="current-menu">
                <h2>Menu en curso</h2>
                <div class="menu-item" >
                    <div class="image">
                        <img src="https://png.pngtree.com/background/20210709/original/pngtree-restaurant-menu-design-stock-image-picture-image_554719.jpg" alt="">
                    </div>
                    <div class="description">
                        <p><strong>{{state.menu.name}}</strong></p>
                        <p>{{state.menu.description}}</p>
                    </div>
                    <div class="amount">
                        <p><strong>Cantidad de platos</strong></p>
                        <p>{{state.menu.n_items}}</p>
                    </div>
                    <div class="activation">
                        <button :class="{'disabled': state.menu.enabled || state.menu.amount === 0 }">Editar</button>
                        <button :class="{'disabled': !state.menu.enabled}">Eliminar</button>
                    </div>
                </div>
              </div>
              <h3 v-else>No hay un menú en curso</h3>
              <ModalMenus :selectMenu="setMenu"/>
            </div>
            <div class="items">
              <h2>Seleccione la cantidad de porciones que hay</h2>
              <div v-for="(item, key, index) in state.menu.items" :key="index" class="item" :class="getClassColor(item)">
                <div class="image">
                  <img :src="item.image" alt="">
                </div>
                <div class="data">
                  <div class="description">
                    <p><strong>{{item.name}}</strong></p>
                    <p>{{item.description}}</p>
                  </div>
                  <div class="amount">
                    <button @click="decreaseAmount(item.id_item, index)" :disabled="item.enabled" :class="{'disabled': item.enabled}">-</button>
                    <p>{{item.amount}}</p>
                    <button @click="increaseAmount(item.id_item, index)" :disabled="item.enabled" class="increase-button" :class="{'disabled': item.enabled}">+</button>
                  </div>
                  <div class="activation">
                    <button :class="{'disabled': !item.enabled}" @click="disableItem(item.id_item, index)">Deshabilitar</button>
                    <button class="enable-button" :class="{'disabled': item.enabled || item.amount === 0 }" @click="enableItem(item.id_item, index)">Habilitar</button>
                  </div>
                </div>
              </div>
            </div>
            
        </main>
        <div class="right">

        </div>
    </div>
</template>

<script>
import { socket, state } from '@/socket'
import ModalMenus from '../components/MenuView/ModalSlider.vue'
export default {
  name: 'MenuView',
  components: {
    ModalMenus
  },
  data(){
    return {
        state,
        menu_items: []
    }
  },
  methods:{
    setMenu(menu){
      socket.emit("set-menu",menu);
    },
    increaseAmount(id_item , index){
      state.menu.items[id_item].amount ++;
    },
    decreaseAmount(id_item, index){
      if(state.menu.items[id_item].amount > 0)
        state.menu.items[id_item].amount --;
    },
    enableItem(id_item, index){
      state.menu.items[id_item].enabled = true;
      socket.emit("enable-item", state.menu.items[id_item]);
      //aumentar el seteo del amount del menu
    },
    disableItem(id_item, index){
      state.menu.items[id_item].enabled = false;
      socket.emit("disable-item", state.menu.items[id_item]);
      //aumentar el seteo del amount del menu
    },
  },
  computed: {
    active(){
      //return state.menu.items.some((ele) => ele.enabled === true);
      return state.menu.active;
    },
    getClassColor(){
      return function(item){
        return {
        'green': item.enabled && item.amount > 0,
        'orange': !item.enabled && item.amount > 0,
        'red': !item.enabled && item.amount === 0 ,
        }
      };
    }
  },
  mounted(){
    socket.emit("get-complete-menu");
  }
}
</script>
<style scoped>
.container {
  display: grid;
  grid-template-columns: auto 23rem;
  gap: 1.8rem;
  padding: 1rem;
}

main {
  margin-top: 1rem;
}
main .menu{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
}

.menu .current-menu .menu-data{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  border-radius: 2rem;
  padding: 1.5rem;
} 

.items{
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;
}

.items .green{
  background: green;
}
.items .orange{
  background: orange;
}

.items .red{
  background: red;
}

.item{
  display: grid;
  grid-template-columns: 4fr 6fr;
  background: rgb(191, 246, 191);
  width: 45rem;
  height: 14rem;
  padding: 1rem;
  border-radius: 1rem;
}



.item .image{
  width: 16rem;
  height: 11rem;
  margin: 1rem 1.5rem;
}
.item .image img{
  width: 15rem;
  height: 10rem;
  border-radius: 1rem;
}

.item .data{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: white;
}
.item .description{
  color: white;
  word-wrap: break-word;
}

.item .data .amount{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
}

.item .activation{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem
}

.item .disabled{
  opacity: 0.5;
}

.container button{
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(92, 111, 237);
  padding: 0.5rem 1rem;
  margin: 1rem auto;
  color: white;
  font-weight: bold;
  border-radius: 0.4rem;
}

/* ---- Menu Item ----- */

.menu-item{
  display: grid;
  grid-template-columns: 1fr 3fr 1fr 1fr;
  grid-column-gap: 1rem;
  background: rgb(45, 141, 45);
  width: 45rem;
  height: 10rem;
  padding: 1rem;
  border-radius: 1rem;
}



.menu-item .image{
  display: flex;
  align-items: center;
  /*width: 12rem;
  height: 7rem;*/
}


.menu-item .image img{
  width: 12rem;
  height: 7rem;
  
  border-radius: 1rem;
}

.menu-item .data{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: white;
}

.menu-item .description{
  color: white;
  word-wrap: break-word;
  display: flex;
  flex-direction: column;
  justify-content: center
}

.menu-item .amount{
    color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1.5rem;
}

.menu-item .activation{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.menu-item .disabled{
  opacity: 0.5;
}



</style>