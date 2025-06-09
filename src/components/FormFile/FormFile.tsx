import React, { useRef, useState } from "react";
import { Form, Image } from "react-bootstrap";
import './FormFile.css'
type FormFileProps = {
    label?: string;
    onChange?: (file: File) => void;
    className: string
};

function FormFile({ label = "Profile image ", onChange, className }: FormFileProps) {
    const [thumbnail, setThumbnail] = useState<string | null>(null);
    const ImgInputRef = useRef<HTMLInputElement>(null);
    const handleUploadingImg = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setThumbnail(url);
            if (onChange) onChange(file);
        }
    }
    return (
        <Form.Group className="mb-3">
            <Form.Label className="fs-14">{label}</Form.Label>
            <Form.Control type="file" ref={ImgInputRef} accept="image/*" onChange={handleUploadingImg} className="d-none" />
            <div className={`uploading-area border rounded-4px ${className} d-flex justify-content-center align-items-center`} onClick={() => ImgInputRef.current?.click()}>
                {thumbnail ? (
                    <Image src={thumbnail} thumbnail fluid />
                ) :
                    <Image src="/AdminDashboard-task-5-/assets/icons/UploadIcon.svg" alt="claud" />
                }
            </div>
        </Form.Group>
    );
};
export default FormFile
