'use client';

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { TbPhoto, TbPhotoPlus } from "react-icons/tb";
import { useCallback } from "react";

declare global {
    var cloudinary: any
}

interface ImageUploadProps {
    onChange: (value: string) => void;
    value: string
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
    const handleUpload = useCallback((result: any) => {
        onChange(result.info.secure_url);
    }, [onChange])

    return (
        // Obtain uploadPreset from Cloudinary->Settings->Upload->Add Upload Preset->Signing Mode as Unsigned->Copy generated preset name->Save
        <CldUploadWidget onUpload={handleUpload} uploadPreset="dhbugldg" options={{ maxFiles: 1 }}>
            {({ open }) => {
                return (
                    <div onClick={() => open?.()} className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600">
                        <TbPhotoPlus size={50} />
                        <div className="font-semibold text-lg">
                            Click To Upload
                        </div>
                        {value && (
                            <div className="absolute inset-0 w-full h-full">
                                <Image alt="Upload" fill style={{ objectFit: 'cover' }} src={value} />
                            </div>
                        )}
                    </div>
                )
            }}
        </CldUploadWidget>
    );
}

export default ImageUpload;