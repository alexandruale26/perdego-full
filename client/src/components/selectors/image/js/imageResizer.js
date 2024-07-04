import Resizer from "react-image-file-resizer";

// TODO: object with options, beside file
const resizeImage = (file, maxWidth, maxHeight, compressFormat, quality) => {
  return new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      maxWidth,
      maxHeight,
      compressFormat, // format
      quality, // quality
      0, // rotation
      (uri) => {
        resolve(uri);
      },
      "file", // output type
    );
  });
};

export default resizeImage;
