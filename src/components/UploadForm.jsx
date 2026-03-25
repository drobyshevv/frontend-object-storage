import React, { useState } from 'react'

export default function UploadForm({ onUpload, folders = [], currentFolder }) {
  const [file, setFile] = useState(null)
  const [selectedFolder, setSelectedFolder] = useState('')

  const handleUpload = () => {
    if (!file) return alert('Выбери файл')

    // если мы внутри папки — грузим туда
    const folderToUse = currentFolder || selectedFolder

    onUpload(file, folderToUse)

    setFile(null)
    setSelectedFolder('')
  }

  return (
    <div style={{ marginBottom: 20 }}>
      <h3>📤 Загрузка файла</h3>

      {/* выбор файла */}
      <input
        type="file"
        onChange={e => setFile(e.target.files[0])}
      />

      {/* dropdown ТОЛЬКО если мы в root */}
      {!currentFolder && (
        <select
          value={selectedFolder}
          onChange={e => setSelectedFolder(e.target.value)}
        >
          <option value="">Корень</option>
          {folders.map(f => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      )}

      <button onClick={handleUpload}>
        Загрузить файл
      </button>
    </div>
  )
}