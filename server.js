const express = require('express');
const axios = require('axios');
const cors = require('cors');

const port = 3000;
const app = express();

app.use(express.static(__dirname + '/public'));
app.use(cors());

app.get('/news', async (req, res) => {
  try {
    const apiKey = 'ece6d03b5f0c44eabae3ffd4afd170b6';
    const search = req.query.search || 'everything';
    const apiUrl = `https://newsapi.org/v2/everything?q=${search}&sortBy=date&apiKey=${apiKey}`;
    const response = await axios.get(apiUrl);
    const newsData = response.data;
    return res.json(newsData);
  } catch (error) {
    console.error('Error fetching news:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/', async (req, res) => {
    res.sendFile(__dirname + "/index.html");
  });

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${port}`);
});
