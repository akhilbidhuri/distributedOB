import constants from "./constants.js";

export function generateRandomOrder() {
    const randomType = Math.ceil(Math.random() * 10) % 2 ? constants.BUY : constants.SELL
    const randomQuantityExponent = Math.ceil(Math.random() * 10 % 3)
    const randomQuantity = Math.ceil(Math.random() * Math.pow(10, randomQuantityExponent))
    const randomPrice = Math.ceil(Math.random() * 1000)
    return {type: randomType, price: randomPrice, quantity: randomQuantity}
}