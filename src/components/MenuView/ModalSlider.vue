<template>
    <button :disabled="active" @click="openModal()" class="btn-modal" id="open-modal-menus">
        Seleccionar un Menu
    </button>
    <div v-if="showModal" class="modal">
        <div class="slider-container">
        <div class="card-slider">
            <div class="card">

                <div class="menus">
                    <h2>Menus disponibles</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Nombre del menu</th>
                                <th>Descripción</th>
                                <th>Cantidad de platos</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(menu, index) in menus" :key="index">
                                <td>{{ menu.name }}</td>
                                <td>{{ menu.description }}</td>
                                <td>{{ menu.n_items }}</td>
                                <td class="primary">
                                    <button class="select-menu" @click="close(menu)">
                                        Seleccionar
                                    </button>
                                </td>
                            </tr>                        
                        </tbody>
                    </table>
                    <div class="options">
                        <button @click="closeModal()">Cancelar</button>    
                    </div>             
                </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import { state } from '@/socket'
export default {
    data(){
        return{
            state,
            showModal: false,
            //menus: [],
            menu_items: [],
        }
    },
    props: {
        selectMenu: {type: Function, required: true}
        //menu_items: {type: Array, required: true}
    },
    computed: {
        menus(){
            return state.menus;
        },
        active(){
            return state.menu.active;
        }
    },
    methods: {
        openModal(){
            this.showModal = true;
            console.log("Show modal")
            //socket.emit("get-menus");
        },
        closeModal(){
            //this.selectMenu()
            this.showModal = false;
        },
        close(menu){
            this.selectMenu(menu);
            this.showModal = false;
        },
        get_menus(){
            fetch("http://127.0.0.1:5000/api/get_menus")
            .then((res)=>(
                res.ok? res.json() : Promise.reject(res)
            )) //forma abrevidad de lo de arriba
            .then((res_json)=>{
                state.menus = res_json
            })
            .catch((err) =>{
                console.log("No se recibio los menus")
            })
        }
    },
    mounted(){
        //socket.emit("get-menus");
        this.get_menus()
        console.log(this.active)
    }
}
</script>

<style scoped>
.modal{
    /*display: none;*/
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.4);
}
.slider-container{
    width: 50rem;
    height: 40rem;
    margin: 10rem auto;
    overflow: hidden;
}
.card-slider{
    display: flex;
    transition: transform 0.3s ease-in-out;
}
.card{
    flex: 0 0 50rem;
    border-radius: 1rem;
    background: white;
    padding: 1.5rem;
}
.options{
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
}


.menus{
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;
    overflow-y: auto;
    height: 500px;
}
.menus table{
  width: 100%;
  padding: var(--card-padding);
  align-items: center;
  border-spacing: 0 1rem;
}

.menus table:hover{
  box-shadow: none;
}

.menus table tbody tr{
    background: white;
}

.menus table tbody td{
  height: 4rem;
  border-bottom: 1px solid var(--color-light);
  text-align: center;
}

.menus button{
  text-align: center;
  margin: 1rem auto;
  color: white;
  display: block;
  border-radius: 0.4rem;
}
</style>
