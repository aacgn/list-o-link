const axios = require('axios');
require('dotenv').config();
const { CREATE_LINK } = require("./utils/linkQueries");
const sendQuery = require("./utils/sendQuery");
const formattedResponse = require("./utils/formattedResponse");

exports.handler = async(event) => {

    if (event.httpMethod !== 'POST')
        return formattedResponse(405, { error: 'Method not supported' });

    const {name, description, url} = JSON.parse(event.body);
    const variables = {name, description, url, archived: false};

    try {
        const { createLink } = await sendQuery(CREATE_LINK, variables);

        return formattedResponse(200, createLink);
    }
    catch(err) {
        console.error(err);

        return formattedResponse(500, { error: 'Something went wrong' });
    }

};