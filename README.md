
# P2P/Distributed OederBook



An order book is a ledger that records the outstanding orders from buyers and sellers at various price levels.

Here's an example of how an order book might look like:
```
Buy Orders (Bids)                        Sell Orders (Asks)
Price     Quantity   Total Quantity      Quantity   Total Quantity
--------------------------------------------------------------
$58,000   10 BTC     10 BTC              5 BTC      5 BTC
$57,995   15 BTC     25 BTC              8 BTC      13 BTC
$57,990   20 BTC     45 BTC              12 BTC     25 BTC
$57,985   18 BTC     63 BTC              17 BTC     42 BTC
$57,980   25 BTC     88 BTC              20 BTC     62 BTC
```

It's important to note that the order book shows only a snapshot of the current outstanding orders and does not reflect the entire trading history or completed trades.

## What this system offers

* A distributed orderbook, where multiple peer nodes store their own orderbook and maintain them.
* Peer nodes take in the orders as they come in and process the data.
* Peer nodes can connect and get disconnected from the system without harming.

This system is made using Grenache which interanlly maintains all the peer nodes and forwards requests/data to them.

* Currently the system only handles one kind of currency, but can be extended in future with more per time.

## Running the system

```
npm i -g grenache-grape
grape --dp 20001 --aph 30001 --bn '127.0.0.1:20002'
grape --dp 20002 --aph 40001 --bn '127.0.0.1:20001'
// clone the repo and cd into it
npm i
npm run start // run on different terminals to spawn multiple peers
```

The peers connect using rpc to the grapes cluster and request for latest orderbook.

Then they start recieving and sending orders using the pub sub over the network.

## Imporvements

* Include multiple currencies and manage order book accordingly.
* Synchronize the boot-up process and make it error free.
* On peer disconnect handling can be added to take care of any resources.
* Make the system decentralized currently it is distributed but not decentralized, by adding consensus mechanisms between peers which will make the system more efficient.
* Add error handling and retry mechanisms.
* Add better storage system for order book either on filesystem or DB for efficient data operations and persistance.
