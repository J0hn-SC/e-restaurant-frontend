<template>
  <div class="container">
    <main>
      <h1>Ordenes</h1>
      <div class="waiting-orders">
        <h2>Ordenes Listas</h2>
        <CompleteOrder v-for="(order, index) in state.ready" :key="index" :order="order" :index="index" 
        :order_change_state="order_ready_to_commited" :action="'Entregar'"/>
        <a href="#">Show all</a>
      </div>
      <div class="waiting-orders">
        <h2>Ordenes entregadas</h2>
        <CompleteOrder v-for="(order, index) in state.commited" :key="index" :order="order" :index="index" 
        :order_change_state="order_commited_to_finished" :action="'Entregado'"/>
        <a href="#">Show all</a>
      </div>
    </main>
    <!-- END RECENT orders-->
    <div class="right">
      <!-- END RECENT orders
      <div class="div-frequency">
        <h2>Frecuencia de ordenes</h2>
        <div class="frequency">
          <div class="frequency-item">
            <div class="progress-line">
              <p>Diego Rivera</p>
            </div>
            <p>20</p>
          </div>
          <div class="frequency-item">
            <div class="progress-line" :style="{'width':'75' +'%'}">
              <p>Paolo Marques</p>
            </div>
            <p>15</p>
          </div>
          <div class="frequency-item">
            <div class="progress-line" :style="{'width':'50' +'%'}">
              <p>Fredy Chavez</p>
            </div>
            <p>10</p>
          </div>
          <div class="frequency-item">
            <div class="progress-line" :style="{'width':'25' +'%'}">
              <p>Edmundo Martinez</p>
            </div>
            <p>5</p>
          </div>
        </div>
      </div>-->
      <!--  END DIV-FREQUENCY  
      <div class="div-personnel">
        <h2>Personal Disponible</h2>
        <div class="personnel">
          <div class="personnel-item">
            <img src="../assets/profile-1.jpg" alt="" class="profile-photo">
            <p>Edward Dominic</p>
          </div>
          <div class="personnel-item">
            <img src="../assets/profile-1.jpg" alt="" class="profile-photo">
            <p>Edward Dominic</p>
          </div>
          <div class="personnel-item">
            <img src="../assets/profile-1.jpg" alt="" class="profile-photo">
            <p>Edward Dominic</p>
          </div>
        </div>
      </div>-->
      <!--  END DIV-PERSONEEL -->
    </div>
  </div>
</template>

<script>
import {state, socket} from '@/socket'
import CompleteOrder from '../components/OrdersView/CompleteOrder.vue'
export default {
  name:'OrdersView',
  components: { CompleteOrder},
  data(){
    return{
      state
    }
  },
  computed:{
  },
  methods: {
    order_ready_to_commited(index){
      socket.emit('order-ready-to-commited', {id_order: state.ready[index].id_order, id_table: state.ready[index].id_table})
      state.commited.push(state.ready[index]);
      state.ready.splice(index, 1);
    },
    order_commited_to_finished(index){
      socket.emit('order-commited-to-finished', {id_order: state.commited[index].id_order, id_table: state.commited[index].id_table})
      //socket.emit('order-commited-to-finished', {id_order: state.commited[index].id_order})
      //state.finished.push(state.commited[index]);
      state.commited.splice(index, 1);
    },
  },
  mounted(){
    socket.emit('get-all-ready-order');
    socket.emit('get-all-commited-order');
    console.log("state.ready",state.ready)
  }
}
</script>

<style scoped>
* {
  /*RIGHT*/
  --color-light: #9094ce39;
  --border-radius-1: 0.4rem;
  --color-white: #fff;
  --color-primary:#7380ec;
}

.primary {
  color: var(--color-primary);
}
.warning {
  color: var(--color-warning);
}
.container {
  display: grid;
  grid-template-columns: auto 23rem;
  gap: 1.8rem;
  padding: 1rem;
}

/*main*/

main {
  margin-top: 1rem;
}

main .date{
  display: inline-block;
  background: var(--color-light);
  border-radius: var(--border-radius-1);
  margin-top: 1rem;
  padding: 0.5rem 1.6rem;
}

main .date input[type="date"] {
  background: transparent;
  color: var(--color-dark);
}






main .waiting-orders{
  margin-top: 2rem;
}

main .waiting-orders h2{
  margin-bottom: 0.8rem;
}

main .waiting-orders table{
  background: var(--color-white);
  border-radius: var(--card-border-radius);
  width: 100%;
  padding: var(--card-padding);
  box-shadow: var(--box-shadow);
  align-items: center;
  transition: all 300ms ease;
}

main .waiting-orders table:hover{
  box-shadow: none;
}

main table tbody td{
  height: 2.8rem;
  border-bottom: 1px solid var(--color-light);
  color: var(--color-dark-variant);
  text-align: center;
  padding: 0.1rem 0.5rem;
}

main table tbody tr:last-child td{
  border: none;
}

main table button{
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
}
main .waiting-orders a{
  text-align: center;
  margin: 1rem auto;
  color: var(--color-primary);
  display: block;
}

/* RIGHT TOP */
.right{
  margin-top: 1.4rem;
}

.profile-photo{
  width: 2.8rem;
  height: 2.8rem;
  border-radius: 50%;
  overflow: hidden;
}
/*END RIGHT TOP*/
.right .div-frequency{
  margin-top: 1rem;
}
.right .div-frequency h2{
  margin-bottom: 0.8rem;
}
.right .div-frequency .frequency{
  background: var(--color-white);
  padding: var(--card-padding);
  border-radius: var(--card-border-radius);
  box-shadow: var(--box-shadow);
  transition: all 300ms ease;
  /*justify-content: center;*/
}
.right .div-frequency .frequency .frequency-item{
  display: flex;
  gap: 0.4rem;
  padding: 0.2rem;
}
.right .div-frequency .frequency .frequency-item .progress-line{
  border-radius: 0.5rem;
  height: 1rem;
  background: red;
  color: white;
  display: flex;
  justify-content: center;
  width: 100%;
}
.right .div-personnel{
  margin-top: 1rem;
}
.right .div-personnel .personnel {
  margin-top: 0.5rem;
  background: var(--color-white);
  padding: var(--card-padding);
  border-radius: var(--card-border-radius);
  box-shadow: var(--box-shadow);
  transition: all 300ms ease;
  display: flex;
  gap: 1.5rem;
}
.right .div-personnel .personnel .personnel-item{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 3rem;
  gap: 0.4rem;
}
</style>