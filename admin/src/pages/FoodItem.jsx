import React, { useState, useEffect } from "react";
import {
  createfoodItem,
  getstatefood,
  deletefoodItems,
} from "../services/foodItemservice";

const FoodItem = () => {
  const [statefooditem, setStateFooditem] = useState([]);
  const [fooditem, setfoodItem] = useState({
    foodId: "",
    foodname: "",
    price: "",
    itemTypes: "",
    quantity: "",
    discription: "",
    image: null,
  });

  async function getstatefoods() {
    try {
      let response = await getstatefood();
      setStateFooditem(response?.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getstatefoods();
  }, []);

  function handleInput(e) {
    const { name, value, files } = e.target;

    setfoodItem({
      ...fooditem,
      [name]: name === "image" ? files[0] : value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      let formData = new FormData();

      formData.append("foodId", fooditem.foodId);
      formData.append("foodname", fooditem.foodname);
      formData.append("price", fooditem.price);
      formData.append("itemTypes", fooditem.itemTypes);
      formData.append("quantity", fooditem.quantity);
      formData.append("discription", fooditem.discription);

      if (fooditem.image) {
        formData.append("image", fooditem.image);
      }

      let response = await createfoodItem(formData);
      console.log(response?.data);

      await getstatefoods();

      setfoodItem({
        foodId: "",
        foodname: "",
        price: "",
        itemTypes: "",
        quantity: "",
        discription: "",
        image: null,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(id) {
    try {
      let response = await deletefoodItems(id);
      console.log(response?.data);

      await getstatefoods();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="mx-auto max-w-5xl">
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Food Item Management
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Add and manage your food items
          </p>
        </div>

        {/* Form Card */}
        <div className="mb-8 rounded-xl bg-white p-6 shadow-md">
          <h2 className="mb-6 text-xl font-semibold text-gray-800">
            Add Food Item
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Form Grid */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Food ID */}
              <div>
                <label
                  htmlFor="FoodId"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Food ID
                </label>

                <input
                  type="text"
                  id="FoodId"
                  name="foodId"
                  value={fooditem.foodId}
                  onChange={handleInput}
                  placeholder="Enter food ID"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Food Name */}
              <div>
                <label
                  htmlFor="Foodname"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Food Name
                </label>

                <input
                  type="text"
                  id="Foodname"
                  name="foodname"
                  value={fooditem.foodname}
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
                  type="text"
                  id="Price"
                  name="price"
                  value={fooditem.price}
                  onChange={handleInput}
                  placeholder="Enter price"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Item Type */}
              <div>
                <label
                  htmlFor="ItemType"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Item Type
                </label>

                <input
                  type="text"
                  id="ItemType"
                  name="itemTypes"
                  value={fooditem.itemTypes}
                  onChange={handleInput}
                  placeholder="e.g. Veg / Non-Veg"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Quantity */}
              <div>
                <label
                  htmlFor="Quantity"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Quantity
                </label>

                <input
                  type="text"
                  id="Quantity"
                  name="quantity"
                  value={fooditem.quantity}
                  onChange={handleInput}
                  placeholder="Enter quantity"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="discription"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Description
                </label>

                <input
                  type="text"
                  id="discription"
                  name="discription"
                  value={fooditem.discription}
                  onChange={handleInput}
                  placeholder="Enter description"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Image */}
              <div className="md:col-span-2">
                <label
                  htmlFor="image"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Food Image
                </label>

                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleInput}
                  className="w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm text-gray-600 file:mr-4 file:rounded-md file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-blue-700 hover:file:bg-blue-100"
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

        {/* Table Card */}
        <div className="overflow-hidden rounded-xl bg-white shadow-md">
          <div className="border-b border-gray-200 px-6 py-5">
            <h2 className="text-xl font-semibold text-gray-800">Food Items</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-6 py-4 font-semibold">Image</th>

                  <th className="px-6 py-4 font-semibold">Food Name</th>

                  <th className="px-6 py-4 font-semibold">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {statefooditem?.foodItem?.map((item) => (
                  <tr key={item._id} className="transition hover:bg-gray-50">
                    {/* Image */}
                    <td className="px-6 py-4">
                      {item.image ? (
                        <img
                          src={`http://localhost:5000/uploads/${item.image}`}
                          alt={item.foodname}
                          className="h-16 w-16 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gray-100 text-xs text-gray-400">
                          No Image
                        </div>
                      )}
                    </td>

                    {/* Food Name */}
                    <td className="px-6 py-4">
                      <span className="font-medium text-gray-800">
                        {item.foodname}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          className="rounded-md bg-yellow-100 px-4 py-2 text-xs font-semibold text-yellow-700 transition hover:bg-yellow-200"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(item._id)}
                          className="rounded-md bg-red-100 px-4 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-200"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
