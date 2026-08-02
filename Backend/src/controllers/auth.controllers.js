const userModel = require("../models/user.model")
const authRouter = require("../routes/auth.routes")
const jwt = require("jsonwebtoken")
const bcrypt = require("../../node_modules/bcryptjs/umd")
const tokenBlacklistModel = require("../models/blacklist.model")

/**
 * @router registerUserController
 * @description Register a new user , expects username, email and password in the require
 * @access Public 
 */

async function registerUserController(req, res) {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
        return res.status(400).json({
            message: "please provide username, email and password"
        })
    }

    const isUserAlreadyExists = await userModel.findOne({
        $or: [{ username }, { email }]
    })

    console.log("Existing User:", isUserAlreadyExists);

    if (isUserAlreadyExists) {
        return res.status(400).json({
            message: "Account Already exists with this email address or username"
        })

    }


    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        password: hash
    })

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    );

    res.cookie("token", token)

    res.status(201).json({
        message: "User registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

/**
 * @name loginUserController
 * @description login a user, expects email and password in the request body
 * @access Public
 */

async function loginUserController(req, res) {
    const { email, password } = req.body
    const user = await userModel.findOne({ email })

    if (!user) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    );

    res.cookie("token", token)
    res.status(200).json({
        message: "User Logedin succesfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

/**
 * @name logoutUserControll
 * @description logout a user, expects email and password in the request body
 * @access Public
 */

async function logoutUserControll(req, res) {
    const token = req.cookies.token
    if (token) {
        await tokenBlacklistModel.create({ token })
    }
    res.clearCookie("token")

    res.status(200).json({
        message: "User logged out successfully"
    })
}

/**
 * @name getMeController
 * @description get the current logged in user details.
 * @access private
 */
async function getMeController(req, res) {
    const user = await userModel.findById(req.user.id)

    message: "user details fetched successfully"

    res.status(200).json({
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

module.exports = {
    registerUserController,
    loginUserController,
    logoutUserControll,
    getMeController,
}