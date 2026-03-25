import React, { useRef } from 'react';
import './UploadForm.css';

export default function UploadForm({ onUpload, currentFolder }) {
  const inputRef = useRef();

  const handleFiles = (files) => {
    const file = files[0];
    if (!file) return;
    onUpload(file, currentFolder);
  };

  return (
    <div
      className="dropzone"
      onDragOver={e => e.preventDefault()}
      onDrop={e => {
        e.preventDefault();
        handleFiles(e.dataTransfer.files);
      }}
    >
      <p>Перетащи файл сюда или</p>
      <button className="btn-upload" onClick={() => inputRef.current.click()}>
        Загрузить файл
      </button>
      <input
        type="file"
        hidden
        ref={inputRef}
        onChange={e => handleFiles(e.target.files)}
      />
    </div>
  );
}