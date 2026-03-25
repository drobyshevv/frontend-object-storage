import React, { useEffect, useState } from 'react'
import { fetchFiles, uploadFile, downloadFile, deleteFile, createFolder } from './api/api'
import UploadForm from './components/UploadForm.jsx'
import FileList from './components/FileList.jsx'
import FolderList from './components/FolderList.jsx'

export default function App() {
  const [files, setFiles] = useState([])
  const [folders, setFolders] = useState([])

  const loadFiles = async () => {
  try {
    const data = await fetchFiles()
    setFiles(data || []) 
  } catch (e) {
    console.error(e)
    setFiles([]) 
  }
}

  useEffect(() => { loadFiles() }, [])

  const handleUpload = async (file, folder) => {
    try { await uploadFile(file, folder); loadFiles() } 
    catch (e) { alert('Upload error: ' + e.message) }
  }

  const handleDownload = (id, name) => downloadFile(id, name)
  const handleDelete = async id => { await deleteFile(id); loadFiles() }
  const handleCreateFolder = async name => { await createFolder(name); loadFiles() }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Object Storage</h1>
      <UploadForm onUpload={handleUpload} />
      <FolderList folders={folders} onCreate={handleCreateFolder} />
      <FileList files={files} onDownload={handleDownload} onDelete={handleDelete} />
    </div>
  )
}