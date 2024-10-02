export const fetchOKX = async function(){
    let arrOKX = []
    await fetch('https://www.okx.com/priapi/v5/public/config?instType=SPOT')
    
    .then(re => re.json())
    .then(res => {
        console.log(res)
        let arr = res.data[0].idxCcyConfig
        arr.forEach(e => {
            if(e['ccyName'] === 'USDT')   arrOKX.push(e['referId'])          
        });
    }).finally( () => {
        arrOKX.sort()
        console.log(arrOKX)
    })
    return arrOKX
}