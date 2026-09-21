import React, { useEffect, useState } from "react";
import {
  createstatefood,
  getstatefood,
} from "../services/foodservice";

const StateFood = () => {
  const [statefood, setStatefood] = useState({
    stateid: "",
    foodname: "",
    price: "",
    rating: "",
    foodtype: "",
    description: "",
    image: null,
  });

  function handleInput(e) {
    const { name, value, files } = e.target;

    setStatefood({
      ...statefood,
      [name]: name === "image" ? files[0] : value,
    });
  }

  async function getStatefood() {
    try {
      let response = await getstatefood();
      console.log(response?.data);
    } catch (error) {
      console.log(error);
      console.log(error?.response?.data);
    }
  }

  useEffect(() => {
    getStatefood();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      let foodData = new FormData();

      foodData.append("stateid", statefood.stateid);
      foodData.append("foodname", statefood.foodname);
      foodData.append("price", statefood.price);
      foodData.append("rating", statefood.rating);
      foodData.append("foodtype", statefood.foodtype);
      foodData.append("description", statefood.description);

      if (statefood.image) {
        foodData.append("image", statefood.image);
      }

      let response = await createstatefood(foodData);

      console.log(response?.data);

      setStatefood({
        stateid: "",
        foodname: "",
        price: "",
        rating: "",
        foodtype: "",
        description: "",
        image: null,
      });
    } catch (error) {
      console.log(error);
      console.log("Axios Error:", error);
      console.log("Backend Error:", error?.response?.data);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="mx-auto max-w-3xl">

        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            State Food Management
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Add food details for a state
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-xl bg-white p-6 shadow-md md:p-8">

          <h2 className="mb-6 text-xl font-semibold text-gray-800">
            Add State Food
          </h2>

          <form onSubmit={handleSubmit}>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              {/* State ID */}
              <div>
                <label
                  htmlFor="StateID"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  State ID
                </label>

                <input
                  type="text"
                  name="stateid"
                  id="StateID"
                  value={statefood.stateid}
                  onChange={handleInput}
                  placeholder="Enter state ID"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Food Name */}
              <div>
                <label
                  htmlFor="FoodName"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Food Name
                </label>

                <input
                  type="text"
                  name="foodname"
                  id="FoodName"
                  value={statefood.foodname}
                  onChange={handleInput}
                  placeholder="Enter food name"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Price */}
              <div>
                <label
                  htmlFor="Price"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Price
                </label>

                <input
                  type="number"
                  id="Price"
                  name="price"
                  value={statefood.price}
                  onChange={handleInput}
                  placeholder="Enter price"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Rating */}
              <div>
                <label
                  htmlFor="Rating"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Rating
                </label>

                <input
                  type="number"
                  id="Rating"
                  name="rating"
                  value={statefood.rating}
                  onChange={handleInput}
                  min="0"
                  max="5"
                  step="0.1"
                  placeholder="0 - 5"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Food Type */}
              <div>
                <label
                  htmlFor="FoodType"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Food Type
                </label>

                <input
                  type="text"
                  id="FoodType"
                  name="foodtype"
                  value={statefood.foodtype}
                  onChange={handleInput}
                  placeholder="e.g. Veg / Non-Veg"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Image */}
              <div>
                <label
                  htmlFor="Image"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Food Image
                </label>

                <input
                  type="file"
                  id="Image"
                  name="image"
                  accept="image/*"
                  onChange={handleInput}
                  className="w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-600 file:mr-4 file:rounded-md file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label
                  htmlFor="Description"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Description
                </label>

                <textarea
                  id="Description"
                  name="description"
                  value={statefood.description}
                  onChange={handleInput}
                  rows="5"
                  placeholder="Enter food description"
                  className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Add Food Item
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default StateFood;

