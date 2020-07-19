import Category from "../models/category";
import { uploadFile } from "../utils/fileManager";
import { addThumbnail } from "./thumbnail";

/**
 * Gets all Categorys.
 */
export const getCategorys = async () => {
  return await Category.find({}).populate("thumb");
};

/**
 * Adds a new Category to Database.
 *
 * @param {object} Category Object that represents the Category.
 * @param {object} file Object that represents a file.
 */
export const addCategory = async (category, file) => {
  const newCategory = new Category({ ...category });
  let thumb = await uploadFile(file);

  if (!thumb) {
    throw Error("[Error]: to upload file.");
  }
  thumb["name"] = Category.brand;
  const thumbnailSaved = await addThumbnail(thumb);

  newCategory.thumb = thumbnailSaved._id;

  const response = await newCategory.save();
  return response;
};

/**
 * Gets a Category by id,
 *
 * @param {string} id String that represents the Category id.
 */
export const getCategoryById = async (id) => {
  return await Category.findById(id).populate("thumb");
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

addCategoriesToParentByIds = async (categoriesIds, parentId) => {
  // let foundTaegetCategory = await Category.findById(parentId);
  // const categoriesIds = categoriesIds.map(c => {
  //   try {
  //     let categoryFound = await getCategoryById(c.id);
  //     categoryFound.parent = parentId;
  //     const categorySaved = await categoryFound.save();
  //     return categorySaved._id;
  //   } catch (error) {
  //     console.log(`[Error]: Error to get category id [${c.id}]: ${error}`)
  //   }
  // });
  // foundTaegetCategory.categories = [...foundTaegetCategory.categories, ...categoriesIds]
  // response = await foundTaegetCategory.save();
};

createCategories = async (categories) => {
  let response = [];
  for (let i = 0; i < categories.length; i++) {
    const categoryItem = categoriesIds[i];
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

export const createSubcategoriesToCategory = async (
  targetCategoryId,
  subcategories = []
) => {
  let response = null;
  if (subcategories.length) {
    let foundTaegetCategory = await Category.findById(targetCategoryId);
    const categoriesIds = getCategoriesByIds(subcategories);
  }

  return response;
};
