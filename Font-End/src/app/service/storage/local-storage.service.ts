import { Inject,Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

const STORAGE_CART_KEY = "FURNITURE_CART"
const STORAGE_USER_KEY: String = "user"

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }

  public getItem(key) {
    return this.storage.get(key) ? this.storage.get(key) : null
}

public setItem(key, value) {
    this.storage.set(key, value)
}

public remove(key) {
    return this.storage.remove(key)
}
}
