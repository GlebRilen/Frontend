import { PORT } from './PORT.js';
export const mongoCreateFront = async function(patternData) {
        let url = `http://localhost:${PORT}/api/v1/crypto/mongoCreateBack`
        const response = await fetch(url, {
         
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          body : JSON.stringify(patternData), // body data type must match "Content-Type" header
          headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json',
          },
        }).then(re => re.json())
        .then(res => {
          // console.log(res)    
        })
  };