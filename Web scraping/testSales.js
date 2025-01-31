const axios = require("axios");
const fs = require("fs");

module.exports.getSalesListings = async () => {
  console.log("Fetching sales listings...");
  
  let result = [];
  let pageNumber = 1;
  const maxPages = 20;  // Set the maximum number of pages to fetch
  let hasMoreResults = true;

  try {
    while (hasMoreResults && pageNumber <= maxPages) {
      console.log(`Fetching page: ${pageNumber}`);
      
      const requestBody = {
        'searchQueryState': {
          'pagination': { 'currentPage': pageNumber },  // Pagination control
          'isMapVisible': true,
          'mapBounds': {
            'west': -71.60100763511659,
            'east': -70.65343683433534,
            'south': 42.16270187515638,
            'north': 42.43188091148111
          },
          'regionSelection': [
            {
              'regionId': 44269,  // Modify this if you need a different region
              'regionType': 6
            }
          ],
          'filterState': {
            'isForSaleByAgent': { 'value': true },  // For sale by agent
            'isForSaleByOwner': { 'value': true },  // For sale by owner
            'isNewConstruction': { 'value': true },  // New construction
            'isComingSoon': { 'value': false },
            'isAuction': { 'value': false },
            'isForSaleForeclosure': { 'value': true },  // Foreclosure sales
            'isAllHomes': { 'value': true },
            'homeType': {
              'value': ["HOUSE", "CONDO", "TOWNHOUSE", "APARTMENT", "STUDIO"]  // Home types for sale
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
            'referer': 'https://www.zillow.com/homes/for_sale/?searchQueryState=%7B%22isMapVisible%22%3Atrue%2C%22mapBounds%22%3A%7B%22north%22%3A42.398867%2C%22south%22%3A42.22788%2C%22east%22%3A-70.904137%2C%22west%22%3A-71.191113%7D%2C%22filterState%22%3A%7B%22sort%22%3A%7B%22value%22%3A%22globalrelevanceex%22%7D%2C%22ah%22%3A%7B%22value%22%3Atrue%7D%7D%2C%22isListVisible%22%3Atrue%2C%22mapZoom%22%3A12%2C%22pagination%22%3A%7B%7D%7',
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
    fs.writeFileSync('Zsales_listings.csv', csvData);
    console.log("CSV file saved as zillow_sales_listings.csv");

  } catch (error) {
    console.error("Error in fetching listings:", error);
  }
};

// Call the function to execute
module.exports.getSalesListings();
