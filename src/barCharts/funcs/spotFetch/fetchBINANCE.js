export const fetchBINANCE = async function(){
    let arrBINANCE = []
    await fetch('https://api.binance.com/api/v3/exchangeInfo')
    .then(re => re.json())
    .then(res => {
        console.log(res)


        let arr = res.symbols
        arr.forEach(e => {
            let ex = e.quoteAsset
            if(ex === 'USDT' ) arrBINANCE.push(e.symbol)  
        });
    }).finally( () => {
        arrBINANCE.sort()
        console.log(arrBINANCE)
    })
    return arrBINANCE
}