import { Cropper, type ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { useRef } from "react";
import "./cropper.scss";

interface cropImg {
  image: string;
  croppedImage?: (img: string) => void;
  onCrop: (blob: Blob, preview: string) => void;
  onClose: () => void;
}

const CropperPart = ({ image, onClose, onCrop }: cropImg) => {
  const cropperRef = useRef<ReactCropperElement>(null);

  const handleCrop = () => {
    console.log("Crop clicked");

    const cropper = cropperRef.current?.cropper;

    if (!cropper) {
      console.log("No cropper instance");
      return;
    }

    console.log("Cropper found");

    const canvas = cropper.getCroppedCanvas({
      width: 400,
      height: 400,
    });

    if (!canvas) return;

    canvas.toBlob((blob) => {
      console.log("Blob:", blob);

      if (!blob) return;

      onCrop(blob, URL.createObjectURL(blob));
      console.log("Closing modal");
      onClose();
    }, "image/jpeg", 0.9);
  };

  return (
    <div className="cropper-side-container">
      {image && (
        <Cropper
          src={image}
          style={{ height: 380, width: "100%" }}
          aspectRatio={1}
          checkCrossOrigin={false}
          zoomable={true}
          scalable={true}
          rotatable={true}
          cropBoxResizable={true}
          cropBoxMovable={true}
          viewMode={1}
          dragMode="move"
          autoCropArea={0.9}
          guides={true}
          background={true}
          responsive={true}
          ref={cropperRef}
        />
      )}
      <button className="secondary-button btn-container" onClick={handleCrop}>
        Crop Image
      </button>
    </div>
  );
};

export default CropperPart;
