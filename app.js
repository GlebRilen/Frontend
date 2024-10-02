import { proverka161 } from './src/barCharts/barChartsFront161.js'
import { coinMarket } from './src/barCharts/coinMarket.js'
import { mongoFetchAllFront } from './src/barCharts/funcs/mongoFetch/mongoFetchAllFront.js'
import { fetchBINANCE } from './src/barCharts/funcs/spotFetch/fetchBINANCE.js'
import { fetchBYBIT } from './src/barCharts/funcs/spotFetch/fetchBYBIT.js'
import { fetchOKX } from './src/barCharts/funcs/spotFetch/fetchOKX.js'

document.getElementById('fetch').addEventListener('click', proverka161)
document.getElementById('mongoose').addEventListener('click', coinMarket)

// document.getElementById('fetch').addEventListener('click', fetchBINANCE)
