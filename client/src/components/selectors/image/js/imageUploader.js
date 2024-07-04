// import { uploadImage } from "@/services/imageApi";
import { IMAGE_EXTENSION } from "./consts";

const uploadImage = async () => console.log("set image uploader api");

const imageRandomName = () => {
  return `${Math.floor(Math.random() * 99999999)}-${Math.floor(Math.random() * 99999999)}`;
};

export const imageUploader = async (files) => {
  const imageUniqueName = imageRandomName();
  const small = `${imageUniqueName}-small.${IMAGE_EXTENSION}`;
  const large = `${imageUniqueName}-large.${IMAGE_EXTENSION}`;

  const names = [small, large];

  try {
    const promises = files.map(async (data, index) => {
      const uploadedImage = await uploadImage(data, names[index]);
      return uploadedImage;
    });

    const uploaded = await Promise.all(promises);
    return { data: uploaded, error: null };
  } catch (error) {
    console.log("Uploading failed imageUploader");
    return { data: null, error: "Uploading images failed" };
  }
};
