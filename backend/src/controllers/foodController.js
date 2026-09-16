import Statefood from "../models/foods.js";

export const handlefoods = async (req, res) => {
  try {
    const { stateid, foodname, price, rating, foodtype, description } =
      req.body;

    console.log(req.body);

    // Step 2 check all field are required
    if (
      !stateid ||
      !foodname ||
      price === undefined ||
      rating === undefined ||
      !foodtype ||
      !description ||
      !req.file
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // step 3 Check existing food in same state
    const existingfoodState = await Statefood.findOne({ stateid, foodname });
    if (existingfoodState) {
      return res.status(400).json({
        success: false,
        message: "This food already exists in the state",
        foods: existingfoodState,
      });
    }

    const image = req.file.filename;

    // create food
    const newStatefood = await Statefood.create({
      stateid,
      foodname,
      price,
      rating,
      foodtype,
      description,
      image,
    });

    // step 3 response frontend
    return res.status(201).json({
      success: true,
      message: "Statefood wise has created successful",
      statefood: newStatefood,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Unable to created",
    });
  }
};
export const getfoods = async (req, res) => {
  try {
    const foods = await Statefood.find();

    if (foods.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No food Item is found",
        foods: [],
      });
    }

    res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      foods: foods,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to fetch food item",
      error: error.message,
    });
  }
};

export const updatestateFoodItem = async (req, res) => {
  try {
    const { id } = req.params;

    const updatefood = await Statefood.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatefood) {
      return res.status(404).json({
        success: false,
        message: "Food item not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Food item updated successfully",
      statefood: updatefood,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Unable to update food item",
      error: error.message,
    });
  }
};

export const deletestateFoodItem = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedStatefood = await Statefood.findByIdAndDelete(id);
    console.log(deletedStatefood);

    if (!deletedStatefood) {
      return res.status(404).json({
        success: false,
        message: "Food item not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Food item delete successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Unable to delete food item",
      error: error.message,
    });
  }
};
