import { BINANCE_FUTURES, BINANCE_SPOT, BYBIT_SPOT, GATEIO_SPOT, OKX_SPOT } from '../helperListCryptoFutures.js';
import { coinMarket } from './coinMarket.js';
let canvas = document.getElementById('canv')
let ctx = canvas.getContext('2d')
let exchangeList = [ BINANCE_SPOT,   BYBIT_SPOT,  OKX_SPOT]
// let exchangeList = [ BINANCE_SPOT]

let exchangeName = ['BINANCE_SPOT', 'BYBIT_SPOT','OKX_SPOT']
// let exchangeName = ['BINANCE_SPOT']

let resArray = []
let gurbanistan = ''
let openPrice  = 1
let highPrice  = 2
let lowPrice   = 3
let closePrice = 4
let crt = null
const tgSend = async function(ticker, tf, crt, exName) {
        let circCap = await coinMarket(crt)
        console.log(circCap)
        let tgOtpravil = await fetch(`http://localhost:5000/api/v1/crypto/tg?ticker=${ticker}&tf=${tf}&circ=${circCap.marketCap}&percent=${circCap.circulation}&exName=${exName}`) 
        console.log(tgOtpravil)
}
        

let prover = async function() {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight) 

        console.log('Searching started...')
        // resultArray = []
for (let ex = 0; ex < exchangeList.length; ex++) {
        let arrayBalun = exchangeList[ex]             //Array  of Exchange tickers
        let exName     = exchangeName[ex]             //String of Exchange name
        for(let tfIter = 0; tfIter < 4; tfIter++) {   //  TIMEFRAME NUMBER!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                let timeFrame = 240
                if(exName === 'BINANCE_SPOT')    timeFrame = ['1d', '4h', '1h', '15m']
                if(exName === 'BYBIT_SPOT')      timeFrame = ['D',   240,   60,  15  ]
                if(exName === 'OKX_SPOT')        timeFrame = ['1Dutc', '4H', '1H', '15m']
                if(exName === 'GATEIO_SPOT')     timeFrame = ['1d', '4h', '1h', '15m']
                let tf = timeFrame[tfIter]
                // console.log(exName, tf)
                let timeInterval = 0
                if(tf === 5  || tf === '5m' ) timeInterval = 5
                if(tf === 15 || tf === '15m') timeInterval = 15
                if(tf === 30 || tf === '30m') timeInterval = 30
                if(tf === 60 || tf === '1h' || tf === '1H') timeInterval = 60
                if(tf === 240 || tf === '4h' || tf === '4H') timeInterval = 240
                if(tf === 'D' || tf === '1d' || tf === '1Dutc') timeInterval = 1440
                for(let crypto = 0; crypto < arrayBalun.length; crypto++){
                        let cList = arrayBalun[crypto]
                            gurbanistan = cList
                        let timeEnd = new Date().getTime()
                        let timeStart = timeEnd - timeInterval*1000*60*300
                        // timeFrame = timeFrameArr[tfIter]
        let url = ''
        // if(exName === 'BINANCE_FUTURES') url = `https://fapi.binance.com/fapi/v1/klines?symbol=${cList}&interval=${tf}&limit=300`  //Binance Futures
        if(exName === 'BINANCE_SPOT') url = `https://api.binance.com/api/v1/klines?symbol=${cList}&interval=${tf}&limit=300`  //Binance Spot
        if(exName === 'BYBIT_SPOT') url = `https://api-testnet.bybit.com/v5/market/kline?category=inverse&interval=${tf}&end=${timeEnd}&symbol=${cList}&limit=300` //Bybit spot
        if(exName === 'OKX_SPOT')               url = `https://www.okx.com/api/v5/market/mark-price-candles?instId=${cList}&bar=${tf}`
        if(exName === 'GATEIO_SPOT')             url = `https://api.gateio.ws/api/v4/spot/candlesticks?currency_pair=${cList}&interval=${tf}`

        console.log(url)
        await fetch(url)
        .then(re => re.json())
        .then(res => {
                let balun = null
                // if(exName === 'BINANCE_FUTURES')  balun = res  //Binance Futures
                if(exName === 'BINANCE_SPOT')   {
                        openPrice  = 1
                        highPrice  = 2
                        lowPrice   = 3
                        closePrice = 4
                        balun = res  // Binance Spot
                        crt = cList.split('USDT')[0]
                }  
                if(exName === 'BYBIT_SPOT')      {
                        openPrice  = 1
                        highPrice  = 2
                        lowPrice   = 3
                        closePrice = 4
                        balun = res.result.list //Bybit
                        balun.reverse()
                        crt = cList.split('USDT')[0]
                } 
                if(exName === 'OKX_SPOT')   {
                        openPrice  = 1
                        highPrice  = 2
                        lowPrice   = 3
                        closePrice = 4
                        balun = res.data
                    balun.reverse()
                    crt = cList.split('-USDT')[0]
                }
                if(exName === 'GATEIO_SPOT') {
                        openPrice  = 2
                        highPrice  = 3
                        lowPrice   = 4
                        closePrice = 5
                        balun = res
                        crt = cList.split('_usdt')[0]
                }
        let fractalArr = []
                balun.forEach((e,x) => {
                        if (x > 0 && x < balun.length - 1){
                                let ah = balun[x][highPrice]*1 
                                let bh = balun[x - 1][highPrice]*1
                                let dh = balun[x + 1][highPrice]*1
                                let obj = { min: balun[x][lowPrice], max: balun[x][highPrice], time: balun[x][0], idx: x }
                                if( ah >= bh && ah >= dh ) fractalArr.push(obj)        
                        }  
                })
                let newFrArrNot = fractalArr.reverse()
        // console.log(newFrArrNot)
        for (let r = 0; r < newFrArrNot.length; r++) {  //ZERO INDEX - LATEST FRACTAL || CALCULATE POINT P2 (R)
                let P2 = newFrArrNot[r].max*1 
                let P2idx = newFrArrNot[r].idx    ///P2
               
                // if(newFrArrNot[r].dir == 'sell'){
                for (let t = r + 1; t < newFrArrNot.length; t++){    // CALCULATE POINT P4   (T)
                        let maxP2P4 = 0
                        let minP2P4 = 999999999999999
                        let P3idx = null                  ///P3
                        let P4 = newFrArrNot[t].max*1        
                        let P4idx = newFrArrNot[t].idx      ////P4
                        for(let z = newFrArrNot[t].idx + 1; z < newFrArrNot[r].idx; z++){   //  CALCULATE POINT P3 (Z)
                                if(balun[z][highPrice]*1 > maxP2P4) maxP2P4 = balun[z][highPrice]*1
                                if(balun[z][lowPrice]*1 < minP2P4) {
                                        minP2P4 = balun[z][lowPrice]*1
                                        P3idx = z
                                }
                        }
                        let P3 = minP2P4
                        if(maxP2P4 <= P2 && maxP2P4 <= P4) {
                                let range = P2 > P4 ? P2 - P3 : P2 <= P4 ? P4 - P3 : null
                                let deviation = P2 > P4 ? (P2 - P4)/range*100 : P2 <= P4 ? (P4 - P2)/range*100 : null
                                let topOne = P2 > P4 ? P2 : P2 <= P4 ? P4 : null
                                if(deviation < 15 ) {
                                        
                                        let P5idx = null              ///P5
                                        let P5 = null
                                        // let maxP4P5 = 0
                                        // let minP4P5 = 999999999999999
                                        // let P5found = false
                                        let P4P5proboi = false
                                        let P0 = balun[balun.length - 1][closePrice]*1
                                        let P0idx = balun.length - 1                   ///P0
                                                for(let l = newFrArrNot[t].idx*1 - 1; l > 0; l--){  //IF P5 EXIST?
                                                        if(balun[l][lowPrice]*1 < P3 ){
                                                                P5 = balun[l][lowPrice]*1
                                                                P5idx = l
                                                                l = 0
                                                        }
                                                }

                                                for(let m = P5idx + 1; m < newFrArrNot[t].idx; m++){
                                                        if(balun[m][highPrice]*1 > P4) {
                                                                P4P5proboi = true
                                                                m = newFrArrNot[t].idx
                                                        }
                                                }
                                        let P0InTheZone = P0 <= topOne &&  P0 > ((topOne-P3)*0.9 + P3) ? true : false
                                        let P5exist = P5 !== null && P4P5proboi === false ? true : false

                        /////////////////////////////ENTER POINT///////////////////////////////////////////////////////////
                                        if(P0InTheZone === true && P5exist === true){   
                                                        // console.log(P5, P5idx, P5found)
                                                        
                                                        
                                                let P1 = 999999999999999                               //P1
                                                let P1idx = null
                                                let P0P2range = false
                                                


                                                for(let q = P2idx + 1; q < balun.length - 1; q++){
                                                        if(balun[q][lowPrice]*1 < P1) {
                                                                P1 = balun[q][lowPrice]*1
                                                                P1idx = q
                                                        }
                                                        if(balun[q][lowPrice]*1 < P3 || balun[q][highPrice]*1 > topOne ) {
                                                                P0P2range = true
                                                                q = balun.length
                                                        }
                                                }
                                                        
                                                        
                                                let lastWave = P2 - P3
                                                let fibo38 = (P2 - P1)/lastWave
                                                
                                                // console.log(P5 < P3, P1 !== null,  P1 > P3, fibo38 >= 0.382)
                                                if( P5 < P3 && P1 !== null && P1 > P3 && P0P2range === false && fibo38 >= 0.382) {
                                                                
                                                                        
                                                                                
                                                                                let objectData = {
                                                                                        array : balun,
                                                                                        ticker : cList,
                                                                                        EX : exName,
                                                                                        timeFrame: timeInterval,
                                                                                        top : topOne,
                                                                                        pattern : {
                                                                                                'PA'  : P0,
                                                                                                'PAA' : P0idx,
                                                                                                'P0'  : P0,
                                                                                                'P00' : P0idx,
                                                                                                'P1'  : P1,
                                                                                                'P11' : P1idx,
                                                                                                'P2'  : P2,
                                                                                                'P22' : P2idx,
                                                                                                'P3'  : P3,
                                                                                                'P33' : P3idx,
                                                                                                'P4'  : P4,
                                                                                                'P44' : P4idx,
                                                                                                'P5'  : P5,
                                                                                                'P55' : P5idx
                                                                                        }
                                                                                }
                                                                                let o = objectData
                                                                                let check = true
                                                                                resultArray.forEach(e => {
                                                                                        if(e.ticker === o.ticker && e.timeFrame === o.timeFrame && e.topOne*1 === o.topOne*1) check = false
                                                                                        
                                                                                })
                                                                                if(check === true) {
                                                                                        console.log('TG should send message')
                                                                                        tgSend(o.ticker, o.timeFrame, crt, exName)
                                                                                        resultArray.push(objectData)
                                                                                }
                                                                                console.log('cycle finish: ' + cList)
                                                                                // l = 0
                                                                               
                                                                                
                                                                                
                                                                                
                                                                                
                                                                        }}}
                                }
                                                                        
                        }
                        
                }
        })
        .catch(e => console.log('error'))
}}
}

console.log('Search Finished')
prover()
}
export let proverka = prover
export let resultArray = resArray 
