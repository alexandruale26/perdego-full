import imageResizer from "./imageResizer";
import { uploadImage as uploadToStorage } from "../../../../services/imageApi";

const randomName = () => {
  return `${Math.floor(Math.random() * 99999999)}-${Math.floor(Math.random() * 99999999)}`;
};

export const isValidImage = (type, size) => {
  const isImageType = type.startsWith("image/");
  const isValidSize = size <= 1024 * (1024 * 8);

  return isImageType && isValidSize;
};

export const convertImage = async (file) => {
  try {
    return await imageResizer(file);
  } catch (error) {
    return { data: null, error: "Conversion failed" };
  }
};

export const uploadImage = async (file) => {
  const name = `${randomName()}.webp`;

  try {
    const uploadedPath = await uploadToStorage(file, name);

    return { data: uploadedPath, error: null };
  } catch (error) {
    console.log("Uploading failed imageUploader");
    return { data: null, error: "Uploading image failed" };
  }
};
