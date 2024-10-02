import { drawFunc } from "../drawChart.js";
import { mongoUpdateFront } from "./mongoFetch/mongoUpdateFront.js";
import { telegram } from "./objectBuilder.js";

// const shiftFunc = function(pattern, idxShift, arr){
//     let pat = pattern
//     pat.P0I = pattern.P0I - idxShift
//     pat.P1I = pattern.P1I - idxShift
//     pat.P2I = pattern.P2I - idxShift
//     pat.P3I = pattern.P3I - idxShift
//     pat.P4I = pattern.P4I - idxShift
//     pat.P5I = pattern.P5I - idxShift
//     pat.PNI = pattern.PNI - idxShift
//     pat.PTI = arr.length - 1
//     return pat
// }

const objectRebuild = async function(arr, P5I, el, t, goal, typeOfGoal, coin){
    console.log( arr, P5I, el, t, goal, typeOfGoal, coin )
    const patternOnlyArr = function(arr, P5I, t){
        // arr, P5I, el, t
        let newArrBalun = []
        for(let i = P5I; i <= t; i++) newArrBalun.push(arr[i])
        console.log(newArrBalun)
        return newArrBalun
    }

    const timeDeterm = function(newArrBalun, el){ //retun updated pattern props of the obj
        let newPat = el.pattern
        let pat = el.pattern
        newArrBalun.forEach((e, i) => {
            if(pat.P0T == e[0]) newPat.P0I = i
            if(pat.P1T == e[0]) newPat.P1I = i
            if(pat.P2T == e[0]) newPat.P2I = i
            if(pat.P3T == e[0]) newPat.P3I = i
            if(pat.P4T == e[0]) newPat.P4I = i
            if(pat.P5T == e[0]) newPat.P5I = i
            if(pat.PNT == e[0]) newPat.PNI = i
            
            newPat.PTI = newArrBalun.length - 1
        })
        return newPat
    }

    let ifP5Iexist = false
    arr.forEach(e => {
        if(el.pattern.P5T == e[0]) ifP5Iexist = true
    })
    console.log(ifP5Iexist, el.pattern.P5T)
    // if(ifP5Iexist === false) return
    console.log(arr, P5I, t)
    let newArrBalun = patternOnlyArr(arr, P5I, t)
    let reindex = timeDeterm(newArrBalun, el)
    let ob = el
        ob.array = newArrBalun
        ob.pattern = reindex
        ob.coin = coin
        console.log(newArrBalun, ob.array)
        if(typeOfGoal === 'cancell') ob.data.cancell = true
        if(typeOfGoal === '138') ob.data.target138 = true
        if(typeOfGoal === '261') {
            ob.data.target138 = true
            ob.data.target261 = true
        }
        if(typeOfGoal === 'SL') ob.data.SL = true
console.log('trying to send to telegram')
console.log(ob)
let tgAnswer = await telegram(ob, goal)
console.log('telegram function working')
//////////////

console.log('trying to mongoUpdateFront')
    await mongoUpdateFront(ob)
    console.log('mongo successfully updated')

}

export const checkPatternComplete = async function(fetchBuil, el, coin){
    // try{
        let arr = fetchBuil.balun
        let T1  = el.pattern['PAP'] //Target 138 price
        let T2  = el.pattern['PCP'] //Target 261 price
        let SL  = el.pattern['P1P'] //P1
        let time = el.patternFindTime //Milliseconds when 
        let idx  = 0  //Index of bar when pattern has been found
        let stage = el.stage  //Type of pattern: 100 - pattern not confirmed, 161 - confirmed
        let idxShift = 0
        let checkIdx = false
        arr.forEach((e, i) => {
            if(e[0] == time) {
                idx = i
                idxShift = arr.length - 1 - idx
                checkIdx = true
            }
        });
        if(checkIdx === false) return
        let P5I = el.pattern.P5I - idxShift
        console.log(stage, P5I, arr)
    if(stage === 100 && P5I >= 0) {
        for(let t = idx; t < arr.length; t++){
            if(arr[t][2] > el.data.top) el.data.confirm = true //Checking - was pattern confirmed by passing break line or not. If pass break line - then SL; if not - then cancell order.
            if(arr[t][3] < SL) {
                if(el.data.confirm === true){
                    console.log('objectRebuild for SL started')
                    await objectRebuild(arr, P5I, el, t, 'S', 'SL', coin) //(1. Full array of new data, 2. P5I in full array, 3. hole obj element, 4. index of bar where goal is reached, 5. is it SL to draw or TP, 6. type of goal (cancell, 138, 261, SL), 7. ticker of token for telegram func)
                    return
                }
                if(el.data.confirm === false){
                    console.log('objectRebuild for SL started')
                    await objectRebuild(arr, P5I, el, t, 'S', 'cancell', coin) //(1. Full array of new data, 2. P5I in full array, 3. hole obj element, 4. index of bar where goal is reached, 5. is it SL to draw or TP, 6. type of goal (cancell, 138, 261, SL), 7. ticker of token for telegram func)
                    return
                }

            }
            
            if(arr[t][2] >= T1){
                if(arr[t][2] >= T2){
                    console.log('objectrebuild for T2 started')
                    await objectRebuild(arr, P5I, el, t, 'T', '261', coin)
                    return
                }
                console.log('obj rebuild for 138 started')
                await objectRebuild(arr, P5I, el, t, 'T', '138', coin)
                return
            }
        }
    }
    if(stage === 161 && P5I >= 0) {
        for(let t = idx; t < arr.length; t++){
            if(arr[t][3] < SL) {
                console.log('objrebuild for 161 SL started')
                await objectRebuild(arr, P5I, el, t, 'S', 'SL', coin) //(Full array of new data, P5I in full array, hole obj element, index of bar where goal is reached, is it SL to draw or TP, type of goal (cancell, 138, 261, SL), ticker of tockern for telegram func)
                return
            }            
            if(arr[t][2] >= T2){
                console.log('objrebuild for 261 started')

                await objectRebuild(arr, P5I, el, t, 'T', '261', coin)
                return
            }   
        }
    }
// } catch(e) {
//     console.log('Something went wrong! Oopsis')
// }

}