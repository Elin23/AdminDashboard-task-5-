import React, { useRef, useState, useEffect } from "react";
import { Form, Image } from "react-bootstrap";
import './FormFile.css';
import Loader from "../Loader/Loader";

type FormFileProps = {
  label?: string;
  onChange?: (file: File) => void;
  className: string;
  defaultImage?: string;
  iconSize?: string;
  error?: string;
};

function FormFile({ label = "Profile image", onChange, className, defaultImage, iconSize, error }: FormFileProps) {
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const ImgInputRef = useRef<HTMLInputElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (defaultImage) {
      setThumbnail(defaultImage);
    }
  }, [defaultImage]);

  useEffect(() => {
    if (thumbnail) {
      setImageLoaded(false);
    }
  }, [thumbnail]);

  const handleUploadingImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setThumbnail(url);
      if (onChange) onChange(file);
    }
  };

  return (
    <Form.Group className="h-100">
      <Form.Label className={`fw-medium color-gray-01 ${iconSize == 'lg' ? 'fs-2' : 'fs-14'}`}>{label}</Form.Label>
      <Form.Control type="file" ref={ImgInputRef} accept="image/*" onChange={handleUploadingImg} className="d-none" />
      <div className={`position-relative uploading-area border rounded-4px ${className} d-flex justify-content-center align-items-center`}
        onClick={() => ImgInputRef.current?.click()}>
        {thumbnail ? (
          <>
            <Image src={thumbnail} onLoad={() => setImageLoaded(true)} className={`h-100 w-auto d-${imageLoaded ? 'block' : 'none'} object-fit-contain`} fluid thumbnail />
            {!imageLoaded && <Loader message="Uploading image..." size="sm" />}
          </>
        ) : (
          <Image src="/AdminDashboard-task-5-/assets/icons/UploadIcon.svg" className={iconSize} alt="cloud" />
        )}
      </div>
      {error && (
        <div className="text-danger mt-2 fs-14">{error}</div>
      )}

    </Form.Group>
  );
}

export default FormFile;
