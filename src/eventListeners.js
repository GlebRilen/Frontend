// import { variablesObj } from "./variables"

import { rectArray, rectArrayPrice, rectArrayTime } from "./variables.js"

// let absolutnayaDeltaPrice = 0
let canvas = document.getElementById('canv')
let canvasTime = document.getElementById('timeScale')
let canvasPrice = document.querySelector('.priceScale')
let ctx = canvas.getContext('2d')
let ctxTime = canvasTime.getContext('2d')
let ctxPrice = canvasPrice.getContext('2d')
let listener = {

    drugFunc : function(mouseDown){
        
        window.addEventListener('mousedown', e => {
        let startX = e.x
        let startY = e.y
        mouseDown = true
                window.addEventListener('mousemove', event => {
                    if(mouseDown === true){
                        
                        function drug() {
                            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
                            ctxTime.clearRect(0, 0, window.innerWidth, window.innerHeight)
                            ctxPrice.clearRect(0, 0, window.innerWidth, window.innerHeight)
                            for( let i = 0; i < rectArray.length; i++){
                                let x = rectArray[i].xx + event.x - startX
                                let y = rectArray[i].yy + event.y - startY
                                let textX = rectArray[i].xxt + event.x - startX
                                let textY = rectArray[i].yyt + event.y - startY
                                rectArray[i].drag(x, y, textX, textY)
                            }
                            for( let t = 0; t < rectArrayTime.length; t++){
                                let x = rectArrayTime[t].xx + event.x - startX
                                let textX = rectArrayTime[t].xxt + event.x - startX
                                rectArrayTime[t].drag(x, textX)
                            }
                            for( let p = 0; p < rectArrayPrice.length; p++){
                                let y = rectArrayPrice[p].yy + event.y - startY
                                let textY = rectArrayPrice[p].yyt + event.y - startY
                                rectArrayPrice[p].drag(y, textY)
                            }
                        }
                        
                        requestAnimationFrame(drug)
                    }
                })
        })
        
        window.addEventListener('mouseup', e => {
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
                mouseDown = false
            })
        },
    resizeFunc : function(rectArray) {
        window.addEventListener('wheel', e => {
            function scrollLeft(){
                for(let i = 0; i < rectArray.length; i++){
                            rectArray[i].scrollLeft()
                        }
                    }
                    function scrollRight(){
                        for(let i = 0; i < rectArray.length; i++){
                            rectArray[i].scrollRight()
                    }
                }
                if(e.deltaY > 0){
                    requestAnimationFrame(scrollLeft)
                    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
                }      
                if(e.deltaY < 0){
                    requestAnimationFrame(scrollRight)
                    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
                }
        })
    }
    

} 
export const drugFunction     = listener.drugFunc
export const resizeFunction   = listener.resizeFunc
// export const absDeltaPriceFunc  = listener.absolDeltaPrice
// export let absDeltaPrice = absolutnayaDeltaPrice