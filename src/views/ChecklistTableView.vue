<template>
<div class="container">
  <div class="checklist">
    <h2>Ordenes de la mesa {{$route.params.id}}</h2>
    <div class="list">
        <table>
            <thead>
            <tr>
                <th>ID orden</th>
                <th>Mesa</th>
                <th>Hora orden</th>
                <th>Estado</th>
                <th>Pago</th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="(order,key,index) in summary_table[id_table]" :key="index">
                    <td>{{order.id_order}}</td>
                    <td>{{order.id_table}}</td>
                    <td>{{order.time}}</td>
                    <td class="warning">{{getState(order.state)}}</td>
                    <td v-if="order.state<4" class="danger">No pagado</td>
                    <td v-else class="primary">Pagado</td>
                </tr>
            </tbody>
        </table>
    </div>
  </div>
</div>
</template>

<script>
import { socket, summary_table } from '@/socket'

export default {
  name: 'Checklist',
  props: {
  },
  components: {
  },
  data(){
    return {
      orders: [],
      summary_table,
      id_table : parseInt(this.$route.params.id)
    }
  },
  methods:{
    getState(id_state){
      switch(id_state){
        case 0:
          return "En espera";
        case 1:
          return "Preparando";
        case 2:
          return "Listo";
        case 3:
          return "Entregado"
        case 4:
          return "Finalizado" 
      }
    },
    getPayment(id_state){
      if(id_state < 4){
        return "No pagado"
      }else{
        return "Pagado"
      }
    }
  },
  mounted(){
    console.log(summary_table)
    socket.emit("get-summary-table", this.id_table)
    console.log(summary_table)
  }
}
</script>

<style scoped>
.container{
  width: 70%;
  margin: 0 auto;
  padding: 20px;
}
.checklist{
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.checklist table{
  background: var(--color-white);
  border-radius: var(--card-border-radius);
  width: 100%;
  padding: var(--card-padding);
  box-shadow: var(--box-shadow);
  align-items: center;
  transition: all 300ms ease;
}

.checklist table tbody td{
    height: 2.8rem;
    border-bottom: 1px solid var(--color-light);
    text-align: center;
}

main table tbody tr:last-child td{
  border: none;
}

</style>
