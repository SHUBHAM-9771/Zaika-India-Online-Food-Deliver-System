import FoodItem from "../models/foodsItem.js";

export const handlefoodItem = async (req, res) => {
  try {
    const { foodId, name, price, itemTypes, quantity, discription, image } =
      req.body;

    if (
      !foodId ||
      !name ||
      price === undefined ||
      !itemTypes ||
      quantity === undefined ||
      !discription ||
      !image
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existinFoodItem = await FoodItem.findOne({ name });

    if (existinFoodItem) {
      return res.status(400).json({
        success: false,
        message: "FiidItem is already exists",
        foodItem: existinFoodItem,
      });
    }

    const newFoodItem = await FoodItem.create({
      foodId,
      name,
      price,
      itemTypes,
      quantity,
      discription,
      image,
    });

    res.status(201).json({
      success: true,
      message: "food Item is created successfully",
      foodItem: newFoodItem,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Unable to create successful",
      error: error.message,
    });
  }
};

export const getfoodItem = async (req, res) => {
  try {
    const foodItem = await FoodItem.find();

    if (foodItem.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No foodItem is found",
        foodItem: [],
      });
    }

    res.status(200).json({
      success: true,
      message: "FoodItem Data fetch successfully",
      foodItem: foodItem,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Unable to fetch foodItems",
    });
  }
};

export const updatefoodItems = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const updatefood = await FoodItem.findByIdAndUpdate(id, req.body, {
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
      foodItem: updatefood,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Unable to update food item",
      error: error.message,
    });
  }
};

export const deletefoodItems = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedfoodItem = await FoodItem.findByIdAndDelete(id);

    if (!deletedfoodItem) {
      return res.status(404).json({
        success: false,
        message: "Food item not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Food Item deleted Successfully",
      deletedfoodItem,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Unable to delete item",
    });
  }
};
