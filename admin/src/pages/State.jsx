import React, { useEffect, useState } from "react";
import {
  createstate,
  getstate,
  deletefood,
  updatestate,
} from "../services/stateservice";

const State = () => {
  const [states, setStates] = useState([]);

  const [state, setstate] = useState({
    state: "",
    image: null,
  });

  function handleInput(e) {
    const { name, value, files } = e.target;

    setstate({
      ...state,
      [name]: name === "image" ? files[0] : value,
    });
  }

  async function handleState(e) {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("state", state.state);

      if (state.image) {
        formData.append("image", state.image);
      }

      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }
      const response = await createstate(formData);

      console.log("SUCCESS:", response.data);

      setstate({
        state: "",
        image: null,
      });

      await handleGetState();
    } catch (error) {
      console.log("Error:", error);
      console.log("Status:", error.response?.status);
      console.log("Data:", error.response?.data);
    }
  }

  async function handleGetState() {
    try {
      const response = await getstate();

      console.log("GET:", response.data);

      setStates(response.data?.states || []);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleGetState();
  }, []);

  async function handleDelete(id) {
    try {
      const response = await deletefood(id);

      console.log(response.data);

      await handleGetState();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUpdate(id) {
    try {
      const selectedState = states.find((item) => item._id === id);

      if (!selectedState) return;

      console.log("Selected State:", selectedState);

      const updateData = new FormData();

      updateData.append("state", selectedState.state);

      if (selectedState.image) {
        updateData.append("image", selectedState.image);
      }

      const response = await updatestate(id, updateData);

      console.log(response.data);

      await handleGetState();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">State Management</h1>

          <p className="mt-1 text-sm text-gray-500">
            Add and manage food states
          </p>
        </div>

        {/* Add State Card */}
        <div className="mb-8 rounded-xl bg-white p-6 shadow-md">
          <h2 className="mb-6 text-xl font-semibold text-gray-800">
            Add New State
          </h2>

          <form onSubmit={handleState}>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* State Name */}
              <div>
                <label
                  htmlFor="state"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  State Name
                </label>

                <input
                  type="text"
                  id="state"
                  placeholder="Enter state name"
                  name="state"
                  value={state.state}
                  onChange={handleInput}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Image */}
              <div>
                <label
                  htmlFor="image"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  State Image
                </label>

                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleInput}
                  className="w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-600 file:mr-4 file:rounded-md file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="mt-6">
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Add State
              </button>
            </div>
          </form>
        </div>

        {/* All States Card */}
        <div className="overflow-hidden rounded-xl bg-white shadow-md">
          {/* Table Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                All States
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Manage your available states
              </p>
            </div>

            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
              {states.length} States
            </span>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-6 py-4 font-semibold">Image</th>

                  <th className="px-6 py-4 font-semibold">State</th>

                  <th className="px-6 py-4 font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {states?.map((item) => (
                  <tr key={item._id} className="transition hover:bg-gray-50">
                    {/* Image */}
                    <td className="px-6 py-4">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.state}
                          className="h-16 w-20 rounded-lg object-cover shadow-sm"
                        />
                      ) : (
                        <div className="flex h-16 w-20 items-center justify-center rounded-lg bg-gray-100 text-xs text-gray-400">
                          No Image
                        </div>
                      )}
                    </td>

                    {/* State */}
                    <td className="px-6 py-4">
                      <span className="font-semibold text-gray-800">
                        {item.state}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleUpdate(item._id)}
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

                {states.length === 0 && (
                  <tr>
                    <td
                      colSpan="3"
                      className="px-6 py-10 text-center text-sm text-gray-400"
                    >
                      No states found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default State;
