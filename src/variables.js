let rectArr = []          //Array of all Rectangle elements drawn at the chart
// import { clearCanvas } from './variables';
let rectArrTime = []      //Array of all Rectangle elements drawn at TimeLine
let rectArrPrice = []     //Array of all Rectangle elements drawn at PriceScale
let lvlDelta = []         //Array of all Levels Delta for Price Scale
let prLev = []            //Array of all Price Levels
let PriceDeltaObjArr = {} //Object of all Price and Delta objects for price scale

let canvasRect = document.getElementById('canv')
let ctxRect = canvasRect.getContext('2d')
let clrCanvasVars = function(){
            rectArray = []
            rectArrayTime = []
            rectArrayPrice = []
            levelDelta = []
            priceLevels = []
            pdo = {}
            ctxRect.clearRect(0,0,window.innerWidth, window.innerHeight)
            ctxTime.clearRect(0,0,window.innerWidth, window.innerHeight)
            ctxPrice.clearRect(0,0,window.innerWidth, window.innerHeight)
    
}
let clrCanvas = function(){
    ctxRect.clearRect(0,0,window.innerWidth, window.innerHeight)
    ctxTime.clearRect(0,0,window.innerWidth, window.innerHeight)
    ctxPrice.clearRect(0,0,window.innerWidth, window.innerHeight)

}
let clrPriceScale = function(){
    rectArrayPrice = []
}
export let rectArray       = rectArr
export let rectArrayTime   = rectArrTime
export let rectArrayPrice  = rectArrPrice
export let levelDelta      = lvlDelta 
export let priceLevels     = prLev
export let pdo             = PriceDeltaObjArr
export let clearCanvasVars = clrCanvasVars
export let clearCanvs      = clrCanvas
export let clrRectArrPrice = clrPriceScale