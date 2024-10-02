const tgSend = async function(ticker, tf){
            let url = `http://localhost:5000/api/v1/crypto/tg?ticker=${ticker}&tf=${tf}`
            await fetch(url)
}
export default tgSend