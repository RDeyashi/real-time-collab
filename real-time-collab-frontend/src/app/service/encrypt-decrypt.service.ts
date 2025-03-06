import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptDecryptService {

  private readonly SECRET_KEY = 'ENCRYPT_PASSWORD';

  constructor() { }

  hashedPassword: string = '';

  async encryptPassword(password: string) {
    return CryptoJS.AES.encrypt(password, this.SECRET_KEY).toString();
  }
}
