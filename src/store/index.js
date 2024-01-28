import { createStore } from 'vuex'

export default createStore({
  state: {
    basket: [],
    client_menu: {}
  },
  getters: {
  },
  mutations: {
    add_to_basket(state, item){
      state.basket = [...state.basket, {id_item: item.id_item, amount: 1}]
    },
    update_amount(state, {id_item, increment}){
      const  item = state.basket.find(item => item.id_item === id_item);
      if (item) {
        item.amount += increment;
      }
    },
    remove_from_basket(state, id){
      state.basket = state.basket.filter(item => item.id_item !== id);
    },
    clean_basket(state){
      state.basket = []
    }
  },
  actions: {
  },
  modules: {
  }
})
