import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";

@Injectable({
  providedIn: "root",
})
export class CacheService {
  constructor(private storage: Storage) {}

  setStorage(key, data) {
    return this.storage.set(key, data);
  }

  getStorage(key) {
    return this.storage.get(key);
  }

  clearStorage(key) {
    return this.storage.remove(key);
  }
}
