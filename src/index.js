import { setupServer, PubSub } from "./network/index.js";
import { constants, generateRandomOrder } from "./utils/index.js";

setupServer();

// simulate orders using PubSub
(async ()=> {
    const pubSub = new PubSub()
    setTimeout(()=>{
        setInterval(()=> {
            try {
                const order = generateRandomOrder()
                console.log('Sending New Order:', order)
                pubSub.publish(order)
            } catch (err) {
                console.log('failed to send order:', err)
            }
        }, constants.WAIT_DURATION)}
    , 10000)
})()