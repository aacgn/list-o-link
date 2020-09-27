const axios = require('axios');
require('dotenv').config();
const { UPDATE_LINK } = require("./utils/linkQueries");
const sendQuery = require("./utils/sendQuery");
const formattedResponse = require("./utils/formattedResponse");

exports.handler = async(event) => {

    if (event.httpMethod !== 'PUT')
        return formattedResponse(405, { error: 'Method not supported' });

    const { _id: id, name, url, description, archived } = JSON.parse(event.body);
    const variables = { id, name, url, description, archived };

    try {
        const { updateLink } = await sendQuery(UPDATE_LINK, variables);

        return formattedResponse(200, updateLink);
    }
    catch(err) {
        console.error(err);
        
        return formattedResponse(500, { error: 'Something went wrong' });
    }

};