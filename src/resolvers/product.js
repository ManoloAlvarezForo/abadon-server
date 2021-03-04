import Product from "../models/product";
import { getUserById } from "../resolvers/user";
import { getClientById } from "../resolvers/client";
import { getCategoryById, createCategories } from "./category";
import { addThumbnails } from "../resolvers/thumbnail";
import { uploadFiles } from "../utils/fileManager";

// export const getProducts = async () => {
//   return await Product.find({})
//     .populate("thumbs")
//     .populate("client")
//     .populate({ path: "client", populate: "thumb" })
//     .populate("type")
//     .populate("categories");
// };

export const getProducts = async () => {
  return await Product.find({})
    .populate("thumbs")
    .populate("client")
    .populate({ path: "client", populate: "thumb" });
};


/**
 * Adds a new product in the product collection.
 *
 * @param {object} product Product to add.
 * @param {object} pubsub for Subscriptions.
 */
export const addProduct = async (clientId, product, files = []) => {
  try {
    let newProduct = new Product({ ...product });
    let thumbs = await uploadFiles(files);

    if (!thumbs) {
      throw Error("[Error]: to upload file.");
    }
    // thumb["name"] = product.productName;
    const thumbnailsSaved = await addThumbnails(thumbs);

    newProduct.thumbs = thumbnailsSaved;
    // let productSaved = {};
    console.log(`[INFO]: product added succsessfully.`);

    if (clientId) {
      let foundClient = await getClientById(clientId);
      newProduct.client = foundClient._id;
      // productSaved = await newProduct.save();
      // foundClient.products.unshift(productSaved._id);
      // await foundClient.save();
      console.log(`[INFO]: product added to a client succsessfully.`);
    }
    // {
    //   productSaved = await newProduct.save();
    // }

    // if (type) {
    //   console.log("Category ID: ", type);
    //   const foundType = await getCategoryById(type);
    //   newProduct.type = foundType._id;
    // }

    // console.log(categories);
    // const categoriesResponse = await createCategories(categories);

    // if (categoriesResponse) {
    //   newProduct.categories = [...newProduct.categories, categoriesResponse];
    // }

    // productSaved = await newProduct.save();
    // console.log(productSaved);
    // const productPopulated = await getProductById(productSaved.id);
    return await newProduct.save();
  } catch (error) {
    console.log(`[Error]: Error to save a product. `, error);
  }
  // Subscription send
  // pubsub.publish("productAdded", {
  //   productAdded: response,
  // });
};

/**
 * Gets a Product model by ID.
 *
 * @param {string} id String that represents an ID.
 */
export const getProductById = async (id) => {
  const foundProduct = await Product.findById(id)
    .populate("thumbs")
    .populate("client")
    .populate({ path: "client", populate: "thumb" });
  return foundProduct;
};

export const getProductsByCategoryId = async categoryId => {
  return await Product.find({ categories: { $in: categoryId } })
    .populate("thumbs")
    .populate("client")
    .populate({ path: "client", populate: "thumb" });
};

// export const getAllPromos = async 

export const getPromoProductsByCategory = async categoryId => {
  return await Product.find({ categories: { $in: categoryId }, promo: true })
  .populate("thumbs")
  .populate("client")
  .populate({ path: "client", populate: "thumb" }); 
}


/**
 * Gets an product array by filter and properties.
 *
 * @param {string} query String that represents a Query.
 * @param {string[]} properties Array of string that represent properties.
 */
export const getProductsByFilter = async (query, properties = []) => {
  const regexToMatch = { $regex: new RegExp(query, "ig") };
  const propertiesToMatch = properties.map((property) => {
    return { [property]: regexToMatch };
  });

  if (query && properties.length > 0) {
    return await Product.aggregate([
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
    return await Product.find({});
  }
};

export const getProductsByCategory = async (category) => {
  const response = await Product.aggregate([
    {
      $match: {
        categories: category,
      },
    },
    {
      $addFields: { id: { $toString: "$_id" } },
    },
  ]);

  return response;
};

/**
 * Gets the enum values from product categories.
 */
export const getProductCategories = () => {
  const categories = Product.schema.path("categories").caster.enumValues;
  const response = categories.map((category) => {
    return { name: category };
  });

  return response;
};

/**
 * Adds a comment according product id and user id.
 *
 * @param {string} comment String that represents a comment.
 * @param {string} productId String that represents a product id.
 * @param {string} userId String that represents a user id.
 */
export const addComment = async (comment, productId, userId) => {
  try {
    let foundProduct = await getProductById(productId);
    const { name } = await getUserById(userId);
    foundProduct.comments.unshift({
      comment: comment,
      user: name,
      userId: userId,
    });
    const productSaved = await foundProduct.save();

    return productSaved.comments[0];
  } catch (error) {
    throw Error(`[ERROR]: Error to add a comment`);
  }
};

/**
 * Gets comments from a product according a product id.
 *
 * @param {string} productId String that represents a product id.
 */
export const comments = async (productId) => {
  const { comments } = await getProductById(productId);
  return comments;
};
