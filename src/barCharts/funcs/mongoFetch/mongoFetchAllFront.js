import { PORT } from "./PORT.js"

export const mongoFetchAllFront = async function() {
    let resArray = []
    let url = `http://localhost:${PORT}/api/v1/crypto/mongoFetchAllBack`
    await fetch(url)
            .then(re => re.json())
            .then(res => {
                resArray = res
                console.log(res)
            })
    return resArray
};