

var itemIdArray = []; 
var itemIdString="";
var itemNameArray = [];
var itemMarketCap = [];
var itemPercentChange = [];
var itemImageURL = [];
var dataLength = 0;
var originalData;
var favoriteItemIdArray = [];
var favoriteItemNameArray = [];
var favoriteItemMarketCap = [];
var favoriteItemPercentChange = [];
var favoriteItemIamgeURL = [];


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
    heartElement.id = `${itemIdArray[item]}`
    
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

$('.list-container').click(function(e) {
    if(e.target.classList.contains("heart-icon")){}
    else{
  $('.hidden-container').not($(this).next()).hide();
  $(this).next('.hidden-container').toggle(50);
    }
});
for(var favItem = 0;favItem<dataLength;favItem++){
    console.log("this for executes")
    document.querySelectorAll(".heart-icon")[favItem].addEventListener("click",function(e){
        var targetElement = e.target;
        console.log(targetElement)
        if(targetElement.classList.contains("not-favorite")){
            targetElement.classList.remove("not-favorite");
            targetElement.classList.add("favorite");
            targetElement.style.cssText="color:red"
            favoriteItemIdArray.push(targetElement.id);
        }
        else if(targetElement.classList.contains("favorite")){
            targetElement.classList.remove("favorite");
            targetElement.classList.add("not-favorite");
            targetElement.style.cssText="color:pink"
            var indexOfItem = favoriteItemIdArray.indexOf(targetElement.id);
            if (indexOfItem > -1) {
                favoriteItemIdArray.splice(indexOfItem, 1);
            }
        }
    })
 }

    function executeFavItemList(){
        favoriteItemIdArray = [...new Set(favoriteItemIdArray)];
        // console.log("here here",favoriteItemIdArray)
        var favItemsLength = favoriteItemIdArray.length;
        if(favItemsLength==0){
            
        }
        else if(favItemsLength>0){
            // console.log("hereh length",favItemsLength)
            favoriteItemNameArray = [];
            favoriteItemIamgeURL = [];
            favoriteItemMarketCap = [];
            favoriteItemPercentChange = [];
            for(var item = 0;item<favItemsLength;item++){
                var favTempItemId = parseInt(favoriteItemIdArray[item]);
                console.log("this",itemNameArray)
                console.log(typeof favTempItemId)
                var indexValue = itemIdArray.indexOf(favTempItemId);
                console.log("index",indexValue)
                favoriteItemNameArray.push(itemNameArray[indexValue]);
                favoriteItemIamgeURL.push(itemImageURL[indexValue]);
                favoriteItemMarketCap.push(itemMarketCap[indexValue]);
                favoriteItemPercentChange.push(itemPercentChange[indexValue]);
                
            }
            // console.log(favoriteItemIamgeURL)
            // console.log(favoriteItemIdArray)
            // console.log(favoriteItemMarketCap)
            // console.log(favoriteItemNameArray)
            // console.log(favoriteItemPercentChange)

            for(var item = 0;item<favItemsLength;item++){
                console.log("fresh",favoriteItemNameArray)
                var listElement = document.querySelectorAll(".fav-item-list")[0];

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
    nameElement.innerText = `${favoriteItemNameArray[item]}`
    nameElement.className = "item-name"
    imgElement.src = `${favoriteItemIamgeURL[item]}`
    heartElement.innerText = "❤"
    heartElement.href = "#"
    heartElement.id = `${favoriteItemIdArray[item]}`
    
    heartElement.className = "heart-icon";
    hiddenDivElement.className = "hidden-container";
    marketCapElement.innerText = `MarketCap: ${favoriteItemMarketCap[item]}`;
    marketCapElement.className = "additional-info"
    rateChangeElement.innerText = `24 Hrs Price Change: ${favoriteItemPercentChange[item]}`
    rateChangeElement.className = "additional-info"

    if(favoriteItemPercentChange[item]<0){
        rateChangeElement.style.cssText="color:red"
    }
    else if(favoriteItemPercentChange[item]>0){
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
        }
    }

 document.querySelector(".list-button").addEventListener("click",function(e){
     if(e.target.classList.contains("favItems")){
         document.querySelectorAll(".all-item-list")[0].style.display="none"
         executeFavItemList();

     }
     else if(e.target.classList.contains("allItems")){
         
          document.querySelectorAll(".all-item-list")[0].style.display="block"
     }
})
 
}





