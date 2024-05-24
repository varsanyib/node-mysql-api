const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const cors = require('cors');
const app = express();

//BodyParser Settings
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((err, req, res, next) => {
  if (err) return res.status(400).json({ success: false, result: null, message: `Invalid body value in request!`,  timestamp: Date.now()});
  else next();
});

//CORS settings
app.use(cors());

//#region Main routes
app.use('/', require("./routes/info"));
app.use('/todo', require("./routes/todos"));
//#endregion

//Default error message for unknown request - HTTP 404!
app.use(function(req, res) {
  res.status(404).json({ success: false, result: null, message: `Not found!`,  timestamp: Date.now()});
});

//API Runtime
app.listen(config["http"]["port"], () => {
  console.log(`[INFO] ${new Date().toLocaleString()} - RESTful API Webserver started on ${config["http"]["port"]} port!`);
});