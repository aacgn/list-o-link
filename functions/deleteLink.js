const axios = require('axios');
require('dotenv').config();
const { UPDATE_LINK, DELETE_LINK } = require("./utils/linkQueries");
const sendQuery = require("./utils/sendQuery");
const formattedResponse = require("./utils/formattedResponse");

exports.handler = async(event) => {

    if (event.httpMethod !== 'DELETE')
        return formattedResponse(405, { error: 'Method not supported' });

    const { _id: id } = JSON.parse(event.body);
    const variables = { id };


    try {
        const { deleteLink } = await sendQuery(DELETE_LINK, variables);

        return formattedResponse(200, deleteLink);
    }
    catch(err) {
        console.error(err);
        
        return formattedResponse(500, { error: 'Something went wrong' });
    }

};