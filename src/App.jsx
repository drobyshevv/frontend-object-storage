import React, { useEffect, useState } from 'react'
import { fetchFiles, uploadFile, downloadFile, deleteFile, createFolder } from './api/api'
import UploadForm from './components/UploadForm.jsx'
import FileList from './components/FileList.jsx'
import FolderList from './components/FolderList.jsx'

export default function App() {
  const [files, setFiles] = useState([])
  const [folders, setFolders] = useState([])
  const [currentFolder, setCurrentFolder] = useState('')

  const loadFiles = async (folder = '') => {
    try {
      const data = await fetchFiles(folder)

      setFiles(data || [])


      if (!folder) {
        const uniqueFolders = [...new Set(data.map(f => f.Folder).filter(Boolean))]
        setFolders(uniqueFolders)
      }

    } catch (e) {
      console.error(e)
      setFiles([])
    }
  }

  useEffect(() => {
    loadFiles()
  }, [])

  const openFolder = (folder) => {
    setCurrentFolder(folder)
    loadFiles(folder)
  }

  const goBack = () => {
    setCurrentFolder('')
    loadFiles('')
  }

  const handleUpload = async (file, folder) => {
    await uploadFile(file, folder || currentFolder)
    loadFiles(currentFolder)
  }

  const handleDelete = async (id) => {
    await deleteFile(id)
    loadFiles(currentFolder)
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Object Storage</h1>

      {currentFolder && (
        <button onClick={goBack}>⬅ Назад</button>
      )}

    <UploadForm
        onUpload={handleUpload}
        folders={folders}
        currentFolder={currentFolder}
    />

      {!currentFolder && (
        <FolderList folders={folders} onOpen={openFolder} onCreate={createFolder} />
      )}

      <FileList
        files={files.filter(f => f.Folder === currentFolder)}
        onDownload={downloadFile}
        onDelete={handleDelete}
      />
    </div>
  )
}