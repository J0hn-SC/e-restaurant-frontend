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