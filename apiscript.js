// Get reference to HTML elements
let searchBarEl = document.getElementById("stockbuddy-search");
let dropdownEl = document.getElementById("dropdown-menu");
let searchBtn = document.getElementById("search-btn");

// Hook into Yahoo Finance API and pull query-related stock data.
// symbol = REQUIRED. The value of symbol field returned in …/auto-complete endpoint
// region = OPTIONAL. One of the following is allowed US|BR|AU|CA|FR|DE|HK|IN|IT|ES|GB|SG
// ***Make sure to catch errors such as 404 to keeo new card from being created.
function callApi() {
  let symbol = searchBarEl.value.toUpperCase();
  fetch(
    `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/get-detail?region=US&symbol=${symbol}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
        "x-rapidapi-key": "64a4bdf806msh01c27c0f2438b3cp12bd4ejsn18b80e4ba60a",
      },
    }
  )
    .then(function (response) {
      return response.json();
    })

    // *** Catch errors when logo image can't be found (example: McDonalds) and replace with placeholder image.
    .then(function (response) {
      console.log(response);
      let website = response.summaryProfile.website;
      let logo = "https://logo.clearbit.com/" + website; // Set this as img source.
      let companyName = response.quoteType.longName;
      let currency = response.price.currency;
      let currencySymbol = response.price.currencySymbol;
      let currentPrice = response.price.regularMarketPrice.raw;
      let marketChange = response.quoteData[
        symbol
      ].regularMarketChangePercent.raw.toFixed(1);
      console.log(marketChange);
      createCard(
        logo,
        companyName,
        currencySymbol,
        currentPrice,
        currency,
        marketChange
      );
    });
  searchBarEl.value = "";
}

// function that creates a mini card
function createCard(
  logo,
  companyName,
  currencySymbol,
  currentPrice,
  currency,
  marketChange
) {
  let arrow = function () {
    if (marketChange > 0) {
      arrow = `<i class="far fa-arrow-alt-circle-up" style="color:green"></i>`;
    } else if (marketChange < 0) {
      arrow = `<i class="far fa-arrow-alt-circle-down" style="color:red"></i>`;
    }
  };
  arrow();
  const cardHTML = `
    <div class="box">
        <article class="media">
            <div class="media-left">
                <figure class="image">
                    <img src=${logo}?size=84 alt="company-logo"/>
                </figure>
            </div>
            <div class="media-content">
                <div class="content">
                    <h4><strong>${companyName}</strong></h4>
                    <p><strong>Current Price: ${currencySymbol}${currentPrice} ${currency}</strong></p>
                    <p><strong>Market change: ${marketChange}%</strong> ${arrow}</p>
                    </div>
            </div>
            <div id="checkmark" class="media-right">
                <a class="media-right" aria-label="like">
                    <span class="icon is-small">
                        <i class="fas fa-chevron-right" aria-hidden="true"></i>
                    </span>
                </a>
            </div>
        </article>
    </div>`;
  dropdownEl.innerHTML += cardHTML;
}

// Hook into Yahoo Finance API and pull query-related stock chart. Use the symbol from lat query.
// Interval = REQUIRED. One of the following is allowed 1m|2m|5m|15m|60m|1d.
// Symbol = REQUIRED. The value of symbol field returned in …/auto-complete endpoint
// Range = REQUIRED. One of the following is allowed 1d|5d|1mo|3mo|6mo|1y|2y|5y|10y|ytd|max. Do not use together with period1 and period2.

// fetch(
//   `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-chart?region=US&interval=1m&symbol=${symbol}&range=1d`,
//   {
//     method: "GET",
//     headers: {
//       "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
//       "x-rapidapi-key": "64a4bdf806msh01c27c0f2438b3cp12bd4ejsn18b80e4ba60a",
//     },
//   }
// )
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (response) {
//     console.log(response);
//   });

// Define a click event to call the API.
searchBtn.addEventListener("click", callApi);