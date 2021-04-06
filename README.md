# AHAB - Wallet Watcher

Search / Filter Transactions on Uniswap to gleam market insights.

## Tech Stack

- SocketIO
- NodeJs
- MongoDB
- Mongoose ORM
- Vue.js
- Heroku Pipeline

### API's used

Alchemy - getAssetTransfers, and getTokenMetaData calls
Infura - newBlockHeaders
Chainstack - getTransaction

Splitting all the calls up should allows us to constantly ingest block headers from Infura, pass that to Alchemy to get Transactions using Asset Transfers matching uniswap contract, and then get that Transaction from Chainstack Api's.
