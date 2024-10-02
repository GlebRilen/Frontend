export const fetchBuilder = async function(url, exName, cList) {
    let b = {
        openPrice : Number,
        highPrice : Number,
        lowPrice : Number,
        closePrice : Number,
        balun : null,
        crt : String
    }
    try{
    await fetch(url)
    .then(re => re.json())
    .then(res => {
    //    console.log(res)
       

           if(exName === 'BINANCE_SPOT')   {
               b.openPrice  = 1
               b.highPrice  = 2
               b.lowPrice   = 3
               b.closePrice = 4
               b.balun = res  // Binance Spot
               b.crt = cList.split('USDT')[0]
            }  
            if(exName === 'BINANCE_FUTURES')   {
                b.openPrice  = 1
                b.highPrice  = 2
                b.lowPrice   = 3
                b.closePrice = 4
                b.balun = res  // Binance Spot
                b.crt = cList.split('USDT')[0]
             }  
            if(exName === 'BYBIT_SPOT')      {
                b.openPrice  = 1
                b.highPrice  = 2
                b.lowPrice   = 3
                b.closePrice = 4
                b.balun = res.result.list.reverse() //Bybit
                // balun.reverse()
                b.crt = cList.split('USDT')[0]
            } 
            if(exName === 'OKX_SPOT')   {
                b.openPrice  = 1
                b.highPrice  = 2
                b.lowPrice   = 3
                b.closePrice = 4
                b.balun = res.data.reverse()
                console.log(b.balun)
                // b.balun.reverse()
                b.crt = cList.split('-USDT')[0]
            }
            if(exName === 'GATEIO_SPOT') {
                b.openPrice  = 2
                b.highPrice  = 3
                b.lowPrice   = 4
                b.closePrice = 5
                b.balun = res
                b.crt = cList.split('_usdt')[0]
            }
        //  else if(res == Object) b = 'error'
    })
    } catch(e) {
        console.log( 'Ошибка при получении данных графика')
    }
    return b
}