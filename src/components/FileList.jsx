import React from 'react'

export default function FileList({ files = [], onDownload, onDelete }) {
  if (!files || files.length === 0) {
    return <p>Нет файлов</p>
  }

  return (
    <ul>
      {files.map(f => (
        <li key={f.ID}>
          {f.Filename} ({f.Size} bytes) [{f.Folder || 'root'}]
          <button onClick={() => onDownload(f.ID, f.Filename)}>Download</button>
          <button onClick={() => onDelete(f.ID)}>Delete</button>
        </li>
      ))}
    </ul>
  )
}