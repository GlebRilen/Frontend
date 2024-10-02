let canvas = document.getElementById('canv')
let ctx = canvas.getContext('2d')
let listener = {
    drugFunction : function(barArray, patternArray, mouseDown){
        window.addEventListener('mousedown', e => {
        let startX = e.x
        let startY = e.y
        mouseDown = true
                window.addEventListener('mousemove', event => {
                    if(mouseDown === true){
                        function drug() {
                            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
                            for( let i = 0; i < barArray.length; i++){
                                let x = barArray[i].xx + event.x - startX
                                let y = barArray[i].yy + event.y - startY
                                let wx = barArray[i].wxx + event.x - startX
                                let wy = barArray[i].wyy + event.y - startY
                                barArray[i].drag(x, y, wx, wy)
                            }
                            let p = patternArray[0]
                            let dragObj = {}
                                dragObj.x0 = p.x00 + event.x - startX
                                dragObj.x1 = p.x11 + event.x - startX
                                dragObj.x2 = p.x22 + event.x - startX
                                dragObj.x3 = p.x33 + event.x - startX
                                dragObj.x4 = p.x44 + event.x - startX
                                dragObj.x5 = p.x55 + event.x - startX
                                dragObj.xA = p.xAA + event.x - startX
                                dragObj.xL0= p.xL00+ event.x - startX
                                dragObj.y0 = p.y00 + event.y - startY
                                dragObj.y1 = p.y11 + event.y - startY
                                dragObj.y2 = p.y22 + event.y - startY
                                dragObj.y3 = p.y33 + event.y - startY
                                dragObj.y4 = p.y44 + event.y - startY
                                dragObj.y5 = p.y55 + event.y - startY
                                dragObj.yA = p.yAA + event.y - startY
                                dragObj.yL0= p.yL00+ event.y - startY
                                dragObj.y261 = p.y2611 + event.y - startY
                                dragObj.y161 = p.y1611 + event.y - startY
                                dragObj.y138 = p.y1388 + event.y - startY

                            patternArray[0].drag(dragObj)
                        }
                        requestAnimationFrame(drug)
                    }
                })
        })
        
        window.addEventListener('mouseup', e => {
                for ( let i = 0; i < barArray.length; i++){
                    barArray[i].xx  = barArray[i].x
                    barArray[i].yy  = barArray[i].y
                    barArray[i].wxx = barArray[i].wx
                    barArray[i].wyy = barArray[i].wy
                }
                let p = patternArray[0]
                p.xAA = p.xA
                p.xL00= p.xL0
                p.x00 = p.x0
                p.x11 = p.x1
                p.x22 = p.x2
                p.x33 = p.x3
                p.x44 = p.x4
                p.x55 = p.x5
                p.yAA = p.yA
                p.yL00= p.yL0
                p.y00 = p.y0
                p.y11 = p.y1
                p.y22 = p.y2
                p.y33 = p.y3
                p.y44 = p.y4
                p.y55 = p.y5
                p.y2611 = p.y261
                p.y1611 = p.y161
                p.y1388 = p.y138
                mouseDown = false
            })
        },
    resizeFunc : function(barArray, patternArray) {
        window.addEventListener('wheel', e => {
            function scroll(){
                ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
                let dir = null
                if(e.deltaY > 0) dir =  1
                if(e.deltaY < 0) dir = -1
                for(let i = 0; i < barArray.length; i++){
                    let a = (barArray[i].x + barArray[i].xd ) + (canvas.width - (barArray[i].x + barArray[i].xd))/100*dir
                    let x = Math.floor(a)                                  //Integer value of x
                    let xd = a - x           //Floating deviation of x
                    let d = (barArray[i].w + barArray[i].wd) + (barArray[i].w + barArray[i].wd)/100*dir*-1
                    let w = Math.floor(d)
                    let wd = d - w
                    let wx = Math.floor(x + w/2)
                    barArray[i].resize(x, xd, w, wd, wx)
                }
                let x0 = patternArray[0].x0 + (canvas.width - patternArray[0].x0)/100*dir
                let x1 = patternArray[0].x1 + (canvas.width -patternArray[0].x1)/100*dir
                let x2 = patternArray[0].x2 + (canvas.width -patternArray[0].x2)/100*dir
                let x3 = patternArray[0].x3 + (canvas.width -patternArray[0].x3)/100*dir
                let x4 = patternArray[0].x4 + (canvas.width -patternArray[0].x4)/100*dir
                let x5 = patternArray[0].x5 + (canvas.width -patternArray[0].x5)/100*dir
                let xA = patternArray[0].xA + (canvas.width -patternArray[0].xA)/100*dir
                let xL0 = patternArray[0].xL0 + (canvas.width -patternArray[0].xL0)/100*dir
                

                patternArray[0].resize(x0,x1,x2,x3,x4,x5, xA, xL0)
            }
            requestAnimationFrame(scroll)
        })
    }
} 
export const drugFunc       = listener.drugFunction
export const resizeFunction = listener.resizeFunc