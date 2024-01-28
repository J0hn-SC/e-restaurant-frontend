<template>
    <div class="item">
        <div class="image">
            <img :src="item.image" alt="imagen">
        </div>
        <div class="data">
            <p>{{item.name}}</p>
            <div class="amount">
                <button id="increase-btn" @click="update_amount({id_item: item.id_item, increment: -1})">
                    <i v-if="getAmount === 1" class="material-symbols-sharp" @click="remove_from_basket(item.id_item)">delete</i>
                    <span v-else @click="update_amount({id_item: item.id_item, increment: -1})">-</span>
                </button>
                <p>{{getAmount}}</p>
                <button id="decrease-btn" @click="update_amount({id_item: item.id_item, increment: 1})">+</button>
            </div>
        </div>
        <div class="price">
            <p>S/. {{item.price}}</p>
            <p :style="{color: 'red' }">S/. {{getAmount * item.price}}</p>
        </div>
        <div class="close">
            <button class="btn-icon" @click="remove_from_basket(item.id_item)">
                <i class="material-symbols-sharp">delete</i>
            </button>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
    name: "ItemReceipt",
    props:{
        item : { type: Object, required: true}
    },
    computed:{
        ...mapState(['basket']),
        getAmount(){
            return this.getItemAmount(this.item.id_item)
        }
    },
    methods:{
        ...mapMutations(['add_to_basket', 'remove_from_basket', 'update_amount']),
        getItemAmount(id_item){
            const item = this.basket.find(item => item.id_item === id_item);
            return item? item.amount : 0;
        }
    },
    

}
</script>

<style scoped>
.item{
    display: grid;
    grid-template-columns: 30% 35% 20% 15%;
    margin-top: 1rem;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    font-size: 16px;
    color: black;
}

.item .image{

}

.item .image img{
    border-radius: 0.5rem;
}

.item .data{
    display: flex;
    flex-direction: column;
    justify-content: right;
    align-items: center;
    gap: 1rem;
}

.item .data .amount{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
}

.item .data .amount button{
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
}

.item .price{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
}

.item .close{

}
</style>