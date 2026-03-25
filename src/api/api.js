const API_BASE = 'http://localhost:8080'

export async function fetchFiles(folder) {
  let url = `${API_BASE}/files`

  if (folder) {
    url += `?folder=${encodeURIComponent(folder)}`
  }

  const res = await fetch(url)
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function uploadFile(file, folder = '') {
  const form = new FormData()
  form.append('file', file)
  form.append('folder', folder)
  const res = await fetch(`${API_BASE}/upload`, { method: 'POST', body: form })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function downloadFile(id, filename) {
  const res = await fetch(`${API_BASE}/files/${id}`)
  if (!res.ok) throw new Error(await res.text())
  const blob = await res.blob()
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = filename
  link.click()
}

export async function deleteFile(id) {
  const res = await fetch(`${API_BASE}/files/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error(await res.text())
}

export async function createFolder(name) {
  const blob = new Blob([''], { type: 'text/plain' })
  return uploadFile(new File([blob], '.keep'), name)
}