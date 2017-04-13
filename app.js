

///////////////////
// Get Stock Info
//////////////////
//Initializing all variables
var stocks = {};
var stockName = "";
var symbol = "";
var currentStockPrice = 0.0;
var changeInPrice = 0.0;
var changeInPercent = 0.0;
var stockSymbol = "AAPL";


///////////////////////
// Get the stock symbol
///////////////////////

matrix.on('stockInput', function(input){
        console.log(input);
        var stockInput = input.value.toUpperCase();
        stockSymbol = stockInput;
        console.log(input.value, input);
        changeInPercent = 0.0;//reset for new stock data
        getYahooData(stockSymbol, function(){
          runPercentChange();
        });


});
var loadingLoop;
function loading(){
  var counter = 0;
  var increase = Math.PI / 180;

  loadingLoop = setInterval(function(){

    var stockBar = {
    			arc: 60,
    			color: 'rgba(0,0,230,1)',
    			start: counter,
    			blend: false
    		};

        counter += 5;
        if(counter >= 360){
          counter = 0;
        }

        matrix.led(stockBar).render();
  }, 60);
}

//Get all variables
var https = require('https');
function getYahooData(stockSymbol, callback){
  var dataLoop = https.get('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quote%20where%20symbol%20in%20(%22'+stockSymbol+'%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=', function(response){
    response.on('data', function(data){
      try{
        stocks = JSON.parse(data);
        stockName = stocks.query.results.quote.Name;
        symbol = stocks.query.results.quote.symbol;
        currentStockPrice = stocks.query.results.quote.LastTradePriceOnly;
        changeInPrice = stocks.query.results.quote.Change;
        changeInPercent = (changeInPrice / currentStockPrice) * 100;
        changeInPercent = changeInPercent.toFixed(2);
        matrix.type('stockInfo').send({
          'stockName': stockName
        });
        matrix.type('stockInfo2').send({
          'currentStockPrice': currentStockPrice
        });
        matrix.type('stockInfo4').send({
          'changeInPrice': changeInPrice
        });
        matrix.type('stockInfo3').send({
          'changeInPercent': changeInPercent + "%"
        });
        console.log(stockName, symbol, currentStockPrice, changeInPrice, changeInPercent);
      }catch(error){
        console.log(error+"\n COULD NOT LOAD DATA!");
      }
    });
  });
  callback();
}

function runPercentChange(){
    if(changeInPercent > 0.0){
        matrix.led('green').render();
    }
    // negative percentChange
    else if(changeInPercent < 0.0){
        matrix.led('red').render();
    }
    else if(changeInPercent == "null"){
      if(changeInPrice > 0.0){
          matrix.led('green').render();
      }
      // negative percentChange
      else if(changeInPrice < 0){
          matrix.led('red').render();
      }
      else {
          matrix.led('yellow').render();
      }

    }
    else if(changeInPrice === 0){
        matrix.led('yellow').render();
    }
    // no percentChange
    else{
      loading();
    }
}


//gets data every X amount of seconds and runs the percentchange method
getYahooData(stockSymbol, function(){
    runPercentChange();
  });
  setInterval(function(){
    getYahooData(stockSymbol, function(){
      clearInterval(loadingLoop);
      runPercentChange();
    });
  },10000);
