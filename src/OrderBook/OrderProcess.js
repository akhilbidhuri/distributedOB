import { constants } from "../utils/index.js";
import { Order } from "./Order.js";
import orderBookStore from "./OrderBookStore.js";
import _ from 'lodash'

export function getOrderBook() {
    return _.cloneDeep(orderBookStore)
}

export function setOrderBook(orderBook) {
    orderBookStore[constants.BUY] = orderBook[constants.BUY]
    orderBookStore[constants.SELL] = orderBook[constants.SELL]
}

function printOrderBook() {
    for (let key in orderBookStore) {
        console.log(key)
        for(let price in orderBookStore[key]) {
            console.log('Price: ', price, '\tQuantity: ', orderBookStore[key][price][constants.QUANTITY],
                '\tTotal_Quantity: ', orderBookStore[key][price][constants.TOTAL_QUANTITY]
            )
        }
    }
}

export async function processOrder (incomingOrder) {
    try {
        const order = new Order(incomingOrder);
        if (orderBookStore[order.type][order.price]) {
            orderBookStore[order.type][order.price][constants.QUANTITY] += order.quantity
            orderBookStore[order.type][order.price][constants.TOTAL_QUANTITY] += order.quantity
        } else {
            orderBookStore[order.type][order.price] = {
                [constants.QUANTITY]: order.quantity,
                [constants.TOTAL_QUANTITY]: order.quantity
            }
        }
        Object.keys(orderBookStore[order.type]).forEach(price=>{
            if (price>order.price) {
                orderBookStore[order.type][price][constants.TOTAL_QUANTITY] += order.quantity
            }
        })
        console.log('ORDER ADDED:', order)
        console.log('ORDER BOOK:')
        printOrderBook()
    } catch {
        // exception
    }
}
