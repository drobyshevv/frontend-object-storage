import React, { useState } from 'react'

export default function UploadForm({ onUpload }) {
  const [file, setFile] = useState(null)
  const [folder, setFolder] = useState('')

  const handleUpload = () => {
    if (!file) return alert('Select a file')
    onUpload(file, folder)
    setFile(null)
  }

  return (
    <div style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Folder"
        value={folder}
        onChange={e => setFolder(e.target.value)}
      />
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  )
}