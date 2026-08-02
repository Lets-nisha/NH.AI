const mongoose = require('mongoose')

const blacklistTokenShema = new mongoose.Schema({
    token: {
        type: String,
        required: [true, "token is required to be added in blacklist"]
    }
},
    {
        timestamps: true
    })

const tokenBlacklistModel = mongoose.model("blacklistTokens", blacklistTokenShema);

module.exports = tokenBlacklistModel;