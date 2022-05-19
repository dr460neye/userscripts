// ==UserScript==
// @name        prices - immobilienscout24.de
// @namespace   Violentmonkey Scripts
// @match       https://www.immobilienscout24.de/Suche/*/wohnung-*
// @exclude     https://www.immobilienscout24.de/Suche/*/wohnung-*?enteredFrom*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @grant       none
// @version     1.0
// @author      -
// @description 4/8/2022, 12:55:59 AM
// ==/UserScript==


window.addEventListener('load', function() {
    $("div.result-list-entry__criteria a div").each(
    function(id,obj){
    // obj = all data 3 data entries
    // dl dd price
    // dl dd sqm
    // dl dd rooms
    var sqmvalue = "-1";
    
     
    //console.log($(obj).children('dl'));
      
    var entries = $(obj).children('dl');
    
    var priceasstring = $(entries[0]).children("dd").text();
    var price = Number(priceasstring.replace(/[^0-9-]+/g,""))*1.1;
    console.log("Price> " + price);
    var sqmasstring = $(entries[1]).children("dd").text();
    var sqm = Number(sqmasstring.replace(",",".").replace(/[^0-9-.]+/g,""));
    console.log("sqm> " + sqm);

    sqmvalue = (price / sqm).toFixed(2); + "";
    mfj1value = (price / ( (8*sqm)*12)).toFixed(2); + "";
    mfj2value = (price / ( (9*sqm)*12)).toFixed(2); + "";
    mfj3value = (price / ( (10*sqm)*12)).toFixed(2); + "";

    //console.log( $(entries[0]).children("dd").text() );
    
      
    // add sqm field
    var placeholder1 = $('<dl class="grid-item result-list-entry__primary-criterion"><dd class="font-highlight font-tabular">' + sqmvalue + '</dd><dt class="font-tabular onlyLarge font-xs attribute-label">€/sqm</dt></dl>');
    var placeholder2 = $('<dl class="grid-item result-list-entry__primary-criterion"><dd class="font-highlight font-tabular">' + mfj1value +" - "+ mfj2value +" - "+ mfj3value + '</dd><dt class="font-tabular onlyLarge font-xs attribute-label">MFJ</dt></dl>');

    $(obj).append(placeholder1);
    $(obj).append(placeholder2);
  
  });
}, false);

