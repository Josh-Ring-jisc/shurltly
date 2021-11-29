import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import urls from './models/urls.js';

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const CONNECTION_URL =
  'mongodb+srv://chrisC:PlutoBlue4$@cluster0.o7kyo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((error) => console.error(error.message));

app.post('/shortenUrl', async (req, res) => {
  const full = req.body.url;
  const urlExists = await urls.find({ full });
  if (urlExists[0]) {
    res.send(urlExists[0]);
  } else {
    await urls.create({ full });
    const newUrls = await urls.find({ full });
    res.send(newUrls[0]);
  }
});

app.get('/:shortUrl', async (req, res) => {
  const url = await urls.findOne({ short: req.params.shortUrl });

  if (url == null) res.sendStatus(404);

  res.redirect(url.full);
});
