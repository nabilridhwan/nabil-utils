const headers = require("../../utils/headers")
const Spotify = require("../../utils/Spotify")

exports.handler = async function (event, context) {
    try {
        const {
            access_token
        } = await Spotify.getAccessToken(process.env.REFRESH_TOKEN)

        const currentlyListening = await Spotify.getCurrentlyListening(access_token)

        return {
            statusCode: 200,
            body: JSON.stringify(currentlyListening),
            headers
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: error
            }),
            headers
        }
    }
}