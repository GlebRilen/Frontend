import { rectArray, rectArrayPrice, rectArrayTime } from "../variables.js"

const prScleRec = function(){
    let DELTA = 0
    let maxVisDPR = 0
    let minVisDPR = 0
    rectArrayPrice.forEach(e => {
        if(e.v === true && e.dpr > maxVisDPR) maxVisDPR = e.dpr
        if(e.v === true && e.dpr < minVisDPR) minVisDPR = e.dpr
    })
    DELTA = Math.abs(minVisDPR) > maxVisDPR ? Math.abs(minVisDPR) : maxVisDPR



    for ( let i = 0; i < rectArray.length; i++){
    rectArray[i].xx  = rectArray[i].x
    rectArray[i].yy  = rectArray[i].y
    rectArray[i].xxt = rectArray[i].xt
    rectArray[i].yyt = rectArray[i].yt
    }
    for ( let t = 0; t < rectArrayTime.length; t++){
    rectArrayTime[t].xx  = rectArrayTime[t].x
    rectArrayTime[t].xxt = rectArrayTime[t].xt
    }
    for ( let p = 0; p < rectArrayPrice.length; p++){
    rectArrayPrice[p].yy  = rectArrayPrice[p].y
    rectArrayPrice[p].yyt = rectArrayPrice[p].yt
    rectArrayPrice[p].op = Math.abs(rectArrayPrice[p].dpr)/DELTA
    rectArrayPrice[p].draw()
    }
}
export const priceScaleRecount = prScleRec