import supabase from "./supabase";

const bucket = "posts-images";

export const uploadToStorage = async (imageFile, imageName) => {
  try {
    const { data } = await supabase.storage
      .from(bucket)
      .upload(imageName, imageFile, {
        cacheControl: "3600",
        upsert: false,
      });

    if (data === null) throw new Error("Image uploading failed");
    return data.path;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteImage = async (path) => {
  await supabase.storage.from(bucket).remove(path);
};

export const getImageUrl = (path) => {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
};
