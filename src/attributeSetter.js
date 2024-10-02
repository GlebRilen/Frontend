const setter = {
// import priceReducer from './priceReducer';
attributeSet : function(elem, xVal, yVal, widthVal, heightVal, timeValue, classVal, priceLevelVal, deltaChartVal, deltaPriceVal, deltatimeVal){
   if(xVal !== null) elem.setAttribute('x', `${xVal}`)  //2
   if(yVal !== null) elem.setAttribute('y', `${yVal}`)  //3
   if(widthVal !== null) elem.setAttribute('width', `${widthVal}`)       //4
   if(heightVal !== null) elem.setAttribute('height', `${heightVal}`)    //5
   if(timeValue !== null) elem.setAttribute('timestamp', `${timeValue}`) //6      
   if(classVal !== null) elem.setAttribute('class',`${classVal}`)                //7
   if(priceLevelVal !== null) elem.setAttribute('pricelevel', `${priceLevelVal}`)//8
   if(deltaChartVal !== null) elem.setAttribute('deltachart', `${deltaChartVal}`)//9
   if(deltaPriceVal !== null) elem.setAttribute('deltaprice', `${deltaPriceVal}`)//10
   if(deltatimeVal !== null) elem.setAttribute('deltatime', `${deltatimeVal}`)   //11
},
styleSet : function( elem, opaD, colourD, opacityColorD){
    elem.setAttribute('style', `fill:${colourD};stroke:${opacityColorD};stroke-width:1; stroke-opacity:0.3; fill-opacity:${opaD} ;rx:0.5%`)
},
priceRed : function(delta){ 
    let dtD = delta
    let dtrD = Math.abs(dtD)
    let socrD = 0
    
    if (dtrD >  0             && dtrD < 10) socrD = dtrD.toFixed(2)
    if (dtrD >= 10            && dtrD < 100) socrD = dtrD.toFixed(1)
    if (dtrD >= 100           && dtrD < 1000) socrD = Math.round(dtrD)
    
    if (dtrD >= 1000          && dtrD < 10000) socrD = ((dtrD/1000).toFixed(2)) + 'K'
    if (dtrD >= 10000         && dtrD < 100000) socrD = ((dtrD/1000).toFixed(1)) + 'K'
    if (dtrD >= 100000        && dtrD < 1000000) socrD = (Math.round(dtrD/1000)) + 'K'
    
    if (dtrD >= 1000000       && dtrD < 10000000) socrD = (dtrD/1000000).toFixed(2) + 'M'
    if (dtrD >= 10000000      && dtrD < 100000000) socrD = ((dtrD/1000000).toFixed(1)) + 'M'
    if (dtrD >= 100000000     && dtrD < 1000000000) socrD = (Math.round(dtrD/1000000)) + 'M'
    
    if (dtrD >= 1000000000    && dtrD < 10000000000) socrD = (dtrD/1000000000).toFixed(2) + 'B'
    if (dtrD >= 10000000000   && dtrD < 100000000000) socrD = (dtrD/1000000000).toFixed(1) + 'B'
    if (dtrD >= 100000000000  && dtrD < 1000000000000) socrD = Math.round(dtrD/1000000000) + 'B'

    if (dtrD >= 1000000000000    && dtrD < 10000000000000) socrD = (dtrD/1000000000000).toFixed(2) + 'T'
    if (dtrD >= 10000000000000   && dtrD < 100000000000000) socrD = (dtrD/1000000000000).toFixed(1) + 'T'
    if (dtrD >= 100000000000000  && dtrD < 1000000000000000) socrD = Math.round(dtrD/1000000000000) + 'T'
    
    if (dtD >= 0) socrD = socrD
    if (dtD < 0 ) socrD = `-` + socrD
    return socrD   
}
}
export const attributeSetter = setter.attributeSet
export const styleSetter = setter.styleSet
export const priceReducer = setter.priceRed