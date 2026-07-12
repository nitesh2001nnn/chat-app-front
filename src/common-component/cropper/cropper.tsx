import { Cropper, type ReactCropperElement } from "react-cropper";
import { useRef } from "react";

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
    <>
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
      <button className="primary-button" onClick={croppedImg}>
        Crop Image
      </button>
      ;
    </>
  );
};

export default CropperPart;
