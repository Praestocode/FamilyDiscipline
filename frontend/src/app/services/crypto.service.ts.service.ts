// src/app/services/crypto.service.ts
import { Injectable } from '@angular/core';
import { argon2id, ArgonOpts } from '@noble/hashes/argon2';
import { utf8ToBytes, bytesToHex, hexToBytes } from '@noble/hashes/utils';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  private key: CryptoKey | null = null;
  private readonly localStorageKey = 'enc_key';
  private readonly saltPrefix = 'static_salt_'; // Per derivare il salt in base all'email

  /**
   * Deriva una chiave AES-GCM a partire da password ed email.
   * La chiave viene memorizzata internamente e nel localStorage (in forma esadecimale).
   */
  async deriveKey(password: string, email: string): Promise<void> {
    const salt = utf8ToBytes(this.saltPrefix + email.toLowerCase());
    const pwdBytes = utf8ToBytes(password);

    const opts: ArgonOpts = {
      t: 2, // Iterazioni
      //m: 16, // Memoria: 2^16 = 65536 KB = 64 MB
      m: 18, // Memoria: 2^18 = 262144 KB = 256 MB
      p: 1, // Parallellismo
      dkLen: 32, // Lunghezza chiave
    };

    const rawKey = argon2id(pwdBytes, salt, opts);

    this.key = await crypto.subtle.importKey(
      'raw',
      rawKey,
      { name: 'AES-GCM' },
      false,
      ['encrypt', 'decrypt']
    );

    localStorage.setItem(this.localStorageKey, bytesToHex(rawKey));
  }

  /**
   * Carica la chiave dal localStorage (se presente) e la importa nel contesto WebCrypto.
   */
  loadKeyFromStorage(): void {
    const hexKey = localStorage.getItem(this.localStorageKey);
    if (!hexKey) {
      this.key = null;
      return;
    }

    const rawKey = hexToBytes(hexKey);

    crypto.subtle.importKey('raw', rawKey, { name: 'AES-GCM' }, false, ['encrypt', 'decrypt'])
      .then((importedKey) => {
        this.key = importedKey;
      })
      .catch(() => {
        this.key = null;
      });
  }

  /**
   * Cancella la chiave in memoria e rimuove la sua rappresentazione dal localStorage.
   */
  clearKey(): void {
    this.key = null;
    localStorage.removeItem(this.localStorageKey);
  }

  /**
   * Cifra una stringa di testo in formato AES-GCM.
   * Il risultato è una stringa in esadecimale: IV:ciphertext
   */
  async encryptTask(plainText: string): Promise<string> {
    if (!this.key) {
      throw new Error('Chiave non inizializzata');
    }

    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encoder = new TextEncoder();
    const encodedText = encoder.encode(plainText);

    const ciphertext = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      this.key,
      encodedText
    );

    return bytesToHex(iv) + ':' + bytesToHex(new Uint8Array(ciphertext));
  }

  /**
   * Decifra una stringa cifrata con AES-GCM nel formato IV:ciphertext.
   */
  async decryptTask(encryptedText: string): Promise<string> {
    if (!this.key) {
      throw new Error('Chiave non inizializzata');
    }

    const [ivHex, cipherHex] = encryptedText.split(':');
    if (!ivHex || !cipherHex) {
      throw new Error('Formato testo cifrato non valido');
    }

    const iv = hexToBytes(ivHex);
    const ciphertext = hexToBytes(cipherHex);

    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      this.key,
      ciphertext
    );

    const decoder = new TextDecoder();
    return decoder.decode(decrypted);
  }
}
