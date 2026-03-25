import React from 'react'

export default function FileList({ files = [], onDownload, onDelete }) {
  if (!files.length) return <p>Нет файлов</p>

  return (
    <div>
      <h2>📄 Файлы</h2>

      <ul>
        {files.map(f => (
          <li key={f.ID}>
            {f.Filename}
            <button onClick={() => onDownload(f.ID, f.Filename)}>⬇</button>
            <button onClick={() => onDelete(f.ID)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  )
}