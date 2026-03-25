import React, { useState } from 'react'

export default function FolderList({ folders, onCreate }) {
  const [name, setName] = useState('')

  const handleCreate = () => {
    if (!name) return
    onCreate(name)
    setName('')
  }

  return (
    <div style={{ marginBottom: '20px' }}>
      <input
        value={name}
        placeholder="New folder"
        onChange={e => setName(e.target.value)}
      />
      <button onClick={handleCreate}>Create Folder</button>

      <h2>Folders</h2>
      <ul>
        {folders.map(f => (
          <li key={f}>{f}</li>
        ))}
      </ul>
    </div>
  )
}