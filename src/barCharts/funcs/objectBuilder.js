import { screenShot } from "./screenshot.js"
// import { resultArray161 } from "../barChartsFront161.js"
import { coinMarket } from "../coinMarket.js"
import { drawFunc } from "../drawChart.js"
import { fetchBuilder } from "./fetchBuilder.js"
import { fractalSearch } from "./fractalSearch.js"
import { pattern161UP } from "./patternFinder161UP.js"
import { pattern100UP } from "./patternFinder100UP.js"
import { tfBuilder, timeIntervalBuilder, urlBuilder } from "./urlBuilder.js"
import { mongoCreateFront } from "./mongoFetch/mongoCreateFront.js"
import { mongoFindFront } from "./mongoFetch/mongoFindFront.js"
import { mongoFetchAllFront } from "./mongoFetch/mongoFetchAllFront.js"
import { checkPatternComplete138 } from "./checkPatternComplete138.js"
let canvas = document.getElementById('canv')
let ctx = canvas.getContext('2d')
// const telegram = async function(ticker, tf, crt, exName){
export const telegram = async function(ob, goal){
        let answer = null
        let ticker = ob.ticker
        let tf     = ob.timeFrame
        let exName = ob.EX
        console.log(ob)
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
        let dr = await drawFunc(ob, goal)

        console.log(dr)
        let circCap = null
    try{
        circCap = await coinMarket(ob.coin)
        answer = await screenShot(circCap, ticker, tf, exName, ob, goal)
    } catch(e) {
        answer = 'error to make a screenshot'
        console.log('trying to make a screenShot - failure')
    }
    return answer
}

export let prover161 = async function(arrayBalun, crypto, tfIter, exName, allPatterns) {
    let cList = arrayBalun[crypto]
    let url = urlBuilder(cList, tfIter, exName)
    let tf = tfBuilder(exName, tfIter)
    let timeInterval = timeIntervalBuilder(tf)
    console.log(exName,cList,tf)
    let fetchBuil = await fetchBuilder(url, exName, cList)
    if(fetchBuil.balun !== null){
        let checker = true
        if(allPatterns.length > 0){
            allPatterns.forEach(e => {
                // console.log(e.ticker, cList, e.EX, exName, e.timeFrame, timeInterval)
                if(e.ticker === cList && e.EX === exName && e.timeFrame === timeInterval){
                    checker = false
                    console.log(e.data.target138, e.data.SL, e.data.cancell)
                    if(e.data.target138 === true || e.data.SL === true || e.data.cancell === true) return
                    console.log('checkPatternComplete started')
                    checkPatternComplete138(fetchBuil, e, fetchBuil.crt)
                }
            })
        }
        // console.log( ' идет проверка')
    if(checker === false) return
    let highPrice  = fetchBuil.highPrice
    let lowPrice   = fetchBuil.lowPrice
    let closePrice = fetchBuil.closePrice
    let crt = fetchBuil.crt
    let balun = fetchBuil.balun
    let newFrArrNot = fractalSearch(balun, highPrice, lowPrice)
    let ob161 = null // let ob161 = pattern161UP(newFrArrNot, balun, highPrice, lowPrice, cList, exName, timeInterval)  //FOR 261 PATTERN SEARCH
    let ob100 = pattern100UP(newFrArrNot, balun, highPrice, lowPrice, cList, exName, timeInterval, closePrice)
    let ob = null
    let obAr = null
    let chPat = null
    // if (ob161.array !== null) {
    //     ob = ob161
    //     obAr = 1
    //     chPat = 161
    // }
    if (ob100.array !== null) {
        ob = ob100
        obAr = 1
        chPat = 100
    }

    if (obAr !== null){
        ob.coin = crt
        let check = true
        let resPattern = await mongoFindFront(ob)
        console.log(resPattern)
        if(resPattern !== null){
            if(resPattern.length > 0){
                resPattern.forEach(e => {
                    if(e.EX === ob.EX && e.ticker === ob.ticker && e.timeFrame === ob.timeFrame && e.top === ob.top){
                        check = false
                    }
    
                })
            }
        }
            if(check === true) {
                await mongoCreateFront(ob)
                let otpravka = await telegram(ob)
                // counterChart161++
                console.log(otpravka)
        }
        console.log('cycle finish: ' + cList)
     }}
}