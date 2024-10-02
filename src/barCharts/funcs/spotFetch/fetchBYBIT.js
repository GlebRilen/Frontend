export const fetchBYBIT = async function(){
    let arrBYBIT = []
    await fetch('https://api.bybit.com/v5/market/tickers?category=spot')
    // 'https://api2.bybit.com/spot/api/basic/symbol_list'
    .then(re => re.json())
    .then(res => {
        console.log(res)


        let arr = res.result.list
        arr.forEach(e => {
            let ex = e.symbol.indexOf('USDT')
            if(ex !== -1 ) arrBYBIT.push(e.symbol)  
        });
    }).finally( () => {
        arrBYBIT.sort()
        console.log(arrBYBIT)
    })
    return arrBYBIT
}