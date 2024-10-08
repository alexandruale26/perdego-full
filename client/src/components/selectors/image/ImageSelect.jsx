import { useState, forwardRef } from "react";
import PropTypes from "prop-types";
import RemoveImageButton from "./RemoveImageButton";
import { cn } from "../../../utils/cn";

const ImageSelect = forwardRef(({ onChange, ...props }, ref) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [invalidImageFile, setInvalidImageFile] = useState(false);

  delete props.value;

  const reset = () => {
    onChange(undefined);
    setPreviewUrl(null);
  };

  const handleImageSelect = (event) => {
    if (event.target.files.length === 0) return setInvalidImageFile(false);

    const file = event.target.files[0];
    if (!isValidImage(file.type, file.size)) {
      reset();
      return setInvalidImageFile(true);
    }

    onChange(file);
    setPreviewUrl(URL.createObjectURL(file));
    setInvalidImageFile(false);
  };

  const openImageInput = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      const input = document.querySelector("input[type=file]");
      input.click();
    }
  };

  const handleClearImage = () => {
    const input = document.querySelector("input[type=file]");
    input.value = null;
    reset();
  };

  return (
    <div className="w-full h-full flex justify-center">
      <div className="h-[450px] w-[550px] flex flex-col gap-2">
        <label
          tabIndex={0}
          onKeyDown={openImageInput}
          type="button"
          className={cn(
            "h-full border border-grey-4 rounded-md focus-visible:outline-0 focus-visible:ring-1 focus-visible:border-primary focus-visible:ring-primary overflow-hidden transition-colors duration-200 cursor-pointer",
            { "hover:bg-[#c6dd604d]": !previewUrl },
          )}
        >
          <input
            hidden
            type="file"
            accept="image/*"
            ref={ref}
            onChange={handleImageSelect}
            {...props}
          />

          {previewUrl === null ? (
            <div className="h-full w-full flex items-center justify-center flex-col gap-3 text-black">
              <div className="flex flex-col justify-center gap-2">
                <div className="w-full flex justify-center">
                  <img
                    width="80px"
                    src="/cameraIcon.png"
                    alt="camera icon"
                    className="contrast-[0.7]"
                  />
                </div>
                <span>Adaugǎ o imagine (max 8 MB)</span>
              </div>
              {invalidImageFile && (
                <p className="text-sm text-destructive">Imagine invalidǎ</p>
              )}
            </div>
          ) : (
            <img
              src={previewUrl}
              alt="post image"
              draggable="false"
              className="w-full h-full object-cover hover:brightness-[0.7]"
            />
          )}
        </label>

        <RemoveImageButton
          show={!!previewUrl}
          onClick={handleClearImage}
          className="shrink-0"
        >
          Eliminǎ imaginea
        </RemoveImageButton>
      </div>
    </div>
  );
});
ImageSelect.displayName = "ImageSelect";
ImageSelect.propTypes = { onChange: PropTypes.func, value: PropTypes.any };

const isValidImage = (type, size) => {
  const isImageType = type.startsWith("image/");
  const isValidSize = size <= 1024 * (1024 * 8);

  return isImageType && isValidSize;
};

export default ImageSelect;
