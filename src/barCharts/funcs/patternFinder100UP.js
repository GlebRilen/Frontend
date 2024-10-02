export const pattern100UP = function(newFrArrNot, balun, highPrice, lowPrice, cList, exName, timeInterval, closePrice) {

    let objectData = {
        array : null,
        ticker : '',
        EX : '',
        timeFrame: 0,
        top : 0,
        pattern : {}
    }

    const lg10 = function(P2, P3, k){
    let m = Math.pow(10, Math.log10(P2) + (Math.log10(P2) - Math.log10(P3))*k)  //261.8 log (1.618 = k)
    return m
    }
        
for (let r = 0; r < newFrArrNot.length; r++) {  //ZERO INDEX - LATEST FRACTAL || CALCULATE POINT P2 (R)
        let P2 = newFrArrNot[r].max*1 
        let P2idx = newFrArrNot[r].idx    ///P2
        let P2T = balun[P2idx][0]
        
        // if(newFrArrNot[r].dir == 'sell'){
    for (let t = r + 1; t < newFrArrNot.length; t++){    // CALCULATE POINT P4   (T)
                let maxP2P4 = 0
                let minP2P4 = 999999999999999
                let P3idx = null                  ///P3
                let P3T = null
                let P4 = newFrArrNot[t].max*1        
                let P4idx = newFrArrNot[t].idx      ////P4
                let P4T = balun[P4idx][0]
        for(let z = newFrArrNot[t].idx + 1; z < newFrArrNot[r].idx; z++){   //  CALCULATE POINT P3 (Z)
                if(balun[z][highPrice]*1 > maxP2P4) maxP2P4 = balun[z][highPrice]*1
                if(balun[z][lowPrice]*1 < minP2P4) {
                        minP2P4 = balun[z][lowPrice]*1
                        P3idx = z
                        P3T = balun[P3idx][0]
                }
        }
        let P3 = minP2P4
        if(maxP2P4 <= P2 && maxP2P4 <= P4) {
          let range = P2 > P4 ? P2 - P3 : P2 <= P4 ? P4 - P3 : null
          let deviation = P2 > P4 ? (P2 - P4)/range*100 : P2 <= P4 ? (P4 - P2)/range*100 : null
          let topOne = P2 > P4 ? P2 : P2 <= P4 ? P4 : null
          if(deviation < 30 ) {                             
                let P5idx = null              ///P5
                let P5 = null
                let P5T = null
                let P4P5proboi = false
                let P0 = balun[balun.length - 1][closePrice]*1
                let PNP = balun[balun.length - 1][closePrice]*1
                let PNT = balun[balun.length - 1][0]*1
                let P0idx = balun.length - 1                   ///P0
                let P0T = balun[P0idx][0]
                for(let l = newFrArrNot[t].idx*1 - 1; l > 0; l--){  //IF P5 EXIST?
                        if(balun[l][lowPrice]*1 < P3 ){
                                P5 = balun[l][lowPrice]*1
                                P5idx = l
                                P5T = balun[P5idx][0]
                                l = 0
                        }
                }

                for(let m = P5idx + 1; m < newFrArrNot[t].idx; m++){
                        if(balun[m][highPrice]*1 > P4) {
                                P4P5proboi = true
                                m = newFrArrNot[t].idx
                        }
                }
                let P0InTheZone = P0 <= topOne &&  P0 > ((topOne-P3)*0.9 + P3) ? true : false
                let P5exist = P5 !== null && P4P5proboi === false ? true : false

                        /////////////////////////////ENTER POINT///////////////////////////////////////////////////////////
                if(P0InTheZone === true && P5exist === true){    
                        let P1 = 999999999999999                               //P1
                        let P1idx = null
                        let P1T = null
                        let P0P2range = false
                        for(let q = P2idx + 1; q < balun.length - 1; q++){
                                if(balun[q][lowPrice]*1 < P1) {
                                        P1 = balun[q][lowPrice]*1
                                        P1idx = q
                                        P1T = balun[P1idx][0]
                                }
                                if(balun[q][lowPrice]*1 < P3 || balun[q][highPrice]*1 > topOne ) {
                                        P0P2range = true
                                        q = balun.length
                                }
                        }
                                
                                
                        let lastWave = P2 - P3
                        let fibo38 = (P2 - P1)/lastWave
                        let distance = (P0idx - P2idx < P2idx - P4idx) && (P0idx - P2idx) >= 10 ? true : false

                        // console.log(P5 < P3, P1 !== null,  P1 > P3, fibo38 >= 0.382)
                if( P5 < P3 && P1 !== null && P1 > P3 && P0P2range === false && fibo38 >= 0.382 && distance === true) {
                        let PAP   = lg10(P2, P3, 0.382)
                        let PBP   = lg10(P2, P3, 0.618)
                        let PCP   = lg10(P2, P3, 1.618)
                        let PDP   = lg10(P2, P3, 1)
                        let TP    = Math.floor((PCP/topOne - 1)*100)
                        let TP138 = ((PAP/topOne - 1)*100).toFixed(1)*1

                objectData = {
                        array : balun,
                        ticker : cList,
                        EX : exName,
                        timeFrame: timeInterval,
                        patternFindTime: PNT,
                        top : topOne,
                        stage : 100,
                        data : {
                                'confirm' : false,
                                'target138' : false,
                                'target261' : false,
                                'cancell' : false,
                                'SL'    :  false,
                        },
                        TP : TP,  //How much percent till TP, %
                        TP138 : TP138,
                        pattern : {
                                'P0P' : P0,  'P0I' : P0idx, 'P0T' : P0T*1,
                                'P1P' : P1,  'P1I' : P1idx, 'P1T' : P1T*1,
                                'P2P' : P2,  'P2I' : P2idx, 'P2T' : P2T*1,
                                'P3P' : P3,  'P3I' : P3idx, 'P3T' : P3T*1,
                                'P4P' : P4,  'P4I' : P4idx, 'P4T' : P4T*1,
                                'P5P' : P5,  'P5I' : P5idx, 'P5T' : P5T*1,
                                'PNP' : PNP, 'PNI' : P0idx, 'PNT' : PNT*1,
                                'PAP' : PAP, 
                                'PBP' : PBP,
                                'PCP' : PCP,
                                'PDP' : PDP,
                        }
                }
                        r = newFrArrNot.length 
                        t = newFrArrNot.length
                }
                }
          }
        }
                                                
    }
}
return objectData
}                                       
                                                                                
                                                                                
   