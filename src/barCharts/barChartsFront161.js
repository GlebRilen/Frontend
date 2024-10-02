import { BINANCE_SPOT, BYBIT_SPOT, OKX_SPOT } from '../helperListCryptoFutures.js';
import { mongoFetchAllFront } from './funcs/mongoFetch/mongoFetchAllFront.js';
import { prover161 } from './funcs/objectBuilder.js';
import { fetchBINANCE } from './funcs/spotFetch/fetchBINANCE.js';
import { fetchBINANCEfutures } from './funcs/spotFetch/fetchBINANCEfutures.js';
import { fetchBYBIT } from './funcs/spotFetch/fetchBYBIT.js';
import { fetchOKX } from './funcs/spotFetch/fetchOKX.js';
// import { OKX_SPOT, BINANCE_FUTURES } from './../helperListCryptoFutures';
let canvas = document.getElementById('canv')
let ctx = canvas.getContext('2d')
// let exchangeList = [ BINANCE_SPOT]
let exchangeName = ['BINANCE_FUTURES', 'BINANCE_SPOT', 'BYBIT_SPOT']
// let exchangeName = ['OKX_SPOT']
// let resArray161 = []
const pattern161func = async function() {
                
                let BINANCE_SPOT = await fetchBINANCE()  //Fetch cryptolist for BINANCE
                let BYBIT_SPOT   = await fetchBYBIT()    //Fetch cryptolist for BYBIT
                // let OKX_SPOT     = await fetchOKX()      //Fetch cryptolist for OKX
                let BINANCE_FUTURES = await fetchBINANCEfutures()
                let exchangeList = [ BINANCE_FUTURES, BINANCE_SPOT,  BYBIT_SPOT  ]
                // let exchangeList = [ BINANCE_SPOT  ]
                let allPatterns = await mongoFetchAllFront()

    console.log('Searching started...')
        for (let ex = 0; ex < exchangeList.length; ex++) {
        let arrayBalun = exchangeList[ex]             //Array  of Exchange tickers
        let exName     = exchangeName[ex]             //String of Exchange name
                for(let tfIter = 0; tfIter < 6; tfIter++) {   //  TIMEFRAME NUMBER!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                        for(let crypto = 0; crypto < arrayBalun.length; crypto++){
                                // ctx.clearRect(0, 0, window.innerWidth, window.innerHeight) 
                                await prover161(arrayBalun, crypto, tfIter, exName, allPatterns)
                        }
                }
        }

console.log('Search Finished')
pattern161func()
}
export let proverka161 = pattern161func
// export let resultArray161 = resArray161
