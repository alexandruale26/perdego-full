import { useState, forwardRef } from "react";
import PropTypes from "prop-types";
import RemoveImageButton from "./RemoveImageButton";
import { cn } from "../../../lib/utils";

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
            ref={ref}
            onChange={handleImageSelect}
            {...props}
          />

          {previewUrl === null ? (
            <div className="h-full w-full flex items-center justify-center flex-col gap-3 text-black">
              <p className="text-base">
                Adaugǎ o imagine (
                <span className="font-semibold">max 8 MB</span>)
              </p>
              {invalidImageFile && (
                <p className="text-sm text-destructive">Imagine invalidǎ</p>
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
