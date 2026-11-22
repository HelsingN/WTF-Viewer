const storeName = "selected";
const cacheKey = "ai-capex-signals";
type Snapshot = { text: string; selectedAt: string };

function open(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("wtf-viewer-research", 1);
    request.onupgradeneeded = () => request.result.createObjectStore(storeName);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
    request.onblocked = () => reject(Error("Local database is blocked by another tab"));
  });
}

export async function readLocalPackage(): Promise<Snapshot | undefined> {
  const db = await open();
  try {
    return await new Promise((resolve, reject) => {
      const request = db.transaction(storeName).objectStore(storeName).get(cacheKey);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  } finally {
    db.close();
  }
}

export class LocalPackageConflict extends Error {}

export async function writeLocalPackage(expected: string | undefined, next?: Snapshot): Promise<void> {
  const db = await open();
  try {
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      const request = store.get(cacheKey);
      let conflict = false;
      request.onsuccess = () => {
        if (request.result?.text !== expected) {
          conflict = true;
          tx.abort();
          return;
        }
        if (next) store.put(next, cacheKey);
        else store.delete(cacheKey);
      };
      tx.oncomplete = () => resolve();
      tx.onabort = () => reject(conflict ? new LocalPackageConflict() : tx.error);
      tx.onerror = () => reject(tx.error);
    });
  } finally {
    db.close();
  }
}
