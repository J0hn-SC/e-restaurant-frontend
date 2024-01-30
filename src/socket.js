import { reactive } from "vue";
import {io} from "socket.io-client";

export const client_menu = reactive({
    items: {},
    table: 0,
    answer_order: {state : 0},
    count_selected : 0,
  });

export const summary_table = reactive({
  //id_table: [{order, id_order, items: [{id_item, state}]}]
});

export const state = reactive({
    menu: {},
    menus: [],
    //Dashboard
    summary_orders : [],
    //Orders
    waiting: [],
    preparating: [],
    //Finished Orders
    ready : [],
    commited: [],


    frequency : []
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

//recibit mensaje de respuesta
socket.on("answer-order", (answer_order) => {
  client_menu.answer_order = answer_order;
  console.log("estoy en answer order", answer_order)
  if(answer_order.state === 1){
    console.log("Entre al if de anser order")
    socket.emit('get-complete-menu');
  }
});

//dashboard
socket.on("get-summary", (summary) => {
    state.summary_orders = summary;
  });
  
socket.on("get-summary-order", (summary_order) => {
    state.summary_orders.unshift(summary_order);
  });
//frequency
socket.on("set-frequency", (new_frequency) => {
  state.frequency = new_frequency;
});
//checklist
socket.on("get-summary-all-table", (summary)=>{
  const keys = Object.keys(summary);
  keys.forEach((key)=>{
    summary_table[key] = summary[key]
  })
})
socket.on("get-summary-table", (summary)=>{
  console.log(summary)
  summary_table[summary[0].id_table] = summary
})

socket.on("order-waiting-to-preparating", (order)=>{
  const table = summary_table[order.id_table]
  if(table){
    const order_table = table.find(ele => ele.id_order === order.id_order)
    if(order_table){
      order_table.state = 1;
    }
  }
})

socket.on("order-preparating-to-ready", (order)=>{
  const table = summary_table[order.id_table]
  if(table){
    const order_table = table.find(ele => ele.id_order === order.id_order)
    if(order_table){
      order_table.state = 2;
    }
  }
})

socket.on("order-ready-to-commited", (order)=>{
  const table = summary_table[order.id_table]
  if(table){
    const order_table = table.find(ele => ele.id_order === order.id_order)
    if(order_table){
      order_table.state = 3;
    }
  }
})

socket.on("order-commited-to-finished", (order)=>{
  const table = summary_table[order.id_table]
  if(table){
    const order_table = table.find(ele => ele.id_order === order.id_order)
    if(order_table){
      order_table.state = 4;
    }
  }
})

socket.on("order-preparating-to-ready", (order)=>{
  summary_table[order.id_table].find(ele => ele.id_order === order.id_order).state = 2
})

//orders
socket.on("get-all-waiting-order", (orders) => {
    state.waiting = orders;
  });
socket.on("get-waiting-order", (order) => {
    state.waiting.push(order);
    if(summary_table[order.id_table]){
      summary_table[order.id_table].unshift(order)
    }else{
      summary_table[order.id_table] = [order];
    }
    console.log("summary_table socket: ",summary_table)
  });


  socket.on("get-all-preparating-order", (orders) => {
    state.preparating = orders;
  });
  
  socket.on("get-ready-order", (order) => {
    console.log("order llegada", order)
    state.ready.push(order);
    console.log("socket, ready", state.ready)
  });
  
  socket.on("get-all-ready-order", (orders) => {
    state.ready = orders;
  });
  socket.on("get-all-commited-order", (orders) => {
    state.commited = orders;
  });


