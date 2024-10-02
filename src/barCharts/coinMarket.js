import { priceReducer } from "../attributeSetter.js"
import { PORT } from './funcs/mongoFetch/PORT.js';

export const coinMarket = async function(ticker){
    let cap = {
        'marketCap' : Number,
        'fdmc' : Number,        //res.data[sym].quote.USD.fully_diluted_market_cap
        'infinite' : Boolean,   //res.data[sym].infinite_supply
        'circulation' : Number, //marketCap/fdmc
        'rank' : Number         //res.data[sym].cmc_rank
    }
    let symbolObj = { 'sym' : ticker}
    let sym = ticker
    let url = `http://localhost:${PORT}/api/v1/crypto/coinMarketBack`
    let obj = {
            method: 'POST',
            body: JSON.stringify(symbolObj),
            // body : sym,
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json',
            }
        }
    try{
        await fetch(url, obj)
        .then(re => re.json())
        .then(res => {
            console.log(res)
            cap['marketCap'] = priceReducer(res.data[sym].quote.USD.market_cap)
            cap['fdmc'] = priceReducer(res.data[sym].quote.USD.fully_diluted_market_cap)
            cap['infinite'] = res.data[sym].infinite_supply
            cap['circulation'] =  Math.floor(res.data[sym].quote.USD.market_cap / res.data[sym].quote.USD.fully_diluted_market_cap * 100)
            cap['rank'] = res.data[sym].cmc_rank
        })
    } catch(e){
        console.log(e)
    }
    return cap
}