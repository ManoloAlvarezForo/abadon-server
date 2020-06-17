import Thumbnail from "../models/thumbnail";

export const getThumbnails = async () => {
  return await Thumbnail.find({});
};

export const addThumbnail = async (thumb) => {
  try {
    const newThumbnail = new Thumbnail({ ...thumb });
    const response = await newThumbnail.save();
    return response;
  } catch (error) {
    console.log(`[Error]: Error to save thumbnail: ${error}`);
    throw Error(`[Error]: Error to save thumbnail: ${error}`);
  }
};

export const addThumbnails = async (thumbs) => {
  let response = [];
  try {
    for (let index = 0; index < thumbs.length; index++) {
      const thumb = thumbs[index];
      const newThumbnail = new Thumbnail({ ...thumb });
      const newThumb = await newThumbnail.save();
      response.push(newThumb._id);
    }

    return response;
  } catch (error) {
    console.log(`[Error]: Error to save thumbnail: ${error}`);
    throw Error(`[Error]: Error to save thumbnail: ${error}`);
  }
};

export const getThumbnailById = async (id) => {
  return await Thumbnail.findById(id);
};

export const getThumbnailsByFilter = async (query, properties = []) => {
  const regexToMatch = { $regex: new RegExp(query, "ig") };
  const propertiesToMatch = properties.map((property) => {
    return { [property]: regexToMatch };
  });

  if (query && properties.length > 0) {
    return await Thumbnail.aggregate([
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
    return await Thumbnail.find({});
  }
};
