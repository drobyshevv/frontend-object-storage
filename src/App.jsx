import React, { useEffect, useState } from 'react'
import { fetchFiles, uploadFile, downloadFile, deleteFile } from './api/api'
import UploadForm from './components/UploadForm'
import FileList from './components/FileList'
import FolderList from './components/FolderList'
import Breadcrumbs from './components/Breadcrumbs'

export default function App() {
  const [files, setFiles] = useState([])
  const [folders, setFolders] = useState([])
  const [currentFolder, setCurrentFolder] = useState('')

  const load = async (folder = '') => {
    const data = await fetchFiles(folder)
    setFiles(data || [])

    if (!folder) {
      const unique = [...new Set(data.map(f => f.Folder).filter(Boolean))]
      setFolders(unique)
    }
  }

  useEffect(() => { load() }, [])

  const openFolder = (f) => {
    setCurrentFolder(f)
    load(f)
  }

  const goBack = () => {
    setCurrentFolder('')
    load('')
  }

  const handleUpload = async (file, folder) => {
    await uploadFile(file, folder)
    load(folder)
  }

  const handleDeleteFile = async (id) => {
    await deleteFile(id)
    load(currentFolder)
  }

  const handleDeleteFolder = async (folder) => {
    const filesInFolder = files.filter(f => f.Folder === folder)
    for (let f of filesInFolder) {
      await deleteFile(f.ID)
    }
    load('')
  }

  const handleCreateFolder = async (folderName) => {

    const placeholder = new File([], ".keep")
    await handleUpload(placeholder, folderName)
    setFolders(prev => [...prev, folderName])
  }

  return (
    <div className="container">
      <h1>☁️ Object Storage</h1>

      <Breadcrumbs currentFolder={currentFolder} onBack={goBack} />

      <UploadForm onUpload={handleUpload} currentFolder={currentFolder} />

      {!currentFolder && (
        <FolderList
          folders={folders}
          onOpen={openFolder}
          onDelete={handleDeleteFolder}
          onCreate={handleCreateFolder}
        />
      )}

      <FileList
        files={files.filter(f => f.Folder === currentFolder)}
        onDownload={downloadFile}
        onDelete={handleDeleteFile}
      />
    </div>
  )
}