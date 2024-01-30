<template>
<div class="container">
  <h1>Lista de Mesas</h1>
  <div class="checklist">
    <h2>Seleccione la mesa en la que se encuentra para revisar el estado de su orden</h2>
    <div class="list">
      <router-link :to="getRouteTable(id_table)" v-for="(id_table, index) in Object.keys(summary_table)" class="table" :key="index">
        {{id_table}}
      </router-link>
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
  methods: {
    getRouteTable(id_table){
      return "checklist/" + id_table;
    }
  },
  mounted(){
    console.log(summary_table)
    socket.emit("get-summary-all-table")
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
.checklist .list{
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  gap: 1rem;
}
.checklist .list .table{
  background: blue;
  color: white;
  font-size: 22px;
  border-radius: 1rem;
  padding: 1rem 1rem;
}


</style>
