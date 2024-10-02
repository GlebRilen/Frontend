import { PORT } from "./mongoFetch/PORT.js";

let canvas = document.getElementById('canv')
let ctx = canvas.getContext('2d')
export const screenShot = async function(cap, ticker, tf, exName, ob, goal) {
        let answer = null
        let canvasUrl = canvas.toDataURL();
        console.log(canvasUrl)
       let pic = {
        'pic' : canvasUrl,
        'ticker' : ticker,
        'tf' : tf,
        'circCap' : cap['marketCap'],
        'percent' : cap['circulation'],
        'exName'  : exName,
        'ob' : ob,
        'goal' : goal,
        action : 'sendPic'
       }
        let url = `http://localhost:${PORT}/api/v1/crypto/tgpost`
        await fetch(url, {
         
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          body : JSON.stringify(pic), // body data type must match "Content-Type" header
          headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json',
          },
        }).then(re => re.json())
        .then(res => {
          answer = res
          console.log(res)    
        })
        return answer
  };