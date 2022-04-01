const headers = require("../../utils/headers")

exports.handler = async function (event, context) {
    return {
        statusCode: 404,
        body: JSON.stringify({
            error: "Not found",
            message: "What are you snooping around for?",
        }),
        headers
    }
}