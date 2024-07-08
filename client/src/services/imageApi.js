import supabase from "./supabase";

const bucket = "posts-images";

export const uploadImage = async (imageFile, imageName) => {
  try {
    const { data } = await supabase.storage
      .from(bucket)
      .upload(imageName, imageFile, {
        cacheControl: "3600",
        upsert: false,
      });

    if (data === null) throw new Error("Received path is null");
    return data.path;
  } catch {
    console.log("Uploading failed");
    throw new Error("Uploading failed");
  }
};

export const deleteImage = async (paths) => {
  try {
    const data = await supabase.storage.from(bucket).remove(paths);

    console.log("removed - images");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getImageUrl = (path) => {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
};
