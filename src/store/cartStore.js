import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
    state() {
        return {
            products: {}
        }
    },
    getters: {
        getTotalPrice() {
            let totalPrice = 0;
            for (const key in this.products){
                totalPrice += this.products[key].price * this.products[key].quantity
            }
            return totalPrice;
        }
    },
    actions: {
        addCart(payload) {
            //console.log(payload);
            if (this.products[payload._id]) {
                this.products[payload._id].quantity += payload.quantity
            } else {
                this.products[payload._id] = payload;
            }
            
        },
        removeCart(id) {
            delete this.products[id]
        }
    }
});