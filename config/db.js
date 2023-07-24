require("dotenv").config()
const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        //mongoose.set("strictQuery, false")
        const connection = await mongoose.connect(process.env.DB_CONNECTION,{
            useNewUrlParser : true,
            useUnifiedTopology : true
        })

        const url = `${connection.connection.host}:${connection.connection.port}`

        console.log(`MongoDB connected in ${url}`);

    } catch (error) {
        console.log(error.message);
    }
}

module.exports = connectDB