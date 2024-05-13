"use client"
import React, { useRef, useState } from 'react';
import axios from 'axios';
import FileUpload from '@/components/Molecules/FileUpload';
import UploadButton from '@/components/Molecules/UploadButton';
import UploadedFile from '@/components/Organisms/UploadedFile';
import Image from 'next/image';

const Page: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<{ [key: string]: number }>({});
  const [errorFiles, setErrorFiles] = useState<File[]>([]);
  const [successFiles, setSuccessFiles] = useState<File[]>([]);

  const refInput = useRef<HTMLInputElement>(null);

  const handleUpload = async () => {
    if (files.length <= 0) return; // Return early if there are no files to upload

    setUploading(true);
    const uploadPromises: Promise<void>[] = [];

    // Filter through the files and upload each one individually
    files.filter((f) => !successFiles.includes(f)).forEach((file) => {
      const formData = new FormData();
      formData.append('image', file);

      const promise = axios
        .post('https://api.imgur.com/3/image', formData, {
          headers: {
            Authorization: 'Client-ID 546c25a59c58ad7',
          },
          onUploadProgress: (progressEvent: any) => {
            const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgress((prevProgress) => ({ ...prevProgress, [file.name]: percent }));
          }
        })
        .then(() => {
          setSuccessFiles((prevSuccessFiles) => [...prevSuccessFiles, file])
          setErrorFiles((prevErrorFiles) => prevErrorFiles.filter((errorFile) => errorFile.name !== file.name))
        })
        .catch(() => {
          if (!errorFiles.includes(file)) {
            setErrorFiles((prevErrorFiles) => [...prevErrorFiles, file])
          }
        })
        .finally(() => setProgress((prevProgress) => ({ ...prevProgress, [file.name]: 100 })));

      uploadPromises.push(promise);
    });

    try {
      await Promise.all(uploadPromises);
    } finally {
      setUploading(false);
    }
  };


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);

    newFiles.forEach((newFile) => {
      if (!files.some((file) => file.name === newFile.name)) {
        setFiles((prevFiles) => [...prevFiles, newFile]);
      }
    });
  };

  const handleRemove = (fileToRemove: File) => {
    setFiles((prevFiles) => {
      const newFile = prevFiles.filter((file) => file.name !== fileToRemove.name);
      const newFileList = new DataTransfer();
      newFile.forEach((file) => newFileList.items.add(file));
      refInput.current!.files = newFileList.files;
      return newFile;
    });

    setErrorFiles((prevErrorFiles) => prevErrorFiles.filter((file) => file.name !== fileToRemove.name));
    setSuccessFiles((prevSuccessFiles) => prevSuccessFiles.filter((file) => file.name !== fileToRemove.name));
    setProgress((prevProgress) => ({ ...prevProgress, [fileToRemove.name]: 0 }));
  };

  return (
    <div>
      <Image src={'https://appota.com/static/media/appota_w.16adc1b5.svg'} alt='logo' height={100} width={200} className='m-5'/>
      <div className='flex justify-center'>
        <div className="p-4 m-5 border xl:max-w-[1200px] sm:w-full border-gray-300">
          <div className="flex items-center justify-center w-full">
            <FileUpload handleFileChange={handleFileChange} refInput={refInput}/>
          </div>

          <div className='flex justify-end gap-3 mt-2'>
            <p className='text-green-500 font-medium'>Success: {successFiles.length}/{files.length}</p>
            <p className='text-red-500'>Error: {errorFiles.length}/{files.length}</p>
          </div>

          {/* List of uploaded files start */}
          <div className='overflow-y-auto max-h-[500px]'>
            {files.map((file) => (
              <UploadedFile key={file.name} file={file} progress={progress[file.name]} success={successFiles.includes(file)} error={errorFiles.includes(file)} handleRemove={handleRemove} uploading={uploading}/>
            ))}
          </div>
          {/* List of uploaded files end */}
          
          <div className='flex justify-center'>
            <UploadButton handleUpload={handleUpload} uploading={uploading} disable={files.length === 0} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Page;
