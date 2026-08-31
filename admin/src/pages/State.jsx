import React, { useEffect, useState } from "react";
import {
  createstate,
  getstate,
  deletefood,
  updatestate,
} from "../services/stateservice";

const State = () => {
  const [states, setStates] = useState([]);
  console.log(states);
  const [state, setstate] = useState({
    state: "",
    image: "",
  });

  function handleInput(e) {
    const { name, value } = e.target;

    setstate({
      ...state,
      [name]: value,
    });
  }

  async function handleState(e) {
    e.preventDefault();

    try {
      const response = await createstate(state);

      console.log("SUCCESS:", response.data);
      console.log("Data:", response.data.state);

      setstate({
        state: "",
        image: "",
      });
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

      setStates(response.data.states);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    handleGetState();
  }, []);

  async function handleDelete(id) {
    try {
      let response = await deletefood(id);
      console.log(response.data);

      await handleGetState();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUpdate(id) {
    try {
      let selectedState = states.find((item) => item._id === id);
      console.log(selectedState);

      setstate({
        state: selectedState.state,
        image: selectedState.image,
      });

      let response = await updatestate(id, state);
      console.log(response.data);

      await handleGetState();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {/* Header */}
      <div>
        <h1>State Management</h1>
        <h2>Add and manage food state</h2>
      </div>

      {/* Add State */}
      <div>
        <h2>Add New State</h2>

        <form onSubmit={handleState}>
          <div>
            <label>State Name</label>

            <input
              type="text"
              placeholder="State"
              name="state"
              value={state.state}
              onChange={handleInput}
            />
          </div>

          <div>
            <label>Image URL</label>

            <input
              type="text"
              placeholder="Image URL"
              name="image"
              value={state.image}
              onChange={handleInput}
            />
          </div>

          <div>
            <button type="submit">Add State</button>
          </div>
        </form>
      </div>

      {/* All State */}
      <div>
        <div>
          <h1>All States</h1>
          <span>3 States</span>
        </div>

        <div>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>State</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {states?.map((state) => (
                <tr key={state._id}>
                  <td>
                    <img src={state.image} alt={state.state} width="80" />
                  </td>

                  <td>
                    <strong>{state.state}</strong>
                  </td>

                  <td>
                    <button onClick={() => handleUpdate(state._id)}>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(state._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default State;
// import React, { useState } from "react";
// import { createstate } from "../services/stateservice";
// import "../Style/State.css";

// const State = () => {
//   const [state, setState] = useState({
//     state: "",
//     image: "",
//   });

//   // Temporary states for UI
//   const [states, setStates] = useState([
//     {
//       _id: 1,
//       state: "Bihar",
//       image: "https://images.unsplash.com/photo-1595658658481-d53d3f999875",
//     },
//     {
//       _id: 2,
//       state: "Uttar Pradesh",
//       image: "https://images.unsplash.com/photo-1609766418204-94aae0ecfdfc",
//     },
//     {
//       _id: 3,
//       state: "Rajasthan",
//       image: "https://images.unsplash.com/photo-1477587458883-47145ed94245",
//     },
//   ]);

//   function handleInput(e) {
//     const { name, value } = e.target;

//     setState({
//       ...state,
//       [name]: value,
//     });
//   }

//   async function handleState(e) {
//     e.preventDefault();

//     try {
//       const response = await createstate(state);

//       console.log("SUCCESS:", response.data);

//       setStates([
//         ...states,
//         {
//           _id: Date.now(),
//           state: state.state,
//           image: state.image,
//         },
//       ]);

//       setState({
//         state: "",
//         image: "",
//       });
//     } catch (error) {
//       console.log("ERROR:", error.response?.data || error);
//     }
//   }

//   function handleEdit(item) {
//     setState({
//       state: item.state,
//       image: item.image,
//     });
//   }

//   function handleDelete(id) {
//     setStates(states.filter((item) => item._id !== id));
//   }

//   return (
//     <div className="state-container">
//       {/* Heading */}
//       <div className="state-header">
//         <h1>State Management</h1>
//         <p>Add and manage food states</p>
//       </div>

//       {/* Add State Form */}
//       <div className="state-form-card">
//         <h2>Add New State</h2>

//         <form onSubmit={handleState}>
//           <div className="form-group">
//             <label>State Name</label>

//             <input
//               type="text"
//               placeholder="Enter state name"
//               name="state"
//               value={state.state}
//               onChange={handleInput}
//             />
//           </div>

//           <div className="form-group">
//             <label>Image URL</label>

//             <input
//               type="text"
//               placeholder="https://example.com/image.jpg"
//               name="image"
//               value={state.image}
//               onChange={handleInput}
//             />
//           </div>

//           {/* Image Preview */}
//           {state.image && (
//             <div className="image-preview">
//               <p>Image Preview</p>

//               <img src={state.image} alt="Preview" />
//             </div>
//           )}

//           <button className="add-btn" type="submit">
//             Add State
//           </button>
//         </form>
//       </div>

//       {/* All States */}
//       <div className="states-card">
//         <div className="states-title">
//           <h2>All States</h2>

//           <span>{states.length} States</span>
//         </div>

//         <div className="table-wrapper">
//           <table>
//             <thead>
//               <tr>
//                 <th>Image</th>
//                 <th>State</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {states.map((item) => (
//                 <tr key={item._id}>
//                   <td>
//                     <img
//                       className="state-image"
//                       src={item.image}
//                       alt={item.state}
//                     />
//                   </td>

//                   <td>
//                     <strong>{item.state}</strong>
//                   </td>

//                   <td>
//                     <button
//                       className="edit-btn"
//                       onClick={() => handleEdit(item)}
//                     >
//                       Edit
//                     </button>

//                     <button
//                       className="delete-btn"
//                       onClick={() => handleDelete(item._id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default State;
