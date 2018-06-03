import validUrl from 'valid-url';
import shortid from 'shortid';
import LinkModel from '../models/linkModel';

shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');

exports.getShortUrl = (req, res) => {
  // Step 1: få fat i original link, dvs. den brugeren har indtastet
  const originLink = req.body.originalLink;

  // Step 2: er det en valid url?
  if (validUrl.isUri(originLink)) {
    // Step 3: generate short url
    const shortUrl = shortid.generate();
    const newUrl = new LinkModel({
      originalLink: originLink,
      shortLink: shortUrl,
    });

    // Step 4: new linkModel in db

    // Step 5: return shortUrl
    res.json({ shortUrl });
  } else {
    res.render('notfoundurl', {
      errorUrl: 'error',
    });
  }
};

// Step 4: save original url and short url in database
// Step 5: render page and return short url to website

exports.redirectUrl = (req, res) => {
  // Step 1: få fat i short url
  const { shortUrl } = req.params;

  // Step 2: søg efter short url i db
  LinkModel.findOne({ shortLink: shortUrl }, 'originalLink', (err, link) => {
    // Step 3: hvis shortUrl ikke findes i db, så vis fejl side
    console.log(err);
    if (err) {
      res.render('notfoundurl', {
        errorUrl: shortUrl,
      });

      return;
    }

    // Step 4: ellers så redirect brugeren til original link
    res.redirect(link.originalLink);
  });
};
