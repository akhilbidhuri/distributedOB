import GNL from 'grenache-nodejs-link';
import GNWS from 'grenache-nodejs-ws';
import { constants } from '../utils/index.js';
import { Client } from './client.js';
import { processOrder, setOrderBook } from '../OrderBook/index.js';

export class PubSub {
    static publisher = null;

    fetchOrderBook() {
        try {
            Client.getClient().request(constants.REQUEST_OB, null,  { timeout: 10000 }, (err, data) => {
                if (err) {
                    console.log('Failed to fetch the orderbook, err:', err);
                    // add retry with exponentially increasing delay upto a number of retries
                    // fetchOrderBook()
                } else {
                    setOrderBook(data)
                }
            })
        } catch (err) {
            console.log('Failed to fetch the orderbook, err:', err);
        }
    }

    createPublisher () {
        const link = new GNL({
            grape: constants.LINK
        })
        link.start()
        
        const peerPub = new GNWS.PeerPub(link, {})
        peerPub.init()
        
        PubSub.publisher = peerPub.transport('server')
        PubSub.publisher.listen(Math.floor(Math.random() * 1000 + 3000))
        
        setInterval(function () {
            link.announce(constants.ORDER_TOPIC, PubSub.publisher.port, {})
        }, 1000)
    }

    createSubscription () {
        const linkSub = new GNL({
            grape: constants.LINK
        })
        
        linkSub.start()
        
        const peerSub = new GNWS.PeerSub(linkSub, {})
        peerSub.init()
        
        setTimeout(()=>{
            peerSub.sub(constants.ORDER_TOPIC, { timeout: 10000 }) 
            
            
            peerSub.on('connected', this.fetchOrderBook)
            
            peerSub.on('message', (payload) => {
                processOrder(JSON.parse(payload))
            })
        }, 2000);
    }

    constructor() {
        if (!PubSub.publisher) {
            this.createPublisher()
            this.createSubscription()            
        }
    }

    publish (payload) {
        PubSub.publisher.pub(JSON.stringify(payload))
    }
}
