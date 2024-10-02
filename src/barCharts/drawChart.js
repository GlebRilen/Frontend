// import { resultArray } from "./barChartsFront.js";
// import { resultArray161 } from "./barChartsFront161.js";
import barChart from "./classesChart/BarChart.js";
import PatternChart from "./classesChart/Pattern.js";
import { coinMarket } from "./coinMarket.js";
// import { drugFunc, resizeFunction } from "./drugResizeFunc.js";

let canvas = document.getElementById('canv')
let ctx = canvas.getContext('2d')
let barArray = []
// let patternArray = []
let openPrice  = 1
let highPrice  = 2
let lowPrice   = 3
let closePrice = 4
let volume     = 5

const lg10 = function(P2, P3, k){
        let m = Math.pow(10, Math.log10(P2) + (Math.log10(P2) - Math.log10(P3))*k)  //261.8 log (1.618 = k)
        return m
}

// let drawFunction = async function(counterChart, check){
let drawFunction = async function(ob, goal){
    await ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    console.log(ob)
    let cryptoTicker = null
    let EX = null
    let check = ob.stage
//     let Array = null
        if (check === 100) {
                // Array = resultArray
                cryptoTicker = ob.ticker
                EX = ob.EX
        }
        if (check === 161) {
                // Array = resultArray161
                cryptoTicker = ob.ticker
                EX = ob.EX
        }
    let crt = null
        if(EX === 'BINANCE_SPOT')    {
                openPrice  = 1
                highPrice  = 2
                lowPrice   = 3
                closePrice = 4
                volume     = 5
                crt = cryptoTicker.split('USDT')[0]

        }
        if(EX === 'BINANCE_FUTURES')    {
            openPrice  = 1
            highPrice  = 2
            lowPrice   = 3
            closePrice = 4
            volume     = 5
            crt = cryptoTicker.split('USDT')[0]

        }
        if(EX === 'BYBIT_SPOT') {
                openPrice  = 1
                highPrice  = 2
                lowPrice   = 3
                closePrice = 4
                volume     = 5
                crt = cryptoTicker.split('USDT')[0]

        }
        if(EX === 'OKX_SPOT') {
                openPrice  = 1
                highPrice  = 2
                lowPrice   = 3
                closePrice = 4
                volume     = 5
                crt = cryptoTicker.split('-USDT')[0]

        }
        if(EX === 'GATEIO_SPOT')   {
                openPrice  = 2
                highPrice  = 3
                lowPrice   = 4
                closePrice = 5
                crt = cryptoTicker.split('_usdt')[0].toUpperCase()

        }
    let circCap = null
    try{
        circCap = await coinMarket(crt)

    } catch(e){
        console.log(e)
    }
//     console.log(cryptoTicker, crt, circCap)
//     patternArray = []
    barArray = []
    let balun = ob.array
    let patternP5idx = ob.pattern['P5I']
//     let endOfPattern = balun.length - 1 - patternP5idx
            let maxPriceArray = [];
            let minPriceArray = [];
            let volumeArray   = [];
    balun.forEach((e, i) => {
       if(i >= patternP5idx) maxPriceArray.push(e[highPrice])
    }); //Added Max Price value to arr maxPriceArray
    balun.forEach((e,i) => {
       if(i >= patternP5idx) minPriceArray.push(e[lowPrice])
    }); //Added Min Price value to arr minPriceArray
    balun.forEach((e, i) => {
        volumeArray.push(e[volume])
    })
    console.log(balun, ob.pattern, ob, highPrice, lowPrice)
    let lvl261YPrice = lg10(balun[ob.pattern['P2I']][highPrice], balun[ob.pattern['P3I']][lowPrice], 1.618) //Add 261 level price
        maxPriceArray.push(lvl261YPrice)
            volumeArray.sort((a,b) => a - b);
            maxPriceArray.sort((a,b) => a - b);
            minPriceArray.sort((a,b) => a - b);
    let maxPrice = maxPriceArray[maxPriceArray.length - 1];
    let minPrice = minPriceArray[0];
    let deltaPrice = maxPrice - minPrice;
    let maxVolume = Math.abs(volumeArray[volumeArray.length - 1] - volumeArray[0])
    let shift  = 80 //shift from s/s from price scale
    let xBarPosition = canvas.width - shift;
    let balunReverse = []
    for(let i = balun.length - 1; i >= 0; i--){
        balunReverse.push(balun[i])
    }
    balunReverse.forEach((e,i) => {

       

                let pixelPositionOpen = 660 - ((e[openPrice] - minPrice)/deltaPrice*650);
                let pixelPositionMax = 660 - ((e[highPrice] - minPrice)/deltaPrice*650);
                let pixelPositionMin = 660 - ((e[lowPrice] - minPrice)/deltaPrice*650);
                let pixelPositionClose = 660 - ((e[closePrice] - minPrice)/deltaPrice*650);
                xBarPosition = xBarPosition - 5;
                ///////////////////////////ADDING CANDLE WICK/////////////////////////////////////////////////////////////
                let x   = Math.floor(xBarPosition)
                let y   = e[openPrice] >= e[closePrice] ? Math.floor(pixelPositionOpen) : Math.floor(pixelPositionClose)
                let w   = 3
                let h   = Math.abs(pixelPositionOpen - pixelPositionClose)
                let wx  = Math.floor(xBarPosition*1 + 1)
                let wy  = Math.floor(pixelPositionMax)
                let wh  = Math.floor(pixelPositionMin) - Math.floor(pixelPositionMax)
                let idx = i
                let c   = e[openPrice] >= e[closePrice] ? 'black' : 'white' 
                let v   = Math.floor(e[volume]/maxVolume*100)
                if(EX === 'GATEIO_SPOT')  c = e[openPrice] <= e[closePrice] ? 'black' : 'white' 
                
                barArray.push(new barChart(x, y, w, h, wx, wy, wh, idx, c, v))
                barArray[barArray.length - 1].draw()
                // console.log(x, i, endOfPattern, patternP5idx)
        
    })
let obj = ob.pattern
console.log(obj)
let pObj = {}
        pObj.x0  = canvas.width - shift - ((balun.length - obj['P0I'])*5) + 2
        pObj.x1  = canvas.width - shift - ((balun.length - obj['P1I'])*5) + 2
        pObj.x2  = canvas.width - shift - ((balun.length - obj['P2I'])*5) + 2
        pObj.x3  = canvas.width - shift - ((balun.length - obj['P3I'])*5) + 2
        pObj.x4  = canvas.width - shift - ((balun.length - obj['P4I'])*5) + 2
        pObj.x5  = canvas.width - shift - ((balun.length - obj['P5I'])*5) + 2
        pObj.xN  = canvas.width - shift - ((balun.length - obj['PNI'])*5) + 2
        pObj.xL0 = canvas.width - shift - ((balun.length - obj['P5I'])*5) + 2
        // if(goal === 'T') pObj.xT = canvas.width - shift - ((balun.length - obj['PTI'])*5) + 2
        if(goal === 'T' || goal === 'S') pObj.xT = canvas.width - shift - 5 + 2
        pObj.y0  = 660 - ((balun[obj['P0I']][highPrice] - minPrice)/deltaPrice*650);
        pObj.y1  = 660 - ((balun[obj['P1I']][lowPrice] - minPrice)/deltaPrice*650);
        pObj.y2  = 660 - ((balun[obj['P2I']][highPrice] - minPrice)/deltaPrice*650);
        pObj.y3  = 660 - ((balun[obj['P3I']][lowPrice] - minPrice)/deltaPrice*650);
        pObj.y4  = 660 - ((balun[obj['P4I']][highPrice] - minPrice)/deltaPrice*650);
        pObj.y5  = 660 - ((balun[obj['P5I']][lowPrice] - minPrice)/deltaPrice*650);
        pObj.yN  = 660 - ((balun[obj['PNI']][highPrice] - minPrice)/deltaPrice*650);
        pObj.yL0 = 660 - ((ob.top*1 - minPrice)/deltaPrice*650);
        if(goal === 'T') {
            pObj.goal = goal
            pObj.yT  = 660 - ((balun[obj['PTI']][highPrice] - minPrice)/deltaPrice*650);
        }
        if(goal === 'S') {
            pObj.goal = goal
            pObj.yT  = 660 - ((balun[obj['PTI']][lowPrice] - minPrice)/deltaPrice*650);
        }
        pObj.y261= 680 - ((lg10(balun[obj['P2I']][highPrice], balun[obj['P3I']][lowPrice], 1.618) - minPrice)/deltaPrice*650);
        pObj.y161= 660 - ((lg10(balun[obj['P2I']][highPrice], balun[obj['P3I']][lowPrice], 0.618) - minPrice)/deltaPrice*650);
        pObj.y138= 660 - ((lg10(balun[obj['P2I']][highPrice], balun[obj['P3I']][lowPrice], 0.382) - minPrice)/deltaPrice*650);
        pObj.sym = ob.ticker
        pObj.tf = ob.timeFrame
        pObj.cap = circCap
        pObj.P1  = (balun[ob.pattern['P1I']][lowPrice]).toString().slice(0, 7)
        pObj.p100 = (ob.top*1).toString().slice(0, 8)
        pObj.p138 = (lg10(balun[obj['P2I']][highPrice], balun[obj['P3I']][lowPrice], 0.382)).toString().slice(0, 7)
        pObj.p161 = (lg10(balun[obj['P2I']][highPrice], balun[obj['P3I']][lowPrice], 0.618)).toString().slice(0, 7)
        pObj.p261 = (lg10(balun[obj['P2I']][highPrice], balun[obj['P3I']][lowPrice], 1.618)).toString().slice(0, 7)

console.log(ob)
let newPattern = new PatternChart(pObj)
// patternArray.push(new PatternChart(pObj))
// patternArray[patternArray.length - 1].draw()
// patternArray[patternArray.length - 1].priceDraw()
newPattern.draw()
newPattern.priceDraw()
if(goal === 'S' || goal === 'T') newPattern.targetLineDraw()
// let mouseDown = false
// drugFunc(barArray, patternArray, mouseDown)
// resizeFunction(barArray, patternArray)
// console.log(patternArray)
let draw = 'canvas draw'
return draw

}
export let drawFunc = drawFunction