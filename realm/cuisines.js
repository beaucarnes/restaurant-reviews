exports = async function(payload, response) {

  const collection = context.services.get("mongodb-atlas").db("sample_restaurants").collection("restaurants");
  const cuisines = await collection.distinct("cuisine");
  
  return cuisines;
};