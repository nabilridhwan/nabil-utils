const axios = require("axios");
class Spotify {
    static getAccessToken(refreshToken) {
        return new Promise((resolve, reject) => {
            const formData = new URLSearchParams();
            formData.append("grant_type", "refresh_token")
            formData.append("refresh_token", refreshToken)

            axios({
                method: "POST",
                url: "https://accounts.spotify.com/api/token",
                data: formData,
                headers: {
                    "Authorization": `Basic ${Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString("base64")}`,
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(tokenResponse => {
                if (tokenResponse.data.error) {
                    reject(tokenResponse.data.error)
                } else {
                    resolve(tokenResponse.data)
                }
            }).catch(error => {
                resolve(error)
            })
        })
    }

    static getCurrentlyListening(accessToken) {
        return new Promise((resolve, reject) => {

            axios({
                method: "GET",
                url: `https://api.spotify.com/v1/me/player/currently-playing`,
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }).then(response => {
                resolve(response.data)
            }).catch(error => {
                reject(error.response.data)
            })
        })
    }
}

module.exports = Spotify;