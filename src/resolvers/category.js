import Category from "../models/category";
import { uploadFile } from "../utils/fileManager";
import { addThumbnail } from "./thumbnail";

/**
 * Gets all Categorys.
 */
export const getCategories = async parentId => {
  return await Category.find({parent: parentId}).populate("thumb").populate("categories");
};

export const getSubcategoriesByCategoryId = async (categoryId) => {
 const response = await getCategoryById(categoryId)
}

/**
 * Adds a new Category to Database.
 *
 * @param {object} Category Object that represents the Category.
 * @param {object} file Object that represents a file.
 */
export const addCategory = async (category, file) => {
  const newCategory = new Category({ ...category });

  if (file) {
    let thumb = await uploadFile(file);

    if (!thumb) {
      throw Error("[Error]: to upload file.");
    }
    thumb["name"] = Category.brand;
    const thumbnailSaved = await addThumbnail(thumb);

    newCategory.thumb = thumbnailSaved._id;
  }

  const response = await newCategory.save();
  return response;
};

/**
 * Gets a Category by id,
 *
 * @param {string} id String that represents the Category id.
 */
export const getCategoryById = async (id) => {
  return await Category.findById(id)
    .populate("thumb")
    .populate("categories")
    .populate({ path: "categories", populate: "thumb" });
};

/**
 * Gets Category list by a query and properties.
 *
 * @param {string} query String that represents the query.
 * @param {[string]} properties String array that represent properties.
 */
export const getCategorysByFilter = async (query, properties = []) => {
  const regexToMatch = { $regex: new RegExp(query, "ig") };
  const propertiesToMatch = properties.map((property) => {
    return { [property]: regexToMatch };
  });

  if (query && properties.length > 0) {
    return await Category.aggregate([
      {
        $match: {
          $or: propertiesToMatch,
        },
      },
      {
        $addFields: { id: { $toString: "$_id" } },
      },
    ]);
  } else {
    return await Category.find({});
  }
};

export const addCategoriesToParentByIds = async (categoriesIds, parentId) => {
  let foundTaegetCategory = await Category.findById(parentId);
  let response = null;
  for (let i = 0; i < categoriesIds.length; i++) {
    const categoryId = categoriesIds[i];
    try {
      let categoryFound = await getCategoryById(categoryId);
      categoryFound.parent = parentId;
      const categorySaved = await categoryFound.save();
      foundTaegetCategory.categories.push(categorySaved._id);
      response = await foundTaegetCategory.save();
    } catch (error) {
      console.log(`[Error]: Error to add categories to category parent.`);
    }

    return response;
  }
};

export const createCategories = async (categories) => {
  console.log("createCategories");
  let response = [];
  for (let i = 0; i < categories.length; i++) {
    const categoryItem = categories[i];
    try {
      const { category, file } = categoryItem;
      const categoryAdded = await addCategory(category, file);
      response.push(categoryAdded._id);
    } catch (error) {
      console.log(`[Error]: Error to create a category from a list`);
    }
  }

  return response;
};

export const addSubcategory = async (targetCategoryId, category, file) => {
  let response = null;

  try {
    let newCategory = await addCategory(category, file);
    let foundCategory = await getCategoryById(targetCategoryId);
    newCategory.parent = foundCategory._id;
    foundCategory.categories.push(newCategory._id);
    await newCategory.save();
    response = await foundCategory.save();
  } catch (error) {
    console.log(
      `[Error]: Error to add subcategory: Method [addSubcategory]: ${error}`
    );
  }

  return response;
};

/**
 * Adds categoris ID's to a target category id.
 *
 * @param {string} targetCategoryId id that represents the target category id.
 * @param {string} categories array that represents a category list.
 */
export const setSubcategoriesToCategory = async (
  targetCategoryId,
  categories = []
) => {
  let response = null;
  if (categories.length) {
    response = await addCategoriesToParentByIds(categories, targetCategoryId);
  }

  return response;
};
