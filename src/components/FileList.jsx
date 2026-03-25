import React from 'react'

export default function FileList({ files = [], onDownload, onDelete }) {
  return (
    <>
      <h2>📄 Файлы</h2>

      <div className="grid">
        {files.map(f => {
          const isImage = f.ContentType?.startsWith('image')

          return (
            <div className="card" key={f.ID}>
              {isImage ? (
                <img
                  src={`http://localhost:8080/files/${f.ID}`}
                  style={{ width: '100%', height: 80, objectFit: 'cover' }}
                />
              ) : (
                <div style={{ fontSize: 40 }}>📄</div>
              )}

              <p>{f.Filename}</p>

              <button onClick={() => onDownload(f.ID, f.Filename)}>⬇</button>
              <button onClick={() => onDelete(f.ID)}>❌</button>
            </div>
          )
        })}
      </div>
    </>
  )
}