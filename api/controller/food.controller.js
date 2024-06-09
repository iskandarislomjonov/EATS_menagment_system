import { Food } from "../../models/food.model.js";
import path from "path";
import { v4 as uuid } from "uuid";
import { CustomError } from "../../utilities/customError.js";

export const getFood = async (req, res, next) => {
  try {
    const itemsPerPage = 10;
    const pageNumber = Math.max(1, parseInt(req.query.page || 1)); // Ensure page number is at least 1

    const totalCount = await Food.countDocuments();

    const totalPages = Math.ceil(totalCount / itemsPerPage);

    if (pageNumber > totalPages) {
      throw new CustomError("Page not found", 404);
    }

    const items = await Food.find()
      .skip((pageNumber - 1) * itemsPerPage)
      .limit(itemsPerPage)
      .exec();

    res.status(200).json({
      items,
      currentPage: pageNumber,
      totalPages,
      totalItems: totalCount,
    });
  } catch (error) {
    next(error);
  }
};
export const getFoodByCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    const itemsPerPage = 10;
    const pageNumber = Math.max(1, parseInt(req.query.page || 1));

    const totalCount = await Food.countDocuments({
      foodCategoryId: categoryId,
    });

    const totalPages = Math.ceil(totalCount / itemsPerPage);

    if (pageNumber > totalPages) {
      throw new CustomError("Page not found", 404);
    }

    const items = await Food.find({ foodCategoryId: categoryId })
      .skip((pageNumber - 1) * itemsPerPage)
      .limit(itemsPerPage)
      .exec();

    res.status(200).json({
      items,
      currentPage: pageNumber,
      totalPages,
      totalItems: totalCount,
    });
  } catch (error) {
    next(error);
  }
};
export const getFoodByRestaurant = async (req, res, next) => {
  try {
    const { restaurantId } = req.params;

    const itemsPerPage = 10;
    const pageNumber = Math.max(1, parseInt(req.query.page || 1));

    const totalCount = await Food.countDocuments({ restaurantId });

    const totalPages = Math.ceil(totalCount / itemsPerPage);

    if (pageNumber > totalPages) {
      throw new CustomError("Page not found", 404);
    }

    const items = await Food.find({ restaurantId })
      .skip((pageNumber - 1) * itemsPerPage)
      .limit(itemsPerPage)
      .exec();

    res.status(200).json({
      items,
      currentPage: pageNumber,
      totalPages,
      totalItems: totalCount,
    });
  } catch (error) {
    next(error);
  }
};
export const getOneFood = async (req, res, next) => {
  try {
    const { foodId } = req.params;

    const food = await Food.findOne({ _id: foodId });

    if (!food) {
      throw new CustomError("Food not found", 404);
    }

    res.status(200).json(food);
  } catch (error) {
    next(error);
  }
};
export const addFood = async (req, res, next) => {
  try {
    const { name, price, description, restaurantId, foodCategoryId } = req.body;
    const { image } = req.files;

    const imageName = `${uuid()}${path.extname(image.name)}`;
    image.mv(process.cwd() + "/uploads/" + imageName);

    await Food.create({
      name,
      price,
      description,
      image: imageName,
      restaurantId,
      foodCategoryId,
    });

    res.status(200).json({ message: "Successfully created" });
  } catch (error) {
    next(error);
  }
};
export const editFood = async (req, res, next) => {
  try {
    const { name, price, description, restaurantId, foodCategoryId } = req.body;
    const { image } = req.files;
    const { foodId } = req.params;

    const imageName = `${uuid()}${path.extname(image.name)}`;
    image.mv(process.cwd() + "/uploads/" + imageName);

    const updatedFood = await Food.findOneAndUpdate(
      { _id: foodId },
      {
        name,
        price,
        description,
        restaurantId,
        foodCategoryId,
        image: imageName, // Assuming you have an 'image' field in your Food model
      }
    );

    if (!updatedFood) {
      throw new CustomError("Food not found", 404);
    }
    res.status(200).json({ message: "Successfully updated" });
  } catch (error) {
    next(error);
  }
};
export const deleteFood = async (req, res, next) => {
  try {
    const { foodId } = req.params;
    const deletedFood = await Food.findOneAndDelete({ _id: foodId });

    if (!deletedFood) {
      throw new CustomError("Food not found", 404);
    }

    res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    next(error);
  }
};
