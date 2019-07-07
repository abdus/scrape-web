const request = require('request');
const cheerio = require('cheerio');

const USER_AGENT =
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.108 Safari/537.36';

function main({ url, elementToScrape }) {
  return new Promise((resolve, reject) => {
    request.get(
      url,
      { headers: { 'User-Agent': USER_AGENT } },
      (error, res, body) => {
        // reject the promise if it contains an error
        if (error) return reject(error);
        // prepare data for scrapping if the status code is 200 and it has a valid body
        else if (res.statusCode === 200 && body) {
          return resolve(scrapeData(body, elementToScrape));
        } else return reject('Unknown Error Occured');
      }
    );
  });
}

function scrapeData(html, element) {
  // return an error object based on following condition
  if (!html || typeof html !== 'string')
    return new Error(
      `Error: Type of 'html' is ${typeof html}. Expected a string`
    );

  // return an error object based on following condition
  if (!element || typeof element !== 'string')
    return new Error(
      `Error: Type of 'element' is ${typeof element}. Expected a string`
    );

  // load data in cheerio
  const $ = cheerio.load(html);
  const returnDataArr = [];

  // prepare an array of the data
  $(element).each(function(i, e) {
    const elemParsed = $(e);
    const elemInfo = {
      href: elemParsed.attr('href') ? elemParsed.attr('href') : null,
      textContent: elemParsed.text() ? elemParsed.text() : null,
      src: elemParsed.attr('src') ? elemParsed.attr('src') : null,
    };

    returnDataArr.push(elemInfo);
  });

  return returnDataArr;
}

module.exports = main;
