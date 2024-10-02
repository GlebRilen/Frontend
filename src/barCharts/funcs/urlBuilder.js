export const tfBuilder = function(exName, tfIter){
    let timeFrame = 240
        if(exName === 'BINANCE_SPOT')    timeFrame = ['1d', '4h', '1h', '30m','15m', '5m', '1m']    
        if(exName === 'BINANCE_FUTURES')    timeFrame = ['1d', '4h', '1h', '30m','15m', '5m', '1m']
        if(exName === 'BYBIT_SPOT')      timeFrame = ['D',   240,   60, 30, 15, 5, 1 ]
        if(exName === 'OKX_SPOT')        timeFrame = ['1Dutc', '4H', '1H', '30m', '15m', '5m', '1m']
        if(exName === 'GATEIO_SPOT')     timeFrame = ['1d', '4h', '1h', '30m', '15m', '5m', '1m']
        let tf = timeFrame[tfIter]
        // console.log(exName, tf)
        return tf
}

export const timeIntervalBuilder = function(tf){
    let timeInterval = 0
    if(tf === 1  || tf === '1m') timeInterval = 1
    if(tf === 5  || tf === '5m' ) timeInterval = 5
    if(tf === 15 || tf === '15m') timeInterval = 15
    if(tf === 30 || tf === '30m') timeInterval = 30
    if(tf === 60 || tf === '1h' || tf === '1H' || tf === '60m') timeInterval = 60
    if(tf === 240 || tf === '4h' || tf === '4H' || tf === '240m') timeInterval = 240
    if(tf === 'D' || tf === '1d' || tf === '1Dutc') timeInterval = 1440
    return timeInterval
} 

export const urlBuilder = function(cList, tfIter, exName) {
    let tf = tfBuilder(exName, tfIter)
    let timeEnd = new Date().getTime()
    let url = ''
    if(exName === 'BINANCE_SPOT') url = `https://api.binance.com/api/v1/klines?symbol=${cList}&interval=${tf}&limit=200`  //Binance Spot
    if(exName === 'BINANCE_FUTURES') url = `https://fapi.binance.com/fapi/v1/klines?symbol=${cList}&interval=${tf}&limit=200`  //Binance futures
    if(exName === 'BYBIT_SPOT') url = `https://api.bybit.com/v5/market/kline?symbol=${cList}&interval=${tf}&limit=300`
    // if(exName === 'OKX_SPOT')   url = `https://www.okx.com/api/v5/market/mark-price-candles?instId=${cList}&bar=${tf}&limit=200`
    if(exName === 'OKX_SPOT')   url = `https://www.okx.com/api/v5/market/candles?instId=${cList}&bar=${tf}&limit=300`
    if(exName === 'GATEIO_SPOT') url = `https://api.gateio.ws/api/v4/spot/candlesticks?currency_pair=${cList}&interval=${tf}`
    
return url
}