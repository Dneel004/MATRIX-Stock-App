var yahooFinance = require('yahoo-finance');

///////////////////
// Event Listners
///////////////////
//var animation = new EventEmitter();
//start animation

//continue here.......................................................

///////////////////
// Get Stock Info
//////////////////
//Initializing all variables
var name = "";
var symbol = "";
var currentStockPrice = 0.0;
var changeInPercent = changeInPercent;
var dividendYield = 0.0;
var dividendPerShare = 0.0;

function getStockData(name, symbol, currentStockPrice, changeInPercent, dividendYield, dividendPerShare){
   yahooFinance.snapshot({
     symbol: "AAPL",
     fields: ['s','n','l1', 'p2','y', 'd' ]
   }, function(err, data){
      if(err)
        console.log(err);
      console.log(data);
      console.log(data.name);
      // setting all the variables
      var name = data.name;
      var symbol = data.symbol;
      var currentStockPrice = data.lastTradePriceOnly;
      var changeInPercent = data.changeInPercent;
      var dividendYield = data.dividendYield;
      var dividendPerShare = data.dividendPerShare;

   });
};
//test getting data
console.log(getStockData(name, symbol, currentStockPrice, changeInPercent, dividendYield, dividendPerShare));

// turns on led % change
function runPercentChange(){
  var percentLevel = changeInPercent;
  var position = 150
  var increase = Math.PI / 180;

  setInterval(function(){
    //positive percentChange
    if(changeInPercent > 0.0){
          var showChange = {
            arc: 30 + percentLevel,
            start: position - percentLevel,
            color: green,
          };
          matrix.led(showChange).render();
    }
    // negative percentChange
    else if(changeInPercent < 0.0){
          var showChange = {
            arc: 30 + percentLevel,
            start: position - percentLevel,
            color: green,
          };
          matrix.led(showChange).render();
    }
    // no percentChange
    else
        matrix.led("yellow").render();
  },5000);

}
