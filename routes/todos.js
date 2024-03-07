const express = require('express');
const router = express.Router();
const database = require('../db');

//Example of MySQL database server for data processing
router.get('/', async (req, res) => {
    try {
        //Connecting database, if needed
        if (!database.isConnected()) {
            await database.connect();
        }
        //SQL execute
        const [result] = await database.connection.execute("SELECT `id`,`title`,`details`,`completed`,`created_at`,`modified_at` FROM `todos`;");
        //Results processing
        if (result.length > 0) {
            return res.status(200).json({ success: true, result: result, message: `Number of tasks: ${result.length}`,  timestamp: Date.now()});
        }
        else {
            return res.status(204).json({success: false, result: null, message: `The todolist is empty!`});
        }
        
    } catch (error) {
        return res.status(500).json({ success: false, result: null, message: `Internal error in request! (${error.code})`,  timestamp: Date.now()});
    }
});

router.get('/:id', async (req, res) => {
    try {
        //URL parameters
        let id = req.params.id ?? null;
        //Connecting database, if needed
        if (!database.isConnected()) {
            await database.connect();
        }
        //SQL execute
        const [result] = await database.connection.execute("SELECT `id`,`title`,`details`,`completed`,`created_at`,`modified_at` FROM `todos` WHERE `id` = ?;", [id]);
        //Results processing
        if (result.length > 0) {
            return res.status(200).json({ success: true, result: result, message: `Number of tasks: ${result.length}`,  timestamp: Date.now()});
        }
        else {
            return res.status(404).json({success: false, result: null, message: `The task id not found!`});
        }
    } catch (error) {
        return res.status(500).json({ success: false, result: null, message: `Internal error in request! (${error.code})`,  timestamp: Date.now()});
    }
});
//#endregion

//#region POST
router.post('/', async (req, res) => {
    //Request neccessary input datas
    const required_keys = ["title", "details", "completed"];
    try {
        //Check if JSON data is sent in the request body
        if (!req.is('application/json')) {
            return res.status(400).json({ success: false, result: null, message: `Invalid content type! Only JSON format accepted.`, timestamp: Date.now()});
        }
        //POST parameters in JSON
        const values = req.body;
        //Check required post keys
        if (!required_keys.every(x => x in values)) {
            return res.status(400).json({ success: false, result: null, message: `Missing required keys in data!`, timestamp: Date.now()});
        }
        //Connecting database, if needed
        if (!database.isConnected()) {
            await database.connect();
        }
        //SQL execute
        const [result] = await database.connection.execute("INSERT INTO `todos` (`title`, `details`, `completed`) VALUES (?, ?, ?);", [values.title, values.details, values.completed]);
        
        if (result.affectedRows > 0) {
            return res.status(200).json({ success: true, result: {id: result.insertId}, message: `Task created successfully!`,  timestamp: Date.now()});
        }
        else {
            return res.status(400).json({ success: false, result: null, message: `Failed to create new task!`,  timestamp: Date.now()});
        }
    } catch (error) {
        return res.status(500).json({ success: false, result: null, message: `Internal error in request! (${error.code})`,  timestamp: Date.now()});
    }
});
//#endregion


module.exports = router;