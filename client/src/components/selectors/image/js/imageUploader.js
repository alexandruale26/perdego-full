import imageResizer from "./imageResizer";
import { uploadImage as uploadToStorage } from "../../../../services/imageApi";

const randomName = () => {
  return `${Math.floor(Math.random() * 99999999)}-${Math.floor(Math.random() * 99999999)}`;
};

//TODO: later when uploading see if has errors and manage them better below
export const convertImage = async (file) => {
  try {
    return await imageResizer(file);
  } catch {
    return { data: null, error: "Conversion failed" };
  }
};

export const uploadImage = async (file) => {
  const name = `${randomName()}.webp`;

  try {
    const uploadedPath = await uploadToStorage(file, name);

    return { data: uploadedPath, error: null };
  } catch {
    console.log("Uploading failed imageUploader");
    return { data: null, error: "Uploading image failed" };
  }
};
