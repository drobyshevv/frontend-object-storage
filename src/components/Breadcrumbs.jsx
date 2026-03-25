import React from "react"

export default function Breadcrumbs({ currentFolder, onBack }) {
  if (!currentFolder) return null

  return (
    <div className="breadcrumbs">
      <span className="breadcrumb" onClick={onBack}>🏠 Главная</span>
      <span> / </span>
      <span className="breadcrumb-current">{currentFolder}</span>
    </div>
  )
}