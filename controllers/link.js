import validUrl from 'valid-url';
import shortid from 'shortid';
import LinkModel from '../models/linkModel';

shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');

export function getShortUrl(req, res) {
  // Step 1: få fat i original link, dvs. den brugeren har indtastet
  const originLink = req.body.URL;
  // Step 2: er det en valid url?
  if (validUrl.isUri(originLink)) {
    // Step 3: generate short url
    const shortUrl = shortid.generate();
    const fullShortUrl = `http://localhost:3000/api/redirect/${shortUrl}`;
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
    res.status(200).json({ error: false, shortUrl: fullShortUrl });
  } else {
    res.status(400).json({ error: true, message: 'Not a valid URI' });
  }
}

export function redirectUrl(req, res) {
  // Step 1: få fat i short url
  const { shortUrl } = req.params;
  // Step 2: søg efter short url i db
  LinkModel.findOne({ shortLink: shortUrl }, 'originalLink', (err, link) => {
    // Step 3: hvis shortUrl ikke findes i db, så vis fejl side
    if (err || !link) {
      res.status(404).json({ error: true, message: 'Redirect URL not found' });
      return;
    }
    // Step 4: ellers så redirect brugeren til original link
    res.status(200).json({ error: false, redirectUrl: link.originalLink });
  });
}
