const express = require('express');
const router = express.Router();
const database = require('../db');

router.get('/', async (req, res) => {
    const support = {
        success: true, 
        result: {
            standard: "VUCIR",
            mode: "FIX",
            api_version: "2.1.0-DEV",
            end_of_support: 1893452399,
            supported_languages: [
                "en"
            ],
            created_by: [
                "Barnabás Varsányi"
            ]
        }, 
        message: "Node.js RESTful test environment made using the VUCIR standards.", 
        timestamp: Date.now()};

    return res.status(200).json(support);
});

router.get('/selftest', async (req, res) => {
    const technologies = {
        mysql: false
    }
    try {
        if (!database.isConnected()) {
            await database.connect();
        }
        const [result] = await database.connection.execute("SELECT FLOOR(RAND()*100) AS 'randomizer', NOW() AS 'servertime'");
        if (result.length > 0) {
            technologies["mysql"] = true;
        }
    } catch (error) {
        technologies["mysql"] = false;
    }
    const passTest = Object.values(technologies).every(value => !!value);
    return res.status((passTest ? 200 : 500)).json({success: passTest, result: technologies, message: (passTest ? "Selftest OK!" : "Selftest failed!"), timestamp: Date.now()}); 
});

module.exports = router;