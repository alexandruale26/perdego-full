import Resizer from "react-image-file-resizer";

export default (file) => {
  return new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      600, // width
      600, // height
      "webp", // format
      40, // quality
      0, // rotation
      (uri) => resolve(uri),
      "file", // output type
    );
  });
};
