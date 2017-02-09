var yahooFinance = require('yahoo-finance');

///////////////////
// Get Stock Info
///////////////////
// var currentStockPrice;
//
// function getStockInfo(currentStockPrice){
//   // stock price data from yahoo
//
// }


yahooFinance.snapshot({
  symbol: "AAPL",
  fields: ['s','n','d1','l1', 'p2','y', 'd' ]
}, function(err, data){
  if(err)
    console.log(err);
  console.log(data);
  console.log(data.name);
});
