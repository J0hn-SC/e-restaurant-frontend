<template>
    <button id="btn-receipt" class="btn-receipt" @click="openModal()">
        <i class="material-symbols-sharp btn-receipt">receipt_long</i>
        <p v-if="basket.length > 0" class="badge">{{basket.length}}</p>
    </button>
    <div class="modal-overlay" :class="{active :showModal}">
        <div class="modal empty" ref="scrollableDiv" v-if="basket.length === 0">
            <h2>Su orden esta vacía, por favor seleccione algunos platos o bebidas</h2>
            <img class="image" src="../../assets/example_add.png" alt="add" width="5rem">
            <div class="options">
                <button @click="closeModal()">Retroceder</button>
                <!-- <button id="order-button" @click="makeOrder()">Ordenar</button>-->
            </div>
        </div>
        <div class="modal" ref="scrollableDiv" v-else>
            <h2>Seleccione la cantidad de porciones que desea</h2>
            <ItemReceipt v-for="(item) in basket" :key="item.id_item" :item="getItem(item.id_item)" :amount="item.amount" />
            <div class="total-price">
                <p></p>
                <p>Suma Total: </p>
                <p :style="{color: 'red', fontWeight: 'bold'}">S/. {{sumTotal}}</p>
                <p></p>
            </div>
            <div class="table">
                <label for="id_table">Ingrese el número de mesa: </label>
                <div class="div-input">
                    <input class="input" type="number" min="0" v-model="id_table" name="id_table" @input="validateTable">
                    <p v-if="(id_table || id_table === 0) && id_table < 1 || id_table > 19" >Ingrese el número de mesa correcto</p>
                </div>
            </div>
            
            <div class="options">
                <button @click="closeModal()">Retroceder</button>
                <button id="order-button" @click="makeOrder()">Ordenar</button>
            </div>
        </div>
    </div>
</template>

<script>
import { client_menu, socket } from '@/socket'
import { mapState , mapMutations} from 'vuex'
import ItemReceipt from './ItemReceipt.vue'
export default {
  components: { ItemReceipt },
    name: "ModalReceipt",
    props: {
        orderBasket: {type: Function, required: true},
        setTable : {type: Function, required: true}
    },
    data(){
        return{
            client_menu,
            showModal: false,
            menu_items: [],
            id_table: null,
        }
    },
    computed: {
        ...mapState(['basket']),
        sumTotal(){
            return this.basket.reduce((total, basketItem) => {
            // Busca el objeto correspondiente en items usando el id
            const item = this.client_menu.items[basketItem.id_item]

            // Multiplica precio por cantidadTotal y suma al total acumulado
            return total + (item ? item.price * basketItem.amount : 0);
            }, 0);
        }
    },
    methods: {
        ...mapMutations(['add_to_basket', 'remove_from_basket', 'update_amount', 'clean_basket']),
        isInBasket(id_item){
            return this.basket.some(item => item.id_item === id_item);
        },
        getItem(id_item){
            return client_menu.items[id_item] || {name: "No encontrado"};
        },
        openModal(){
            this.showModal = true;
        },
        closeModal(){
            this.showModal = false;
        },
        validateTable(){
            if(this.id_table > 0){

            }
        },
        makeOrder(){
            if(this.id_table > 0 && this.id_table < 20){
                this.showModal = false;
                this.setTable(this.id_table)
                this.orderBasket();
            }else{
                this.id_table = 0
            }
        },
        initializeScrollbar(){
            const scrollableDiv = this.$refs.scrollableDiv;
            scrollableDiv.addEventListener('scroll', this.handleScroll);
        }
    },
    mounted(){
        this.initializeScrollbar()
    },
}
</script>

<style scoped>
.btn-receipt{
    position: sticky;
    top: 5rem;
    left: 80%;
    width: 5rem; /*4rem for phones*/
    height: 5rem;
    font-size: 3rem;
    color: white;
    background: blue;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
}
.badge{
    position: absolute;
    top: 0;
    right: 0;
    background-color: red;
    color: #fff;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    font-size: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
  z-index: 9999;
}

.modal-overlay.active {
  opacity: 1;
  visibility: visible;
}

.modal {
    width: 45rem;
    height: 30rem;
    border-radius: 1rem;
    position: absolute;
    top: 25%;
    left: 25%;
    background-color: #fff;
    padding: 20px;
    opacity: 0;
    /*visibility: hidden;*/
    transition: transform 1s;
    /*transform: translateY(-100%);*/
    color: black;
    overflow-y: auto;
    overflow-x: hidden;
    
}

.modal .empty{
    display: flex;
    flex-direction: column;
    align-items: center;
}

.modal .active{
    transition: translateY(0%);
}

.modal-overlay.active .modal {
  opacity: 1;
  visibility: visible;
}

.modal .image{
    width: 15rem;
    height: 12rem;
}

.options{
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
}

.modal .total-price{
    display: grid;
    grid-template-columns: 30% 35% 20% 15%;
    font-size: 18px;
}

.table {
    display: flex;
    gap: 1rem;
    color: black;
}

.table .input{
    border: 1px solid black;
}

.table p{
    font-size: 10px;
}


.items{
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;
}
.modal .table{
  width: 100%;
  align-items: center;
  margin: 1rem 0;
}
.modal .table label{
    font-size: 15px;
}
.modal .table input[type="number"]{
    padding: 5px;
    border-radius: .5rem;
    border: 1px solid rgb(188, 188, 188);
}
.modal button{
  text-align: center;
  margin: 1rem auto;
  color: white;
  display: block;
  border-radius: 0.4rem;
}

@media screen and (max-width: 700px){
    .btn-receipt{
        top: 80%;
        left: 75%;
    }
    .modal{
        width: 100%;
        height: 80%;
        top: 10%;
        left: 0%;
    }
}
</style>
