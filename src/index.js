const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose")
dotenv.config();

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true
})
.then(() => console.log("MongoDb is connected"))
.catch(err => console.log(err))



app.listen(process.env.PORT || 3000, function () {
console.log('Express app running on port ' + (process.env.PORT || 3000))
});