import { useEffect, useState } from "react";
import { getstatefood } from "../services/foodItemservice";

const ListItem = () => {
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        setLoading(true);

        const response = await getstatefood();
        console.log(response);

        // Adjust this depending on your API response structure
        setStates(response?.data?.foodItem || []);
      } catch (error) {
        console.error("Error fetching state food items:", error);
        setStates([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStates();
  }, []);

  const handleUpdate = (id) => {
    console.log("Update:", id);
  };

  const handleDelete = (id) => {
    console.log("Delete:", id);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="rounded-lg bg-white p-3 shadow-sm">
      {/* Search Box */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Search..."
          onChange={handleSearch}
          className="rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-orange-500"
        />

        <button className="rounded-md bg-orange-500 px-5 py-2 text-white hover:bg-orange-600">
          Search
        </button>
      </div>

      {/* Buttons */}
      <div className="mb-4 flex gap-2">
        <button className="rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-orange-500">
          State
        </button>

        <button className="rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-orange-500">
          StateFood
        </button>

        <button className="rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-orange-500">
          StateFoodItem
        </button>
      </div>

      {/* Food Items Card */}
      <div className="overflow-hidden rounded-xl bg-white shadow-md">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              All FoodItems
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Manage your available state food items
            </p>
          </div>

          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
            {states.length} Items
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
              {loading ? (
                <tr>
                  <td
                    colSpan="3"
                    className="px-6 py-10 text-center text-sm text-gray-400"
                  >
                    Loading...
                  </td>
                </tr>
              ) : states.length > 0 ? (
                states.map((item) => (
                  <tr key={item._id} className="transition hover:bg-gray-50">
                    {/* Image */}
                    <td className="px-6 py-4">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.state || "Food item"}
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
                        {item.foodname}
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
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="px-6 py-10 text-center text-sm text-gray-400"
                  >
                    No food items found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
