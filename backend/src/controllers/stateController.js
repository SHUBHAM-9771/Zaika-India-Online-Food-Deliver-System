import State from "../models/state.js";

export const handlestate = async (req, res) => {
  try {
    const { state } = req.body;

    // Multer gives the uploaded file in req.file
    if (!state || !req.file) {
      return res.status(400).json({
        success: false,
        message: "State and image are required",
      });
    }

    // Get the filename/path from the uploaded file
    const image = req.file.filename;

    console.log("Body:", req.body);
    console.log("File:", req.file);

    // Check if state already exists
    const existstate = await State.findOne({ state });

    if (existstate) {
      return res.status(400).json({
        success: false,
        message: "State is already in your database",
        state: existstate,
      });
    }

    // Create new state
    const newstate = await State.create({
      state,
      image,
    });

    return res.status(201).json({
      success: true,
      message: "State is successfully created",
      state: newstate,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Unable to create state",
      error: error.message,
    });
  }
};
export const getStates = async (req, res) => {
  try {
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 4;

    const skip = (page - 1) * 4;

    // Get states according to pagination

    const states = await State.find().skip(skip).limit(limit);

    // Step 1 response send all data

    res.status(201).json({
      success: true,
      message: "States fetched successfully",
      states: states,
      page,
      limit,
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      success: false,
      message: "Unable to fetch states",
    });
  }
};

export const updateState = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const updatestatefood = await State.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatestatefood) {
      return res.status(404).json({
        success: false,
        message: "State food is not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "State update Successfully",
      statefood: updatestatefood,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Unable to update state food",
      error: error.message,
    });
  }
};

export const deleteState = async (req, res) => {
  try {
    const { id } = req.params;

    const deletestatefood = await State.findByIdAndDelete(id);

    if (!deletestatefood) {
      return res.status(404).json({
        success: false,
        message: "state food is not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "state food delete successfully",
      statefood: deletestatefood,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Unable to delete state food",
    });
  }
};
