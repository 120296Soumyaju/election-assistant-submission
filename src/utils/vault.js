import CryptoJS from 'crypto-js';

const VAULT_STORAGE_KEY = 'election_assistant_vault';

export const encryptKey = (apiKey, signature) => {
  // Use the MetaMask signature as the master key
  const encrypted = CryptoJS.AES.encrypt(apiKey, signature).toString();
  localStorage.setItem(VAULT_STORAGE_KEY, encrypted);
  return encrypted;
};

export const decryptKey = (signature) => {
  const encrypted = localStorage.getItem(VAULT_STORAGE_KEY);
  if (!encrypted) return null;
  
  try {
    const bytes = CryptoJS.AES.decrypt(encrypted, signature);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted || null;
  } catch (error) {
    console.error('Decryption failed:', error);
    return null;
  }
};

export const isVaultPresent = () => {
  return !!localStorage.getItem(VAULT_STORAGE_KEY);
};

export const clearVault = () => {
  localStorage.removeItem(VAULT_STORAGE_KEY);
};
