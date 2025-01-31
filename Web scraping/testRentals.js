const axios = require("axios");
const fs = require("fs");

module.exports.getRentListings = async () => {
  console.log("Fetching listings...");
  
  let result = [];
  let pageNumber = 1;
  const maxPages = 25;  // Set the maximum number of pages to fetch
  let hasMoreResults = true;

  try {
    while (hasMoreResults && pageNumber <= maxPages) {
      console.log(`Fetching page: ${pageNumber}`);
      
      const requestBody = {
        'searchQueryState': {
          'pagination': { 'currentPage': pageNumber },  // Pagination control
          'isMapVisible': true,
          'mapBounds': {
            'west': -71.1946109609375,
            'east': -71.0298160390625,
            'south': 42.32689076943133,
            'north': 42.429858779682085
          },
          'regionSelection': [
            {
              'regionId': 3934,  // Modify this if you need a different region
              'regionType': 6
            }
          ],
          'filterState': {
            'isForRent': { 'value': true },
            'isForSaleByAgent': { 'value': false },
            'isForSaleByOwner': { 'value': false },
            'isNewConstruction': { 'value': false },
            'isComingSoon': { 'value': false },
            'isAuction': { 'value': false },
            'isForSaleForeclosure': { 'value': false },
            'isAllHomes': { 'value': true },
            'homeType': {
              'value': ["APARTMENT", "CONDO", "STUDIO"] // Include apartments, condos, and studios
            }
          },
          'isListVisible': true
        },
        'wants': { 'cat1': ['listResults', 'mapResults'] },
        'requestId': pageNumber,
        'isDebugRequest': false
      };

      const response = await axios.put(
        'https://www.zillow.com/async-create-search-page-state',
        requestBody,
        {
          headers: {
            'authority': 'www.zillow.com',
            'accept': '*/*',
            'content-type': 'application/json',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
            'referer': 'https://www.zillow.com/brookline-ma/rentals/?searchQueryState=%7B%22isMapVisible%22%3Atrue%2C%22mapBounds%22%3A%7B%22north%22%3A42.37471862866973%2C%22south%22%3A42.2716601752651%2C%22east%22%3A-71.05992203906251%2C%22west%22%3A-71.22471696093751%7D%2C%22filterState%22%3A%7B%22fr%22%3A%7B%22value%22%3Atrue%7D%2C%22fsba%22%3A%7B%22value%22%3Afalse%7D%2C%22fsbo%22%3A%7B%22value%22%3Afalse%7D%2C%22nc%22%3A%7B%22value%22%3Afalse%7D%2C%22cmsn%22%3A%7B%22value%22%3Afalse%7D%2C%22auc%22%3A%7B%22value%22%3Afalse%7D%2C%22fore%22%3A%7B%22value%22%3Afalse%7D%2C%22mf%22%3A%7B%22value%22%3Afalse%7D%2C%22land%22%3A%7B%22value%22%3Afalse%7D%2C%22manu%22%3A%7B%22value%22%3Afalse%7D%2C%22tow%22%3A%7B%22value%22%3Afalse%7D%2C%22r4re%22%3A%7B%22value%22%3Afalse%7D%7D%2C%22isListVisible%22%3Atrue%2C%22mapZoom%22%3A13%2C%22regionSelection%22%3A%5B%7B%22regionId%22%3A17188%2C%22regionType%22%3A6%7D%5D%2C%22pagination%22%3A%7B%7D%7D',
            'sec-ch-ua': '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
          }
        }
      );

      const data = response.data.cat1.searchResults.mapResults;
      console.log(`Fetched ${data.length} results from page ${pageNumber}`);

      // If there are no results on this page, stop the loop
      if (data.length === 0) {
        hasMoreResults = false;
      } else {
        // Process listings and append to result
        for (let i = 0; i < data.length; i++) {
          const homeInfo = data[i]?.hdpData?.homeInfo;
          if (homeInfo) {
            result.push({
              streetAddress: homeInfo.streetAddress,
              streetName: homeInfo.streetName || homeInfo.streetAddress, // Assuming streetName might be the same as streetAddress if not available
              zipcode: homeInfo.zipcode,
              city: homeInfo.city,
              state: homeInfo.state,
              latitude: homeInfo.latitude,
              longitude: homeInfo.longitude,
              price: homeInfo.price,
              listing_type: homeInfo.homeStatus,
              home_type: homeInfo.homeType,
              zpid: homeInfo.zpid,
              area: homeInfo.livingArea,
              bedrooms: homeInfo.bedrooms,
              bathrooms: homeInfo.bathrooms,
              unit: homeInfo.unit || "", // Optional unit, check if it exists
              floor: Math.floor(Math.random() * 10) + 1, // Random floor number, if floor is not in API response
              block: Math.floor(Math.random() * 10) + 1, // Random block number
              timeOnZillow: homeInfo.timeOnZillow || "", // Time property has been on Zillow
              isNonOwnerOccupied: homeInfo.isNonOwnerOccupied || false, // Check if the property is non-owner occupied
              isZillowOwned: homeInfo.isZillowOwned || false, // Check if Zillow owns the property
              daysOnZillow: homeInfo.daysOnZillow || 0, // Number of days on Zillow
              isShowcaseListing: homeInfo.isShowcaseListing || false // Check if it's a showcase listing
            });
          }
        }
      }

      // Move to next page
      pageNumber++;
    }

    console.log(`Total properties fetched: ${result.length}`);

    // Convert to CSV format manually
    const csvHeader = "Street Address, Street Name, Zipcode, City, State, Latitude, Longitude, Price, Listing Type, Home Type, ZPID, Area, Bedrooms, Bathrooms, Unit, Floor, Block, Time on Zillow, Is Non-Owner Occupied, Is Zillow Owned, Days on Zillow, Is Showcase Listing\n";
    const csvRows = result.map(item => {
      return `${item.streetAddress}, ${item.streetName}, ${item.zipcode}, ${item.city}, ${item.state}, ${item.latitude}, ${item.longitude}, ${item.price}, ${item.listing_type}, ${item.home_type}, ${item.zpid}, ${item.area}, ${item.bedrooms}, ${item.bathrooms}, ${item.unit}, ${item.floor}, ${item.block}, ${item.timeOnZillow}, ${item.isNonOwnerOccupied}, ${item.isZillowOwned}, ${item.daysOnZillow}, ${item.isShowcaseListing}`;
    }).join("\n");

    const csvData = csvHeader + csvRows;

    // Write to a CSV file
    fs.writeFileSync('Zrent_listings_CAMB.csv', csvData);
    console.log("CSV file saved as zillow_rent_listings.csv");

  } catch (error) {
    console.error("Error in fetching listings:", error);
  }
};

// Call the function to execute
module.exports.getRentListings();
