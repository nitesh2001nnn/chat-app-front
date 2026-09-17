import { useEffect, useRef, useState } from "react";
import "./avatar.scss";
import CropperPart from "../cropper/cropper";
import Modal from "../modal/modal";

type avatarProps = {
  src?: string;
  addNeeded?: boolean;
  onCrop?: (blob: Blob) => Promise<void> | void;
};

const Avatar = ({ src, addNeeded = true, onCrop }: avatarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState("");
  const [croppedImageData, setCroppedImg] = useState<string>("");
  const [openCropperModal, setOpenCropModal] = useState<boolean>(false);

  const handleImage = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setImage(reader.result);
          setOpenCropModal(true);
        }
      };
      reader.readAsDataURL(file);
    }
    e.target.value = "";
  };

  const handleFile = (blob: Blob, preview: string) => {
    console.log("lob is what", blob);
    if (croppedImageData && croppedImageData.startsWith("blob:")) {
      URL.revokeObjectURL(croppedImageData);
    }
    setCroppedImg(preview);
    onCrop?.(blob);
  };
  const handleClick = () => {
    inputRef?.current?.click();
  };
  const [hasError, setHasError] = useState(false);

  // Reset error state whenever src changes so new/loaded images can display
  useEffect(() => {
    setHasError(false);
  }, [src]);

  return (
    <div className="avatar-container">
      <img
        src={
          croppedImageData
            ? croppedImageData
            : !hasError && src
              ? src
              : "/assets/icons/Avatar.svg"
        }
        onError={() => setHasError(true)}
        alt="avatar"
      />
      {addNeeded && (
        <div className="add-btn">
          <img src="./assets/icons/new_add.png" onClick={handleClick} />
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleImage}
          />
        </div>
      )}
      {image && openCropperModal && (
        <Modal
          onClose={() => {
            setOpenCropModal(false);
            setImage("");
          }}
          title={"Crop Image"}
          isOverlayVisible={true}
        >
          <CropperPart
            image={image}
            onCrop={handleFile}
            onClose={() => {
              setOpenCropModal(false);
              setImage("");
            }}
          />
        </Modal>
      )}
    </div>
  );
};

export default Avatar;
