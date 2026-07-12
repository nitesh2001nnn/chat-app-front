import { useRef, useState } from "react";
import "./avatar.scss";
import CropperPart from "../cropper/cropper";
import Modal from "../modal/modal";

type avatarProps = {
  src: string;
  addNeeded: boolean;
};

const Avatar = ({ src, addNeeded = true }: avatarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState("");
  const [croppedImageData, setCroppedImg] = useState<string>("");
  const [openCropperModal, setOpenCropModal] = useState<boolean>(false);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setOpenCropModal(true);
    }
  };
  const handleClick = () => {
    inputRef?.current?.click();
  };
  return (
    <div className="avatar-container">
      <img
        src={
          src
            ? src
            : croppedImageData
              ? croppedImageData
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
            croppedImage={setCroppedImg}
            onClose={() => setOpenCropModal(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default Avatar;
