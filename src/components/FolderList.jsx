
import React, { useState } from "react";
import folderIcon from "../assets/icons/folder.svg";

export default function FolderList({ folders, onOpen, onDelete, onCreate, files }) {
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
      <div className="folder-header">
        <h3>Папки</h3>
        <button className="add-folder-btn" onClick={() => setShowInput(true)}>+</button>
      </div>

      {showInput && (
        <div className="folder-create">
          <input
            type="text"
            placeholder="Имя новой папки"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
          />
          <button onClick={handleCreate}>Создать</button>
          <button onClick={() => setShowInput(false)}>Отмена</button>
        </div>
      )}

      <div className="folder-grid">
        {folders.map((f) => {
          const folderFiles = (files || []).filter(file => file.Folder === f && file.Filename !== ".keep")
          return (
            <div className="folder-card" key={f}>
              <img src={folderIcon} alt="Папка" className="folder-img" onClick={() => onOpen(f)} />
              <p className="folder-name" onClick={() => onOpen(f)}>{f}</p>
              <p className="folder-file-count">{folderFiles.length} файлов</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}