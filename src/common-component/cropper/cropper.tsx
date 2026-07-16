import { Cropper, type ReactCropperElement } from "react-cropper";
import { useRef } from "react";
import "./cropper.scss";

interface cropImg {
  image: string;
  croppedImage: (img: string) => void;
  onCrop: (blob: Blob, preview: string) => void;
  onClose: () => void;
}

const CropperPart = ({ image, croppedImage, onClose, onCrop }: cropImg) => {
  const cropperRef = useRef<ReactCropperElement>(null);

  const handleCrop = () => {
    console.log("Crop clicked");

    const cropper = cropperRef.current?.cropper;

    if (!cropper) {
      console.log("No cropper instance");
      return;
    }

    console.log("Cropper found");

    const canvas = cropper.getCroppedCanvas();

    canvas.toBlob((blob) => {
      console.log("Blob:", blob);

      if (!blob) return;

      onCrop(blob, URL.createObjectURL(blob));
      console.log("Closing modal");
      onClose();
    });
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
      <button className="secondary-button btn-container" onClick={handleCrop}>
        Crop Image
      </button>
    </div>
  );
};

export default CropperPart;
