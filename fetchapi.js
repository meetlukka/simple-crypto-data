

var itemIdArray = []; 
var itemIdString="";
var itemNameArray = [];
var itemMarketCap = [];
var itemPercentChange = [];
var itemImageURL = [];
var dataLength = 0;
var originalData;

async function fetchData(){
    console.log("fetch call")

var apiToken = "90008643-8ea8-4d30-bf6d-e3cfaec56f1a";

// for name,     
const res = await fetch(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=10&convert=USD&CMC_PRO_API_KEY=${apiToken}`)
.then((res)=>{
    return res.json();
})
.then((data)=>{
    // console.log(data)
    originalData = data.data;
    dataLength = originalData.length;
    
    for (var i = 0;i<dataLength;i++){
      //  console.log(originalData[i].name)
      //  console.log(originalData[i].id)
      itemNameArray.push(originalData[i].name)
      itemIdArray.push(originalData[i].id);
      itemMarketCap.push(originalData[i].quote.USD.market_cap)
      itemPercentChange.push(originalData[i].quote.USD.percent_change_24h)
    }
    console.log(itemNameArray)
    console.log(itemIdArray)
    itemIdString = itemIdArray.join()
    console.log(itemIdString)
    console.log(itemMarketCap)
    console.log(itemPercentChange)
})
.then(()=>{
    fetch(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?id=${itemIdString}&CMC_PRO_API_KEY=${apiToken}`)
    .then((res)=>{
        return res.json();
    })
    .then((secondData)=>{
        // console.log(secondData)
        var originalSecondData = secondData.data;
        for (var i = 0;i<dataLength;i++){
            var tempItemId = originalData[i].id;
            // console.log(originalData[i].id,originalSecondData[tempItemId].logo)
            itemImageURL.push(originalSecondData[tempItemId].logo)
        }
        console.log(itemImageURL)
    })
   
})
.then(()=>{
    setTimeout(() => {
        executeNow();
    }, 1000);
    
})
    
}

 fetchData();
 function executeNow(){
console.log("ew")
console.log(itemNameArray)
console.log("len",dataLength)
for(var item = 0;item<dataLength;item++){
    
    var listElement = document.querySelectorAll(".all-item-list")[0];

    var listItemDivElement = document.createElement("div");
    var mainDivElement = document.createElement("div");
    var imgElement = document.createElement("img");
    var nameElement = document.createElement("p");
    var heartElement = document.createElement("a");

    var hiddenDivElement = document.createElement("div");
    var marketCapElement = document.createElement("p");
    var rateChangeElement = document.createElement("p");

    listItemDivElement.className = "individual-list-item";
    mainDivElement.className = "list-container";
    nameElement.innerText = `${itemNameArray[item]}`
    nameElement.className = "item-name"
    imgElement.src = `${itemImageURL[item]}`
    heartElement.innerText = "❤"
    heartElement.href = "#"
    
    heartElement.className = "heart-icon";
    heartElement.classList.add("not-favorite");
    hiddenDivElement.className = "hidden-container";
    marketCapElement.innerText = `MarketCap: ${itemMarketCap[item]}`;
    marketCapElement.className = "additional-info"
    rateChangeElement.innerText = `24 Hrs Price Change: ${itemPercentChange[item]}`
    rateChangeElement.className = "additional-info"

    if(itemPercentChange[item]<0){
        rateChangeElement.style.cssText="color:red"
    }
    else if(itemPercentChange[item]>0){
        rateChangeElement.style.cssText="color:mediumseagreen"
    }
    
    mainDivElement.appendChild(imgElement);
    mainDivElement.appendChild(nameElement);
    mainDivElement.appendChild(heartElement);
    hiddenDivElement.appendChild(marketCapElement);
    hiddenDivElement.appendChild(rateChangeElement);

    listItemDivElement.appendChild(mainDivElement);
    listItemDivElement.appendChild(hiddenDivElement);

    listElement.appendChild(listItemDivElement);
}

$('.list-container').click(function() {
  $('.hidden-container').not($(this).next()).hide();
  $(this).next('.hidden-container').toggle(50);
});
 }

 for(var favItem = 0;favItem<dataLength;favItem++){
    document.querySelectorAll(".heart-icon")[favItem].addEventListener("click",function(e){
        
    })
 }