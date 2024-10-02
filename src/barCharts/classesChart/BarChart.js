let canvas = document.getElementById('canv')
let ctx = canvas.getContext('2d')
const barChart = class Bar {
    constructor(x, y, w, h, wx, wy, wh, idx, c, v) {
            this.x   = x;   //X real Rect
            this.xx  = x;   //X static Rect
            this.xd  = 0;   //X deviation
            this.y   = y;   //Y real Rect
            this.yy  = y;   //Y static Rect
            this.w   = w;   //Width
            this.wd  = 0    //Width deviation
            this.h   = h;   //Hight
            this.wx  = wx;   //X static Rect
            this.wxx = wx;   //X static Rect
            this.wy  = wy;   //Y real Rect
            this.wyy = wy;   //Y real Rect
            this.wh  = wh
            this.idx = idx   //Bar index in array
            this.c   = c     //Color of the bar candle
            this.v   = v     //Volume
            this.draw = function () {
                // if(this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                //     ctx.clearRect(this.x, this.y, this.w, this.h)
                //     return
                // }   
                ctx.beginPath();
                ctx.fillStyle = `black`;
                ctx.fillRect(this.wx, this.wy, 1, this.wh);
                ctx.stroke();
                if(this.c === 'white') {
                        ctx.beginPath();
                        ctx.strokeStyle = 'black'
                        ctx.lineWidth = 1
                        ctx.strokeRect(this.x, this.y, this.w, this.h)
                        ctx.stroke();
                        ctx.beginPath();
                        ctx.fillStyle = 'white';
                        ctx.fillRect(this.x, this.y, this.w, this.h);
                        ctx.stroke();
                        ctx.beginPath();
                        ctx.strokeStyle = 'green'
                        ctx.lineWidth = 0
                        ctx.strokeRect(this.x, 768 - this.v, this.w, this.v)
                        ctx.stroke();
                }
                if(this.c === 'black') {
                        ctx.beginPath();
                        ctx.strokeStyle = 'black'
                        ctx.lineWidth = 1
                        ctx.strokeRect(this.x, this.y, this.w, this.h)
                        ctx.stroke();
                        ctx.beginPath();
                        ctx.fillStyle = 'black';
                        ctx.fillRect(this.x, this.y, this.w, this.h);
                        ctx.stroke();
                        ctx.beginPath();
                        ctx.strokeStyle = 'red'
                        ctx.lineWidth = 0
                        ctx.strokeRect(this.x, 768 - this.v, this.w, this.v)
                        ctx.stroke();
                }

            };
            this.resize = function(x, xd, w, wd, wx){
                    this.x   = x
                    this.xd  = xd
                    this.w   = w
                    this.wd  = wd
                    this.wx  = wx
                    this.xx  = x
                    this.wxx = wx
                    this.draw();
               
            }
            this.drag = function (x, y, wx, wy) {
                    this.x  = x;
                    this.y  = y;
                    this.wx = wx;
                    this.wy = wy;
                    this.draw();
            };
    }
}
export default barChart