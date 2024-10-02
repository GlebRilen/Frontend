
export const fractalSearch = function(balun, highPrice, lowPrice) {
    let fractalArr = []
                balun.forEach((e,x) => {
                        if (x > 0 && x < balun.length - 1){
                                let ah = balun[x][highPrice]*1 
                                let bh = balun[x - 1][highPrice]*1
                                let dh = balun[x + 1][highPrice]*1
                                let obj = { min: balun[x][lowPrice], max: balun[x][highPrice], time: balun[x][0], idx: x }
                                if( ah > bh && ah > dh ) fractalArr.push(obj)        
                        }  
                })
                let newFrArrNot = fractalArr.reverse()
                return newFrArrNot
            
}