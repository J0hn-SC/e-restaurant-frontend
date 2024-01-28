<template>
    <div class="container">
      <Presentation/>
      <div class="orders">
        <div class="instructions">
          <p class="title">Ordene lo que desee</p>
          <p>Seleccione los platos y bebidas que desee ordenar</p>
          <p>Luego presione el boton </p>
        </div>

        <ModalReceipt :_items = client_menu.items
        :orderBasket="this.orderBasket" :setTable="this.setTable"/>

        <div class="menu">
          <ItemIndex v-for="(item, key, index) in client_menu.items" :key="index" 
          :item="item" :index="index" 
          :addItem="addItem" :cancelItem="cancelItem"/>
        </div>

        <div class="answer" v-if="show_answer_message">
          <p>{{answer_message}}</p>
        </div>
        <div class="check-orders" v-if="hasOrders">
          <p>Puedes revisar el estado de tu ordenes aquí</p>
          <router-link :to="checklistRoute" class="btn">
            <p>Revisar mis órdenes</p>
          </router-link>
        </div>
      </div>
    </div>
    
</template>

<script>

import Presentation from '@/components/IndexView/Presentation.vue'
import ModalReceipt from '@/components/IndexView/ModalReceipt.vue'
import ItemIndex from '@/components/IndexView/ItemIndex.vue'
import { socket, client_menu } from '@/socket'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'HomeView',
  components: {
    Presentation,
    ModalReceipt,
    ItemIndex

  },
  data(){
    return {
      client_menu,
      id_table : 0,
      show_answer_message: false,
      answer_message: null,
      hasOrders: false,
    }
  },
  methods:{
    ...mapMutations(['clean_basket']),
    orderBasket(){
      const today = new Date();
      let time = today.toLocaleTimeString();
      const order = {
          time,
          id_table: this.id_table,
          items: [...this.basket],
          amount: this.sumTotal
      };
      socket.emit("handle-order", order);
      this.showModal = false;
      setTimeout(() => {
          if(client_menu.answer_order.state > 0){
            if(client_menu.answer_order.state === 1){
                this.answer_message = "Pedido aceptado";
                socket.emit("get-ready-menu");
                this.clean_basket()
            }
            if(client_menu.answer_order.state === 2){
                this.answer_message = "Pedido rechazado";
            }
            this.show_answer_message = true;
            setTimeout(()=>{
                this.show_answer_message=false;
                this.hasOrders = true;
                client_menu.answer_order.state = 0;
            }, 3000)
          }
      }, 2000);
  },
  setTable(id_table){
    //this.order.id_table = id_table;
    this.id_table = id_table;
  }
},
  computed: {
    ...mapState(['basket']),
    checklistRoute(){
      return "checklist/" + this.id_table
    },
    //
    //items(){
    //  console.log("modificadno item")
    //  return state.client_menu.items;
    //},
    //length_ordered_items(){
      //return this.order.items.length;
    //},
    //answer_order(){
      //return state.answer_order;
    //}

  },
  mounted(){
    socket.emit("get-ready-menu");
  }
}
</script>

<style scoped>
.container{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: rgb(236,33,19);
    background: linear-gradient(90deg, rgba(236,33,19,1) 0%, rgba(242,112,53,1) 40%, rgba(255,218,0,1) 100%);
    color: white;
  }
  
.orders{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.instructions{
  margin: 1rem 2rem;
  font-family: "Annie Use Your Telescope", cursive;
  font-weight: bold;
  text-align: left;
  font-size: 2rem;
  color: rgb(255, 255, 255);
  background-color: transparent;
  text-shadow: rgb(0, 0, 0) -4px 4px 3px;
}
.instructions .title{
  font-size: 3rem;
}

.menu{
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
}

.answer{
    position: fixed;
    top: 90%;
    left: 50%;
    transform: translateX(-50%);
    width: 25rem;
    height: 3rem;
    background: blue;
    color: white;
    border-radius: 1rem;
    border: none;
    color: black;
    font-size: 1.5rem;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .answer p{
    color: white;
  }
  .check-orders{
    position: fixed;
    top: 90%;
    left: 50%;
    transform: translateX(-50%);
    width: 35rem;
    height: 3.5rem;
    background: blue;
    color: rgb(255, 255, 255);
    border-radius: 1rem;
    border: none;
    color: black;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }
  .check-orders p{
    color: white;
  }
  .check-orders .btn{
    background: rgb(97, 225, 97);
    color: white;
    border-radius: 1rem;
    font-size: 16px;
    padding: 0.5rem 0.8rem;
  }
  .check-orders .btn p{

  }
/*Este e sun ejemplo de como se deben realizar las media queries*/
/*=====MEDIA QUERIES ===========*/
@media screen and (max-width: 700px){
  .container{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    background: rgb(236,33,19);
    background: linear-gradient(90deg, rgba(236,33,19,1) 0%, rgba(242,112,53,1) 40%, rgba(255,218,0,1) 100%);
    color: white;
  }
  

  .instructions{
    margin: 1rem 2rem;
    font-family: "Annie Use Your Telescope", cursive;
    font-weight: bold;
    text-align: left;
    font-size: 25px;
    color: rgb(255, 255, 255);
    background-color: transparent;
    text-shadow: rgb(0, 0, 0) -4px 4px 3px;
  }
  .menu{
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0;
}
}
</style>
  