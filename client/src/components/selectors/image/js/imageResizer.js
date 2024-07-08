import Resizer from "react-image-file-resizer";

export default (file) => {
  return new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      500, // width
      500, // height
      "webp", // format
      60, // quality
      0, // rotation
      (uri) => resolve(uri),
      "file", // output type
    );
  });
};
