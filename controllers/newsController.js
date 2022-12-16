const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const axios = require("axios");

exports.getNews = catchAsyncErrors(async (req, res, next) => {
  let searchTerm = "";
  let url = "";
  if (req.query.search) {
    searchTerm = req.query.search;
    url = `${process.env.NEWS_URL}&q=${searchTerm}&apiKey=${process.env.NEWS_API_KEY}`;
  } else {
    url = `${process.env.NEWS_URL}&apiKey=${process.env.NEWS_API_KEY}`;
  }
  const news_get = await axios.get(url);

  let data = [];
  news_get.data.articles.forEach((article) => {
    data.push({
      headline: article.title,
      link: article.url,
    });
  });
  res.status(200).json({
    count: news_get.data.totalResults,
    data: data,
  });
});
