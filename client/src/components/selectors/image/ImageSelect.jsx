import { useState, useRef } from "react";
import PropTypes from "prop-types";
import DeleteImage from "./DeleteImage";
import { cn } from "../../../lib/utils";

const ImageSelect = () => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [message, setMessage] = useState(null);
  const inputRef = useRef(null);

  const handleImageSelect = async (event) => {
    const file = event.target.files && event.target.files[0];

    if (!file || !isValidImage(file.type, file.size)) {
      setPreviewUrl(null);
      setMessage("Alege o imagine validǎ");
      return;
    }

    setPreviewUrl(URL.createObjectURL(file));
    setMessage(null);
  };

  // TODO: later clear using input by type and free ref to Form controller
  const openImageInput = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      inputRef.current.click();
    }
  };

  // TODO: later clear using input by type and free ref to Form controller
  const handleClearImage = () => {
    inputRef.current.value = "";
    setPreviewUrl(null);
  };

  return (
    <div className="w-full h-full flex justify-center">
      <div className="h-[400px] w-[600px] flex flex-col gap-2">
        <label
          tabIndex={0}
          onKeyDown={openImageInput}
          type="button"
          className={cn(
            "h-full border border-grey-4 rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-grey-950 overflow-hidden transition-colors duration-200 cursor-pointer",
            {
              "hover:bg-gray-100": !previewUrl,
            },
          )}
        >
          <input
            hidden
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={handleImageSelect}
          />

          {previewUrl === null ? (
            <div className="h-full w-full flex items-center justify-center flex-col gap-3 text-black">
              {!message ? (
                <p className="text-base">
                  Adaugǎ o imagine (
                  <span className="font-semibold">max 8 MB</span>)
                </p>
              ) : (
                <p className="text-destructive">
                  {message} (<span className="font-semibold">max 8 MB</span>)
                </p>
              )}
            </div>
          ) : (
            <img
              src={previewUrl}
              alt="post image"
              draggable="false"
              className="w-full h-full object-cover hover:brightness-[0.7] transition-brightness duration-200"
            />
          )}
        </label>

        <DeleteImage
          show={!!previewUrl}
          onClick={handleClearImage}
          className="shrink-0"
        >
          Eliminǎ imaginea
        </DeleteImage>
      </div>
    </div>
  );
};
ImageSelect.displayName = "ImageSelect";
ImageSelect.propTypes = {};

const isValidImage = (type, size) => {
  const isImageType = type.startsWith("image/");
  const isValidSize = size <= 1024 * (1024 * 8);

  return isImageType && isValidSize;
};

export default ImageSelect;
