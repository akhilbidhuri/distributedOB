import { constants } from '../utils/index.js'
import { getOrderBook } from '../OrderBook/index.js'

import GNWS from 'grenache-nodejs-ws'
import GNL from 'grenache-nodejs-link'

export function setupServer () {
    const link = new GNL({
        grape: constants.LINK
    })
    link.start()

    const peer = new GNWS.PeerRPCServer(link, {
        timeout: 300000
    })
    peer.init()

    const port = 1024 + Math.floor(Math.random() * 1000)
    const service = peer.transport('server')
    service.listen(port)

    setInterval(function () {
        link.announce(constants.REQUEST_OB, service.port, {})
    }, 1000)

    service.on('request', (rid, key, payload, handler) => {
        const orderBook = getOrderBook()
        handler.reply(null, orderBook)
    })
}