// This function is the webhook's request handler.
exports = async function(payload, response) {
  
  const id = payload.query.id || ""

  const restaurants = context.services.get("mongodb-atlas").db("sample_restaurants").collection("restaurants");

  const pipeline = [
    {
        $match: {
            _id: BSON.ObjectId(id),
        },
    },
          {
              $lookup: {
                  from: "reviews",
                  let: {
                      id: "$_id",
                  },
                  pipeline: [
                      {
                          $match: {
                              $expr: {
                                  $eq: ["$restaurant_id", "$$id"],
                              },
                          },
                      },
                      {
                          $sort: {
                              date: -1,
                          },
                      },
                  ],
                  as: "reviews",
              },
          },
          {
              $addFields: {
                  reviews: "$reviews",
              },
          },
      ]
      
      restaurant = await restaurants.aggregate(pipeline).next()
      restaurant._id = restaurant._id.toString()
      
      restaurant.reviews.forEach(review => {
        review.date = new Date(review.date).toString()
        review._id = review._id.toString();
      });
  return restaurant
};