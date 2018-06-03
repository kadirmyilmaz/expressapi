import validUrl from 'valid-url';
import shortid from 'shortid';
import LinkModel from '../models/linkModel';

shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');

export function getShortUrl(req, res) {
  // Step 1: få fat i original link, dvs. den brugeren har indtastet
  const originLink = req.body.originalLink;
  // Step 2: er det en valid url?
  if (validUrl.isUri(originLink)) {
    // Step 3: generate short url
    const shortUrl = shortid.generate();
    const newLink = new LinkModel({
      originalLink: originLink,
      shortLink: shortUrl,
    });
    // Step 4: new linkModel in db
    newLink.save((err) => {
      if (err) {
        console.log(err);
      }
    });
    // Step 5: return shortUrl
    res.json({ shortUrl });
  } else {
    res.render('notfoundurl', {
      errorUrl: 'error',
    });
  }
}

export function redirectUrl(req, res) {
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
}
