
export default function FileList({ files = [], currentFolder, onDownload, onDeleteFile, onDeleteFolder }) {
  const visibleFiles = files.filter(f => f.Filename !== ".keep");

  return (
    <div className="file-list">
      {currentFolder && (
        <div className="folder-actions">
          <h3>{currentFolder}</h3>
          <button className="folder-delete" onClick={() => onDeleteFolder(currentFolder)}>Удалить папку</button>
        </div>
      )}

      <div className="file-grid">
        {visibleFiles.map(f => {
          const isImage = f.ContentType?.startsWith('image');
          return (
            <div className="file-card" key={f.ID}>
              <div className="file-preview">
                {isImage ? (
                  <img src={`http://localhost:8080/files/${f.ID}`} alt={f.Filename} className="file-img" />
                ) : (
                  <div style={{ fontSize: 40 }}>📄</div>
                )}
              </div>
              <p className="file-name">{f.Filename}</p>
              <div className="file-actions">
                <button onClick={() => onDownload(f.ID, f.Filename)}>Скачать</button>
                <button onClick={() => onDeleteFile(f.ID)}>Удалить</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}