import { Cropper, type ReactCropperElement } from "react-cropper";
import { useRef } from "react";
import "./cropper.scss";

interface cropImg {
  image: string;
  croppedImage: (img: string) => void;
  onClose: () => void;
}

const CropperPart = ({ image, croppedImage, onClose }: cropImg) => {
  const cropperRef = useRef<ReactCropperElement>(null);

  const croppedImg = () => {
    const cropperRefCur = cropperRef?.current?.cropper;

    if (!cropperRefCur) return;
    const croppedPerfectImg = cropperRefCur
      .getCroppedCanvas()
      .toDataURL("image/png");

    croppedImage(croppedPerfectImg);
    onClose();

    console.log("cropperref", cropperRefCur, cropperRef);
  };
  return (
    <div className="cropper-side-container">
      <Cropper
        src={image}
        style={{ height: 400, width: "100%" }}
        zoomable={true}
        scalable={true}
        rotatable={true}
        cropBoxResizable={true}
        cropBoxMovable={true}
        viewMode={1}
        dragMode="move"
        autoCropArea={1}
        guides={true}
        background={false}
        responsive={true}
        ref={cropperRef}
      />
      <button className="secondary-button btn-container" onClick={croppedImg}>
        Crop Image
      </button>
    </div>
  );
};

export default CropperPart;
