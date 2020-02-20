
# Google-App-Script StockQuotes
A script to find and replace a symbol to stock quote, pulling data from a sheet table.
made for a reddit user that asked kindly

## functionality
find and replace "words" in a doc with the character "&" and length > 1.
1) find markup to be substituted. i. e.: '&AGI'
2) lookup info from "AGI" scraped with =IMPORTHTML()
3) replace markup for a formatted string. i.e.: "&AGI" => "[AGI 10.46 ▲0.58%]"

## deploy
clone repo
install clasp cli: https://www.npmjs.com/package/@google/clasp
auth clasp on your google account
choose scriptId as destination on .clasp.json
choose options on options.gs
clasp push
