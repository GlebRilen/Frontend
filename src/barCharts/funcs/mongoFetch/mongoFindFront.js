import { PORT } from "./PORT.js"

export const mongoFindFront = async function(obj) {
    let ex = obj.EX
    let ticker = obj.ticker
    let tf = obj.timeFrame
    let top = obj.top
    let resArray = []
    let url = `http://localhost:${PORT}/api/v1/crypto/mongoFindBack?ticker=${ticker}&ex=${ex}&tf=${tf}&top=${top}`
    await fetch(url)
            .then(re => re.json())
            .then(res => {
                resArray = res
                console.log(res)
            })
    return resArray
};