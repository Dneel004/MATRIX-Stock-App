var yahooFinance = require('yahoo-finance');

///////////////////
// Get Stock Info
///////////////////

// var name = name.data;
 /*var symbol = data.symbol;
 var lastTradeDate = data.lastTradeDate;
 var currentStockPrice = data.lastTradePriceOnly;
 var changeInPercent = data.changeInPercent;
 var dividendYield = data.dividendYield;
 var dividendPerShare = data.dividendPerShare;*/

 yahooFinance.snapshot({
   symbol: "AAPL",
   fields: ['s','n','d1','l1', 'p2','y', 'd' ]
 }, function(err, data){
    if(err)
      console.log(err);
    console.log(data);
    console.log(data.name);
 });
