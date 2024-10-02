export const fetchBINANCEfutures = async function(){
    let arrBINANCEfutures = []
    await fetch('https://testnet.binancefuture.com/fapi/v1/ticker/price')
    .then(re => re.json())
    .then(res => {
        console.log(res)
        res.forEach(e => arrBINANCEfutures.push(e.symbol));
    }).finally( () => {
        arrBINANCEfutures.sort()
        console.log(arrBINANCEfutures)
    })
    return arrBINANCEfutures
}