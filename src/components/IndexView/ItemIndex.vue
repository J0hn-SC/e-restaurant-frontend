<template>
    <div class="dish">
        <img :src="item.image" alt="imagen">
        <div class="details">
            <p>{{item.name}}: {{item.description}}</p>
            <p>S/. {{item.price}}</p>
            <button class="dish-btn-order" v-if="!isInBasket(item.id_item)" @click="add_to_basket(item)">Añadir al carrito</button>
            <div class="dish-btn-ordered" v-else>
                <button class="circle-btn">
                    <i v-if="getAmount === 1" class="material-symbols-sharp" @click="remove_from_basket(item.id_item)">delete</i>
                    <span v-else @click="update_amount({id_item: item.id_item, increment: -1})">-</span>
                </button>
                <span>{{getAmount}}</span>
                <button class="circle-btn" @click="update_amount({id_item: item.id_item, increment: 1})">+</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
    name: "ItemIndex",
    props:{
        item : { type: Object, required: true},
        index:{type: Number, required: true},
        addItem: {type: Function, required: true},
        cancelItem: {type: Function, required: true}
    },
    data(){
        return {
            
        }
    },
    methods:{
        ...mapMutations(['add_to_basket', 'remove_from_basket', 'update_amount']),
        changeAddItem(item, index){
            this.addItem(item, index);
        },
        changeCancelItem(item, index){
            this.cancelItem(item, index);
        },
        isInBasket(id_item){
            return this.basket.some(item => item.id_item === id_item);
        },
        getItemAmount(id_item){
            const item = this.basket.find(item => item.id_item === id_item);
            return item? item.amount : 0;
        }
    },
    computed:{
        ...mapState(['basket']),
        getAmount(){
            return this.getItemAmount(this.item.id_item)
        },
    }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Suranna&display=swap');
.dish{
    width: 24rem;
    height: 30rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    background: white;
    color: black;
    margin: 0.8rem 0;
    align-content: center;
    border-radius: 2rem;
    font-family: 'Suranna', serif;
    font-size: 1.2rem;
    line-height: 1;
}
.dish img{
    width: 20rem;
    height: 15rem;
    border-radius: 1rem;
    margin-bottom: 1rem;
}
.dish .details{
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    justify-items: center;
    align-items: center;
    height: 4rem;
    font-weight: bold;
    padding: 0 0;
}
.dish .details .dish-btn-order{
    background: rgb(97, 225, 97);
    color: white;
    width: 10rem;
}
.dish .details .dish-btn-order:hover{
    background: rgb(69, 225, 69);
    color: white;
}

.dish .details .dish-btn-ordered{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
}

.dish .details .circle-btn{
    background: rgb(53, 53, 247);
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
    font-size: 1.8rem;
}
.dish .details .circle-btn:hover{
    background: rgb(107, 107, 246);
}


.dish .details .cancel{
    background: rgb(243, 67, 67);
}
.dish .details .cancel:hover{
    background: rgb(236, 23, 23);
}

/*--------------------------------------------------------------------------------------*/
@media screen and (max-width: 700px){
.dish{
    width: 100%;
    height: 20rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0;
    background: white;
    color: black;
    margin: 0.8rem 0;
    align-content: center;
    border-radius: 0rem;
    font-family: 'Suranna', serif;
    font-size: 1.2rem;
    line-height: 1;
}
.dish img{
    width: 100%;
    height: 15rem;
    border-radius: 0;
    margin-bottom: 0.5rem;
}
.dish .details{
    display: grid;
    grid-template-columns: auto 4rem 6rem;
    justify-items: center;
    align-items: center;
    height: 4rem;
    font-size: 1rem;
    font-weight: bold;
    padding: 0 0.2rem;
}
.dish .details .dish-btn-order{
    background: rgb(97, 225, 97);
    color: white;
}
.dish .details .dish-btn-order:hover{
    background: rgb(69, 225, 69);
    color: white;
}


.dish .details .cancel{
    background: rgb(243, 67, 67);
}
.dish .details .cancel:hover{
    background: rgb(236, 23, 23);
}
}
</style>