import { reactive } from "vue";
import {io} from "socket.io-client";

export const client_menu = reactive({
    items: {},
    table: 0,
    answer_order: {state : 0},
    count_selected : 0,
  });


export const state = reactive({
    menu: {},
    menus: [],
})

const URL =  "http://127.0.0.1:5000/";

export const socket = io(URL
/*
,{
    withCredentials:true,
    allowedHeaders:{
    "Access-Control-Allow-Origin": "*"
    }
}
*/
);

socket.on("get-complete-menu", (new_menu) => {
    console.log("menu actualizado",new_menu);
    state.menu = new_menu;
    console.log("get-complete-menu", state.menu)
    //state.menu.active = true
  });


socket.on("get-menus", (menus) => {
    state.menus = menus;
});


//mostrar menu disponible
socket.on("get-ready-menu", (menu) => {
    client_menu.items = menu;
});

socket.on("add-item-to-ready-menu", (item) => {
    client_menu.items[item.id_item] = item;
});

//dashboard
socket.on("get-summary", (summary) => {
    state.summary_orders = summary;
  });
  
socket.on("get-summary-order", (summary_order) => {
    state.summary_orders.unshift(summary_order);
  });
  

//orders
socket.on("get-all-waiting-order", (orders) => {
    state.waiting = orders;
  });
socket.on("get-waiting-order", (order) => {
    state.waiting.push(order);
  });

//recibit mensaje de respuesta
socket.on("answer-order", (answer_order) => {
    client_menu.answer_order = answer_order;
    console.log("estoy en answer order", answer_order)
    if(answer_order.state === 1){
      console.log("Entre al if de anser order")
      socket.emit('get-complete-menu');
    }
  });