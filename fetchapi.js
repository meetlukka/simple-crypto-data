<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
function fetchData(){

var response = axios({
  method: 'get',
  url: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
  headers: {
      X-CMC_PRO_API_KEY:'90008643-8ea8-4d30-bf6d-e3cfaec56f1a',
      Accept:'application/json',
  }, 
  data: {
    start:'1',
    limit:'5000',
    convert:'USD'
  }
});
    console.log(response)
}

fetchData();