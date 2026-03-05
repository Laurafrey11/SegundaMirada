import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { UploadCloud, FileText, X, AlertCircle } from 'lucide-react';
import { AdmissionFormData } from '../../types/admission';

interface Props {
  data: File[];
  updateData: (files: File[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepFiles({ data, updateData, onNext, onBack }: Props) {
  const { t } = useTranslation();
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files) as File[];
      updateData([...data, ...newFiles]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files) as File[];
      updateData([...data, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = [...data];
    newFiles.splice(index, 1);
    updateData(newFiles);
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900">{t('admission.files_title')}</h2>
        <p className="text-slate-500 mt-2">{t('admission.files_subtitle')}</p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 text-amber-800 text-sm">
        <AlertCircle className="w-5 h-5 shrink-0 text-amber-600" />
        <p>
          <strong>{t('admission.labels.important')}:</strong> {t('admission.placeholders.files_important')}
        </p>
      </div>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${
          isDragging
            ? 'border-blue-500 bg-blue-50'
            : 'border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-slate-400'
        }`}
      >
        <input
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileSelect}
        />
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center text-blue-600">
            <UploadCloud className="w-8 h-8" />
          </div>
          <div>
            <p className="text-lg font-medium text-slate-900">{t('admission.labels.drag_drop')}</p>
            <p className="text-sm text-slate-500 mt-1">{t('admission.labels.click_select')}</p>
          </div>
        </div>
      </div>

      {data.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-slate-700">{t('admission.labels.attached_files')} ({data.length})</h3>
          <ul className="space-y-2">
            {data.map((file, idx) => (
              <li key={idx} className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl shadow-sm">
                <div className="flex items-center gap-3 overflow-hidden">
                  <FileText className="w-5 h-5 text-blue-500 shrink-0" />
                  <span className="text-sm font-medium text-slate-700 truncate">{file.name}</span>
                  <span className="text-xs text-slate-400 shrink-0">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                </div>
                <button
                  onClick={() => removeFile(idx)}
                  className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="pt-6 flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="text-slate-500 hover:text-slate-700 px-6 py-3 font-medium transition-colors"
        >
          {t('common.back')}
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={data.length === 0}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-8 py-3 rounded-full font-medium transition-colors"
        >
          {t('admission.labels.next_step')}
        </button>
      </div>
    </div>
  );
}
