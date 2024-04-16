import { constants } from '../utils/index.js'

import GNWS from 'grenache-nodejs-ws';
import GNL from 'grenache-nodejs-link';

export class Client {
    instance = null;

    static getClient() {
        if (!this.instance) {
            const link = new GNL({
             grape: constants.LINK
            })
            link.start()

            const peer = new GNWS.PeerRPCClient(link, {})
            peer.init()
            this.instance = peer
       }
       return this.instance
    }
}