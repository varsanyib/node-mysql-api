const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const app = express();

//BodyParser Settings
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//#region Main routes
app.use('/', require("./routes/info"));
app.use('/todo', require("./routes/todos"));
//#endregion

//Default error message for unknown request - HTTP 404!
app.use(function(req, res) {
  res.status(404).json({ success: false, result: null, message: `404 Nem található!`,  timestamp: Date.now()});
});

//Server listening DEF
app.listen(config["http"]["port"], () => {
  console.log(`[INFO] ${new Date().toLocaleString()} - RESTful API Webserver started on ${config["http"]["port"]} port!`);
});