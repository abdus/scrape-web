# Scrapper

> A plug-n-play scrapper for Node.js

I keep writing the same code again and again. So, thought of publishing it as a package.

## usage

```javascript
const scrapper = require('scrape-web');

scrapper({
  url: 'https://www.nytimes.com/',
  elementToScrape: 'article .title',
})
  .then(data => console.log(data))
  .catch(err => console.log(err));
```

#### With `async/await`

```javascript
const scrapper = require('scrape-web');

(async () => {
  try {
    const result = await scrapper({
      url: 'https://www.nytimes.com/',
      elementToScrape: 'article .title',
    });

    console.log(result);
  } catch (err) {
    console.log(err);
  }
})();
```

Return an array of Objects

```javascript
[
  {
    href: '/some/url/location.html',
    textContent: `Returns null if there's no textContent`,
    src: 'applicaple in tags like img',
  },
];
```

## License

This package is published under the terms of the [MIT License](https://license.thisisabdus.dev).
