var yahooFinance = require('yahoo-finance');

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
    var changeInPercent = data.changeInPercent;
    var dividendYield = data.dividendYield;
    var dividendPerShare = data.dividendPerShare;

 });
