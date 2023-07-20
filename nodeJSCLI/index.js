#!/usr/bin/env node

console.log("Welcome to StartMyDay CLI");

const queryNewsAPI = () => {

  const NewsAPI = require('newsapi');
  const newsapi = new NewsAPI('demo');

  // To query /v2/top-headlines
  // All options passed to topHeadlines are optional, but you need to include at least one of them
  newsapi.v2.topHeadlines({
    country: 'us',
    pageSize: 10
  }).then(response => {
    const articles = response.articles.map((item) => {
      return item.title;
    });

    console.log('Your Top 10 Headlines from the United States for Today:')
    for (let i = 0; i < articles.length; i++) {
      console.log(articles[i]);
      console.log('\n\n');
    }
  });

} 

const queryStockAPI = () => {
  'use strict';
  var request = require('request');
  
  // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
  var url = 'https://www.alphavantage.co/query?function=MARKET_STATUS&apikey=demo';
  
  request.get({
      url: url,
      json: true,
      headers: {'User-Agent': 'request'}
    }, (err, res, data) => {
      if (err) {
        console.log('Error:', err);
      } else if (res.statusCode !== 200) {
        console.log('Status:', res.statusCode);
      } else {
        // data is successfully parsed as a JSON object:
        //only display the market status of exchanges in the US, Canada and Global exchages 
        
        //Filter data for region: 'United States' and 'Canada' and 'Global'
        const dataObject = JSON.parse(JSON.stringify(data));
        
        const filteredData = dataObject['markets'].filter((item) => {
          return item['region'] === 'United States' || item['region'] === 'Canada' || item['region'] === 'Global';
        }
        );

        //Display the market status of exchanges in the US, Canada and Global exchages
        console.log('Market Status of US + Canada + Global Exchanges:');
        for (let i = 0; i < filteredData.length; i++) {
          console.log(filteredData[i]['region'] + ' - ' + filteredData[i]['market_type'] + ' - ' + filteredData[i]['current_status']);
          console.log('----------------------------------------------');
        }
      }
  });
}

const queryWeatherAPI = () => {
  const request = require('request');

  const url = 'http://api.weatherapi.com/v1/current.json?key=demo&q=New York';

  request(url, (err, res, body) => {
    if (err) {
      console.log(err);
      return;
    }

    const weatherData = JSON.parse(body);
    const temperatue = weatherData['current']['temp_f'];
    const feelsLike = weatherData['current']['feelslike_f'];
    const condition = weatherData['current']['condition']['text'];
    const windSpeed = weatherData['current']['wind_mph'];
    const windDirection = weatherData['current']['wind_dir'];

    console.log('Current Weather in New York:');
    console.log('Temperature: ' + temperatue + ' F');
    console.log('Feels Like: ' + feelsLike + ' F');
    console.log('Condition: ' + condition);
    console.log('Wind Speed: ' + windSpeed + ' mph' + " " + windDirection);

  });


}


if(process.argv[2] == 'news'){
  queryNewsAPI();
}
else if(process.argv[2] == 'stock'){
  queryStockAPI();
}
else if(process.argv[2] == 'weather'){
  queryWeatherAPI();
}
else{
  console.log('Please enter a valid command: startmyday followed by "news" or "stock" or "weather"\nExample: startmyday news');
}