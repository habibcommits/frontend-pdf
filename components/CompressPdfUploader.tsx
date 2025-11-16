import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload, FiDownload } from 'react-icons/fi';
import { useTranslation } from 'next-i18next';
import axios from 'axios';
import Loader from './Loader';

export default function CompressPdfUploader() {
  const { t } = useTranslation('common');
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dpi, setDpi] = useState(144);
  const [imageQuality, setImageQuality] = useState(75);
  const [colorMode, setColorMode] = useState('no-change');

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setDownloadUrl(null);
      setError(null);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    multiple: false,
  });

  const handleUpload = async () => {
    if (!file) return;

    setProcessing(true);
    setError(null);
    setDownloadUrl(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('dpi', dpi.toString());
    formData.append('image_quality', imageQuality.toString());
    formData.append('color_mode', colorMode);

    try {
      const response = await axios.post('/api/compress-pdf', formData, {
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
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-deep-twilight to-bright-teal bg-clip-text text-transparent mb-4">
          {t('tools.compressPdf.title')}
        </h1>
        <p className="text-xl text-gray-700 mb-6 leading-relaxed">
          {t('compress.subtitle')}
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <span className="flex items-center gap-2 bg-gradient-to-r from-turquoise/20 to-sky-aqua/20 px-4 py-2 rounded-full border border-turquoise/30">
            <span className="text-turquoise font-bold text-lg">✓</span> 
            <span className="text-deep-twilight font-medium">{t('compress.free')}</span>
          </span>
          <span className="flex items-center gap-2 bg-gradient-to-r from-turquoise/20 to-sky-aqua/20 px-4 py-2 rounded-full border border-turquoise/30">
            <span className="text-turquoise font-bold text-lg">✓</span> 
            <span className="text-deep-twilight font-medium">{t('compress.online')}</span>
          </span>
          <span className="flex items-center gap-2 bg-gradient-to-r from-turquoise/20 to-sky-aqua/20 px-4 py-2 rounded-full border border-turquoise/30">
            <span className="text-turquoise font-bold text-lg">✓</span> 
            <span className="text-deep-twilight font-medium">{t('compress.noLimits')}</span>
          </span>
          <span className="flex items-center gap-2 bg-gradient-to-r from-turquoise/20 to-sky-aqua/20 px-4 py-2 rounded-full border border-turquoise/30">
            <span className="text-turquoise font-bold text-lg">✓</span> 
            <span className="text-deep-twilight font-medium">{t('compress.secure')}</span>
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
              isDragActive
                ? 'border-sky-aqua bg-gradient-to-br from-light-cyan to-frosted-light shadow-lg scale-105'
                : 'border-frosted-blue hover:border-turquoise hover:bg-gradient-to-br hover:from-light-cyan/50 hover:to-white hover:shadow-lg'
            }`}
          >
            <input {...getInputProps()} />
            <div className="bg-gradient-to-br from-french-blue to-bright-teal w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <FiUpload className="text-white text-4xl" />
            </div>
            <p className="text-gray-700 font-medium text-lg">{t('upload.dragDrop')}</p>
          </div>

          {file && !processing && (
            <div className="mt-6">
              <h3 className="font-bold text-deep-twilight mb-3 text-lg">{t('compress.selectedFile')}:</h3>
              <div className="bg-gradient-to-br from-light-cyan to-white rounded-xl p-5 border border-frosted-blue shadow-md">
                <p className="text-gray-700">
                  {file.name} ({(file.size / 1024).toFixed(2)} KB)
                </p>
              </div>
              
              <button
                onClick={handleUpload}
                className="mt-6 w-full bg-gradient-to-r from-french-blue to-bright-teal text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-bright-teal hover:to-turquoise transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                {t('compress.compress')}
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
              <p className="text-deep-twilight font-bold mb-6 text-lg">{t('compress.complete')}</p>
              <a
                href={downloadUrl}
                download="compressed.pdf"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-turquoise to-sky-aqua text-white py-4 px-8 rounded-xl font-bold hover:from-sky-aqua hover:to-frosted-blue transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <FiDownload className="text-xl" />
                {t('upload.download')}
              </a>
            </div>
          )}
        </div>

        <div className="bg-gradient-to-br from-white to-light-cyan border-2 border-frosted-blue rounded-2xl p-6 h-fit shadow-lg">
          <h3 className="font-bold text-xl mb-6 bg-gradient-to-r from-deep-twilight to-bright-teal bg-clip-text text-transparent">{t('compress.settings')}</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-deep-twilight mb-3">
                DPI
              </label>
              <input
                type="range"
                min="72"
                max="300"
                step="1"
                value={dpi}
                onChange={(e) => setDpi(Number(e.target.value))}
                className="w-full h-2 bg-frosted-blue rounded-lg appearance-none cursor-pointer accent-turquoise"
              />
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>72</span>
                <span className="font-bold text-bright-teal text-base">{dpi}</span>
                <span>300</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-deep-twilight mb-3">
                {t('compress.imageQuality')}
              </label>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={imageQuality}
                onChange={(e) => setImageQuality(Number(e.target.value))}
                className="w-full h-2 bg-frosted-blue rounded-lg appearance-none cursor-pointer accent-turquoise"
              />
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>10%</span>
                <span className="font-bold text-bright-teal text-base">{imageQuality}%</span>
                <span>100%</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-deep-twilight mb-3">
                {t('compress.color')}
              </label>
              <select
                value={colorMode}
                onChange={(e) => setColorMode(e.target.value)}
                className="w-full px-4 py-3 border-2 border-frosted-blue rounded-xl focus:outline-none focus:ring-2 focus:ring-turquoise focus:border-turquoise bg-white text-gray-700 font-medium"
              >
                <option value="no-change">{t('compress.noChange')}</option>
                <option value="grayscale">{t('compress.grayscale')}</option>
                <option value="monochrome">{t('compress.monochrome')}</option>
              </select>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-sky-aqua/20 to-frosted-blue/20 border border-sky-aqua/40 rounded-xl">
            <p className="text-sm text-gray-700 leading-relaxed">
              {t('compress.info')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
