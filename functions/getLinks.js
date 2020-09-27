const axios = require('axios');
require('dotenv').config();
const { GET_LINKS } = require("./utils/linkQueries");
const sendQuery = require("./utils/sendQuery");
const formattedResponse = require("./utils/formattedResponse");

exports.handler = async(event) => {
    
    if (event.httpMethod !== 'GET')
        return formattedResponse(405, { error: 'Method not supported' });

    try {
        const { allLinks } = await sendQuery(GET_LINKS);
        const data = allLinks.data;
        return formattedResponse(200, data);
    }
    catch(err) {
        console.error(err);
        return formattedResponse(500, { error: 'Something went wrong' });
    }

};