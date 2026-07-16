import { useRef, useState } from "react";
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

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (image && image.startsWith("blob:")) {
        URL.revokeObjectURL(image);
      }
      setImage(URL.createObjectURL(file));
      setOpenCropModal(true);
    }
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
  return (
    <div className="avatar-container">
      <img
        src={
          croppedImageData
            ? croppedImageData
            : src
              ? src
              : "/assets/icons/logo.png"
        }
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
          onClose={() => setOpenCropModal(false)}
          title={"Crop Image"}
          isOverlayVisible={false}
        >
          <CropperPart
            image={image}
            // croppedImage={setCroppedImg}
            onCrop={handleFile}
            onClose={() => setOpenCropModal(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default Avatar;
