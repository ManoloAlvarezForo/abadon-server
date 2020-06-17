import Client from "../models/client";
import { uploadFile } from "../utils/fileManager";
import { addThumbnail } from "./thumbnail";

export const getClients = async () => {
  return await Client.find({}).populate("thumb");
};

export const addClient = async (client, file) => {
  const newClient = new Client({ ...client });
  let thumb = await uploadFile(file);

  if (!thumb) {
    throw Error("[Error]: to upload file.");
  }
  thumb["name"] = client.brand;
  const thumbnailSaved = await addThumbnail(thumb);

  newClient.thumb = thumbnailSaved._id;

  const response = await newClient.save();
  return response;
};

export const getClientById = async (id) => {
  return await Client.findById(id).populate("thumb");
};

export const getClientsByFilter = async (query, properties = []) => {
  const regexToMatch = { $regex: new RegExp(query, "ig") };
  const propertiesToMatch = properties.map((property) => {
    return { [property]: regexToMatch };
  });

  if (query && properties.length > 0) {
    return await Client.aggregate([
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
    return await Client.find({});
  }
};
