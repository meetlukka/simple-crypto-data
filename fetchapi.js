
function fetchData(){
    console.log("fetch call")

    
fetch("https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=10&convert=USD&CMC_PRO_API_KEY=90008643-8ea8-4d30-bf6d-e3cfaec56f1a")
.then((res)=>{
    return res.json();
})
.then((data)=>{
    console.log(data)
})


// fetch("https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/lateststart=1&limit=5000&convert=USD", {
// //   body: "start=1&limit=5000&convert=USD",
//   headers: {
//     Accept: "application/json",
//     // "Content-Type": "application/x-www-form-urlencoded",
//     "X-Cmc_pro_api_key": "b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c",
//     'Access-Control-Allow-Origin':  'http://127.0.0.1',
//     'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
//     // 'Access-Control-Allow-Credentials' : 'true',
//     'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept'
//   },
// //   mode: "no-cors",
// //   method: "GET"
// }).then(response=>{
//     console.log(response)
// })

   
}

fetchData();