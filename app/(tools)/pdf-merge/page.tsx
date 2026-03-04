'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  DocumentTextIcon,
  ArrowUpTrayIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  XCircleIcon,
  DocumentDuplicateIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';

export default function PdfMergePage() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [mergedFile, setMergedFile] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const selectedFiles = e.target.files;
    
    if (!selectedFiles) return;

    const pdfFiles = Array.from(selectedFiles).filter(file => 
      file.type === 'application/pdf'
    );

    if (pdfFiles.length === 0) {
      setError('Please select PDF files only');
      return;
    }

    if (pdfFiles.length < 2) {
      setError('Please select at least 2 PDF files to merge');
      return;
    }

    setFiles(prev => [...prev, ...pdfFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setMergedFile(null);
    setSuccess(false);
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      setError('Please select at least 2 PDF files');
      return;
    }

    setLoading(true);
    setError(null);

    // شبیه‌سازی فرآیند ادغام
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setMergedFile('#');
    }, 2000);
  };

  const handleDownload = () => {
    // اینجا بعداً دانلود واقعی اضافه می‌شود
    alert('Download feature coming soon!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl mb-4">
            <DocumentDuplicateIcon className="w-8 h-8" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Merge PDF Files
          </h1>
          <p className="text-xl text-gray-600">
            Combine multiple PDF files into one document. Fast, free, and secure.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            
            {/* Upload Area */}
            {files.length === 0 ? (
              <div className="p-12 text-center">
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 hover:border-blue-400 transition-colors">
                  <ArrowUpTrayIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg text-gray-700 mb-2">
                    Drag & drop PDF files here
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    or
                  </p>
                  <label className="inline-block">
                    <input
                      type="file"
                      accept=".pdf"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <span className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors cursor-pointer">
                      Browse Files
                    </span>
                  </label>
                  <p className="text-xs text-gray-400 mt-4">
                    Select at least 2 PDF files
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-6">
                {/* Error Message */}
                {error && (
                  <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-center gap-2">
                    <XCircleIcon className="w-5 h-5" />
                    {error}
                  </div>
                )}

                {/* Success Message */}
                {success && (
                  <div className="mb-4 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg flex items-center gap-2">
                    <CheckCircleIcon className="w-5 h-5" />
                    PDF files merged successfully!
                  </div>
                )}

                {/* File List */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Selected Files ({files.length})
                  </h3>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <DocumentTextIcon className="w-5 h-5 text-blue-600" />
                          <span className="text-sm text-gray-700">{file.name}</span>
                          <span className="text-xs text-gray-500">
                            ({(file.size / 1024).toFixed(1)} KB)
                          </span>
                        </div>
                        <button
                          onClick={() => removeFile(index)}
                          className="text-gray-400 hover:text-red-600"
                        >
                          <XCircleIcon className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  {!mergedFile ? (
                    <>
                      <label className="flex-1">
                        <input
                          type="file"
                          accept=".pdf"
                          multiple
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        <span className="block text-center border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:border-blue-400 hover:text-blue-600 transition-colors cursor-pointer">
                          Add More Files
                        </span>
                      </label>
                      <button
                        onClick={handleMerge}
                        disabled={loading}
                        className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <span className="flex items-center justify-center gap-2">
                            <ArrowPathIcon className="w-5 h-5 animate-spin" />
                            Merging...
                          </span>
                        ) : (
                          'Merge PDFs'
                        )}
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleDownload}
                      className="flex-1 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <ArrowDownTrayIcon className="w-5 h-5" />
                      Download Merged PDF
                    </button>
                  )}
                </div>

                {/* Reset Button */}
                {mergedFile && (
                  <button
                    onClick={() => {
                      setFiles([]);
                      setMergedFile(null);
                      setSuccess(false);
                    }}
                    className="mt-3 w-full text-center text-gray-500 hover:text-gray-700 text-sm"
                  >
                    ← Start Over
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Features Info */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="text-center">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <DocumentDuplicateIcon className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-sm text-gray-600">Merge multiple PDFs</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <CheckCircleIcon className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-sm text-gray-600">Free & secure</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <ArrowPathIcon className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-sm text-gray-600">Fast processing</p>
            </div>
          </div>

          {/* Note */}
          <p className="text-xs text-gray-400 text-center mt-8">
            Note: This is a demo version. PDF merge functionality coming soon.
          </p>
        </div>
      </div>
    </div>
  );
}