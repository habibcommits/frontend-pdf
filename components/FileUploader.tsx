import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload, FiDownload } from 'react-icons/fi';
import { useTranslation } from 'next-i18next';
import axios from 'axios';
import Loader from './Loader';

interface FileUploaderProps {
  endpoint: string;
  accept: { [key: string]: string[] };
  multiple?: boolean;
  title: string;
}

export default function FileUploader({ endpoint, accept, multiple = true, title }: FileUploaderProps) {
  const { t } = useTranslation('common');
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    setDownloadUrl(null);
    setError(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    multiple,
  });

  const handleUpload = async () => {
    if (files.length === 0) return;

    setProcessing(true);
    setError(null);
    setDownloadUrl(null);

    const formData = new FormData();
    
    if (multiple) {
      files.forEach((file) => {
        formData.append('files', file);
      });
    } else {
      formData.append('file', files[0]);
    }

    try {
      const response = await axios.post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob',
      });

      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err) {
      setError(t('upload.error'));
      console.error('Upload error:', err);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-deep-twilight to-bright-teal bg-clip-text text-transparent">{title}</h1>
      
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
          isDragActive
            ? 'border-sky-aqua bg-gradient-to-br from-light-cyan to-frosted-light shadow-lg scale-105'
            : 'border-frosted-blue hover:border-turquoise hover:bg-gradient-to-br hover:from-light-cyan/50 hover:to-white hover:shadow-lg'
        }`}
      >
        <input {...getInputProps()} />
        <div className="bg-gradient-to-br from-bright-teal to-turquoise w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
          <FiUpload className="text-white text-4xl" />
        </div>
        <p className="text-gray-700 font-medium text-lg">{t('upload.dragDrop')}</p>
      </div>

      {files.length > 0 && !processing && (
        <div className="mt-6">
          <h3 className="font-bold text-deep-twilight mb-3 text-lg">
            {multiple ? t('upload.selectFiles') : 'Selected File'}:
          </h3>
          <ul className="bg-gradient-to-br from-light-cyan to-white rounded-xl p-5 border border-frosted-blue shadow-md">
            {files.map((file, index) => (
              <li key={index} className="text-gray-700 py-1">
                {file.name} ({(file.size / 1024).toFixed(2)} KB)
              </li>
            ))}
          </ul>
          
          <button
            onClick={handleUpload}
            disabled={processing}
            className="mt-6 w-full bg-gradient-to-r from-bright-teal to-turquoise text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-turquoise hover:to-sky-aqua disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            Process
          </button>
        </div>
      )}

      {processing && (
        <div className="mt-8 p-8 bg-gradient-to-br from-white to-light-cyan border border-frosted-blue rounded-2xl shadow-lg">
          <Loader size="large" text={t('upload.processing')} />
        </div>
      )}

      {error && (
        <div className="mt-6 p-5 bg-red-50 border-2 border-red-400 text-red-700 rounded-xl font-medium shadow-md">
          {error}
        </div>
      )}

      {downloadUrl && (
        <div className="mt-6 p-8 bg-gradient-to-br from-turquoise/10 to-sky-aqua/10 border-2 border-turquoise rounded-2xl shadow-xl">
          <p className="text-deep-twilight font-bold mb-6 text-lg">Processing complete!</p>
          <a
            href={downloadUrl}
            download="processed.pdf"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-turquoise to-sky-aqua text-white py-4 px-8 rounded-xl font-bold hover:from-sky-aqua hover:to-frosted-blue transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <FiDownload className="text-xl" />
            {t('upload.download')}
          </a>
        </div>
      )}
    </div>
  );
}
