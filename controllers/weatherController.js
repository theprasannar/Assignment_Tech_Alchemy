const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const axios = require("axios");

exports.getWeather = catchAsyncErrors(async (req, res, next) => {
  var url = `http://api.openweathermap.org/data/2.5/forecast?q=London&appid=${process.env.OPEN_WEATHER_API_KEY}`;

  const weatherReport = await axios.get(url);

  let data = [];
  let prevDate = "";
  weatherReport.data.list.forEach((weather) => {
    if (weather.dt_txt.split(" ")[0] !== prevDate) {
      data.push({
        date: new Date(weather.dt_txt).toDateString(),
        main: weather.weather[0].main,
        temp: weather.main.temp,
      });
      prevDate = weather.dt_txt.split(" ")[0];
    }
  });
  res.status(200).json({
    count: data.length,
    unit: "Kelvin",
    location: weatherReport.data.city.name,
    data: data,
  });
});
