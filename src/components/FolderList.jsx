import React, { useState } from "react";

export default function FolderList({ folders, onOpen, onDelete, onCreate }) {
  const [name, setName] = useState("")
  const [showInput, setShowInput] = useState(false)

  const handleCreate = () => {
    if (!name) return
    onCreate(name)
    setName("")
    setShowInput(false)
  }

  return (
    <div className="folder-list">
      <h3>📁 Папки</h3>

      <div className="folder-controls">
        {showInput ? (
          <>
            <input
              type="text"
              placeholder="Имя новой папки"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreate()}
            />
            <button onClick={handleCreate}>Создать</button>
            <button onClick={() => setShowInput(false)}>Отмена</button>
          </>
        ) : (
          <button onClick={() => setShowInput(true)}>Создать папку</button>
        )}
      </div>

      <ul>
        {folders.map((f) => (
          <li key={f}>
            <span className="folder-name" onClick={() => onOpen(f)}>📂 {f}</span>
            <button className="delete-folder" onClick={() => onDelete(f)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  )
}