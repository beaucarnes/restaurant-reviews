import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import RestaurantsDAO from "./dao/restaurantsDAO.js"
import ReviewsDAO from "./dao/reviewsDAO.js"
dotenv.config()
const MongoClient = mongodb.MongoClient


// RESTREVIEWS_DB_URI=mongodb+srv://arvey:<password>@node-rest-apis.ptmt1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
const port = process.env.PORT || 8080
console.log(process.env.RESTREVIEWS_DB_URI)
MongoClient.connect(
  process.env.RESTREVIEWS_DB_URI,
  {
    poolSize: 50,
    wtimeout: 2500,
    useNewUrlParse: true }
  )
  .catch(err => {
    console.error(err.stack)
    process.exit(1)
  })
  .then(async client => {
    await RestaurantsDAO.injectDB(client)
    await ReviewsDAO.injectDB(client)
    app.listen(port, () => {
      console.log(`listening on port ${port}`)
      console.log(`listening on port ${port}`)
    })
  })