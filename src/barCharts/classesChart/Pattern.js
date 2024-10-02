let canvas = document.getElementById('canv')
let ctx = canvas.getContext('2d')
const PatternChart = class Pattern {
    constructor(pObj) {
        this.x0 = pObj.x0
        this.x1 = pObj.x1
        this.x2 = pObj.x2 
        this.x3 = pObj.x3 
        this.x4 = pObj.x4 
        this.x5 = pObj.x5 
        this.x00 = pObj.x0
        this.x11 = pObj.x1
        this.x22 = pObj.x2 
        this.x33 = pObj.x3 
        this.x44 = pObj.x4 
        this.x55 = pObj.x5 
        this.y0 = pObj.y0 
        this.y1 = pObj.y1 
        this.y2 = pObj.y2 
        this.y3 = pObj.y3
        this.y4 = pObj.y4
        this.y5 = pObj.y5 
        this.y00 = pObj.y0 
        this.y11 = pObj.y1 
        this.y22 = pObj.y2 
        this.y33 = pObj.y3
        this.y44 = pObj.y4
        this.y55 = pObj.y5 
        this.sym = pObj.sym
        this.tf = pObj.tf
        this.cap = pObj.cap
        this.xN = pObj.xN
        this.xNN = pObj.xN
        this.yN = pObj.yN
        this.yNN = pObj.yN
        this.xL0 = pObj.xL0   ///DRAW BRAKE LINE
        this.yL0 = pObj.yL0
        this.xL00 = pObj.xL0
        this.yL00 = pObj.yL0
        this.y261 = pObj.y261 //DRAW 261% LEVEL
        this.y2611 = pObj.y261
        this.y161 = pObj.y161  //DRAW 161% LEVEL
        this.y1611 = pObj.y161
        this.y138 = pObj.y138  //DRAW 138% LEVEL
        this.y1388 = pObj.y138
        this.p100 = pObj.p100
        this.p138 = pObj.p138
        this.p161 = pObj.p161
        this.p261 = pObj.p261
        this.P1   = pObj.P1

        try{
            this.draw = function () {
                    ctx.beginPath()
                    ctx.strokeStyle = 'blue'
                    ctx.lineWidth = 2
                    ctx.moveTo(this.xN, this.yN)
                    ctx.lineTo(this.x0, this.y0)
                    ctx.lineTo(this.x1, this.y1)
                    ctx.lineTo(this.x2, this.y2)
                    ctx.lineTo(this.x3, this.y3)
                    ctx.lineTo(this.x4, this.y4)
                    ctx.lineTo(this.x5, this.y5)
                    ctx.stroke();
                    ctx.beginPath()                 /// DRAW BRAKE LINE
                    ctx.strokeStyle = 'green'
                    ctx.lineWidth = 1
                    ctx.moveTo(this.xL0, this.yL0)
                    ctx.lineTo(this.xN, this.yL0)
                    ctx.stroke()
                    ctx.beginPath()                 /// DRAW 261 LINE
                    ctx.strokeStyle = 'red'
                    ctx.lineWidth = 1
                    ctx.moveTo(this.xL0, this.y261)
                    ctx.lineTo(this.xN, this.y261)
                    ctx.stroke()
                    ctx.beginPath()                 /// DRAW 161 LINE
                    ctx.strokeStyle = 'violet'
                    ctx.lineWidth = 1
                    ctx.moveTo(this.xL0, this.y161)
                    ctx.lineTo(this.xN, this.y161)
                    ctx.stroke()
                    ctx.beginPath()                 /// DRAW 138 LINE
                    ctx.strokeStyle = 'orange'
                    ctx.lineWidth = 1
                    ctx.moveTo(this.xL0, this.y138)
                    ctx.lineTo(this.xN, this.y138)
                    ctx.stroke()

                    ctx.beginPath()                 /// DRAW P1 (SL) LINE
                    ctx.strokeStyle = 'blue'
                    ctx.lineWidth = 1
                    ctx.moveTo(this.x1, this.y1)
                    ctx.lineTo(this.xN, this.y1)
                    ctx.stroke()
                    /*
                    ctx.font = `18px bold mono`;
                    ctx.fillStyle = 'black';
                    ctx.fillText(`Ticker: ${this.sym} - ${this.tf}`, 10, 20);
                    ctx.fillStyle = 'brown';
                    ctx.fillText(`Rank: ${this.cap['rank']}`, 10, 40)
                    ctx.fillStyle = 'blue';
                    ctx.fillText(`Cap: ${this.cap['marketCap']}`, 10, 60)
                    ctx.fillStyle = 'green';
                    ctx.fillText(`Supply: ${this.cap['circulation']}%`, 10, 80)
                    ctx.fillStyle = 'red';
                    ctx.fillText(`Infinite: ${this.cap['infinite']}`, 10, 100)
                    ctx.fillStyle = 'violet';
                    ctx.fillText(`FDMC: ${this.cap['fdmc']}`, 10, 120)
                    */
                  
            };
            this.priceDraw = function(){
               
                    ctx.beginPath()
                    ctx.strokeStyle = 'black'
                    ctx.lineWidth = 1
                    ctx.moveTo(canvas.width - 70, 0)
                    ctx.lineTo(canvas.width - 70, canvas.height)
                    ctx.stroke()

                    ctx.font = `14px bold mono`;
                    ctx.fillStyle = 'green';
                    ctx.fillText(`${this.p100}`, canvas.width - 60, this.yL0);
                    ctx.fillStyle = 'orange';
                    ctx.fillText(`${this.p138}`, canvas.width - 60, this.y138)
                    ctx.fillStyle = 'violet';
                    ctx.fillText(`${this.p161}`, canvas.width - 60, this.y161)
                    ctx.fillStyle = 'red';
                    ctx.fillText(`${this.p261}`, canvas.width - 60, this.y261)
                    ctx.fillStyle = 'blue';
                    ctx.fillText(`${this.P1}`, canvas.width - 60, this.y1)
            }
            this.targetLineDraw = function(){
                ctx.beginPath()                 /// DRAW GOAL LINE
                    ctx.strokeStyle = pObj.goal === 'S' ? 'red' : 'green'
                    ctx.lineWidth = 2
                    ctx.moveTo(this.xN, this.yN)
                    ctx.lineTo(pObj.xT, pObj.yT)
                    ctx.stroke()
            }
        } catch(e){
            console.log(e)
        }
            this.resize = function(x0,x1,x2,x3,x4,x5,xN,xL0){
                this.x0 = x0
                this.x1 = x1
                this.x2 = x2
                this.x3 = x3
                this.x4 = x4
                this.x5 = x5
                this.xN = xN
                this.xL0 = xL0
                this.x00 = x0
                this.x11 = x1
                this.x22 = x2
                this.x33 = x3
                this.x44 = x4
                this.x55 = x5
                this.xNN = xN
                this.xL00 = xL0
                this.draw()
        }
            this.drag = function (dragObj) { 
                this.xN = dragObj.xN
                this.x0 = dragObj.x0
                this.x1 = dragObj.x1
                this.x2 = dragObj.x2
                this.x3 = dragObj.x3
                this.x4 = dragObj.x4
                this.x5 = dragObj.x5
                this.xL0= dragObj.xL0
                this.yN = dragObj.yN
                this.y0 = dragObj.y0
                this.y1 = dragObj.y1
                this.y2 = dragObj.y2
                this.y3 = dragObj.y3
                this.y4 = dragObj.y4
                this.y5 = dragObj.y5
                this.yL0= dragObj.yL0
                this.y261 = dragObj.y261
                this.y161 = dragObj.y161
                this.y138 = dragObj.y138
                this.draw();
                
            };

    }
}
export default PatternChart