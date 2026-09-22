import type { DocFile } from '../types'

const DB_NAME = 'docsuite-local'
const STORE_NAME = 'files'
const DB_VERSION = 1

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)
    request.onupgradeneeded = () => request.result.createObjectStore(STORE_NAME)
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

export async function readFiles(): Promise<DocFile[] | null> {
  if (!('indexedDB' in window)) return null
  try {
    const database = await openDatabase()
    return await new Promise((resolve, reject) => {
      const request = database.transaction(STORE_NAME, 'readonly').objectStore(STORE_NAME).get('library')
      request.onsuccess = () => resolve((request.result as DocFile[] | undefined) ?? null)
      request.onerror = () => reject(request.error)
    })
  } catch {
    return null
  }
}

export async function writeFiles(files: DocFile[]): Promise<void> {
  if (!('indexedDB' in window)) return
  try {
    const database = await openDatabase()
    await new Promise<void>((resolve, reject) => {
      const request = database.transaction(STORE_NAME, 'readwrite').objectStore(STORE_NAME).put(files, 'library')
      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
  } catch {
    // IndexedDB can be unavailable in private browsing; the UI remains usable.
  }
}
