import React, { useState } from 'react'

export default function FolderList({ folders, onOpen, onCreate }) {
  const [name, setName] = useState('')

  const handleCreate = () => {
    if (!name) return
    onCreate(name)
    setName('')
  }

  return (
    <div>
      <h2>📁 Папки</h2>

      <div style={{ marginBottom: 10 }}>
        <input
          value={name}
          placeholder="Новая папка"
          onChange={e => setName(e.target.value)}
        />
        <button onClick={handleCreate}>Создать</button>
      </div>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        {folders.map(f => (
          <div
            key={f}
            onClick={() => onOpen(f)}
            style={{
              padding: 10,
              border: '1px solid #ccc',
              cursor: 'pointer'
            }}
          >
            📁 {f}
          </div>
        ))}
      </div>
    </div>
  )
}