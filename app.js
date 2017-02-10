var yahooFinance = require('yahoo-finance');

///////////////////
// Event Listners
///////////////////
var animation = new EventEmitter();
//start animation

//continue here.......................................................

///////////////////
// Get Stock Info
///////////////////

 yahooFinance.snapshot({
   symbol: "AAPL",
   fields: ['s','n','l1', 'p2','y', 'd' ]
 }, function(err, data){
    if(err)
      console.log(err);
    console.log(data);
    console.log(data.name);
    // Initializing all the variables
    var name = data.name;
    var symbol = data.symbol;
    var currentStockPrice = data.lastTradePriceOnly;
    var changeInPercent = data.changeInPercent * 100;
    var dividendYield = data.dividendYield;
    var dividendPerShare = data.dividendPerShare;

 });

 ///////////////////////////
 // turns on led % change
 ///////////////////////////
function runPercentChange(percentChange){

    //positive percentChange
    if(changeInPercent > 0.0)
        matrix.led("green").render();
    // negative percentChange
    else if(changeInPercent < 0.0)
        matrix.led("red").render();
    // no percentChange
    else
        matrix.led("yellow").render();
}
