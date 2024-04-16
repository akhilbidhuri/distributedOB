export class Order {
    // values relevant for current system
    type; // BUY or SELL
    price;
    quantity;
    // other values can be added when system is extended ex:
    // from_currency;
    // user;
    // to_currency;

    constructor(incomingOrder) {
        this.type = incomingOrder.type;
        this.price = incomingOrder.price;
        this.quantity = incomingOrder.quantity;
    }
}
