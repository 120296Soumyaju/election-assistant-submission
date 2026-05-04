import React, { useState, useEffect } from 'react';
import { Wallet, Lock, Unlock, ShieldCheck, Key } from 'lucide-react';
import { ethers } from 'ethers';
import { encryptKey, decryptKey, isVaultPresent, clearVault } from '../utils/vault';

export default function VaultUI({ onUnlock, onLock }) {
  const [walletAddress, setWalletAddress] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [status, setStatus] = useState('idle'); // idle, connecting, ready, error
  const [vaultExists, setVaultExists] = useState(isVaultPresent());

  const SIGN_MESSAGE = "Secure my Election Assistant Vault. This action will not cost any gas.";

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask not found! Please install it to use the Secure Vault.");
      return;
    }
    
    try {
      setStatus('connecting');
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setWalletAddress(accounts[0]);
      setStatus('ready');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  const handleVaultAction = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const signature = await signer.signMessage(SIGN_MESSAGE);

      if (vaultExists && !isUnlocked) {
        // Unlock existing vault
        const decrypted = decryptKey(signature);
        if (decrypted) {
          onUnlock(decrypted);
          setIsUnlocked(true);
        } else {
          alert("Decryption failed. Ensure you are using the correct wallet.");
        }
      } else {
        // Create new vault
        if (!apiKeyInput) {
          alert("Please enter a Gemini API Key to secure.");
          return;
        }
        encryptKey(apiKeyInput, signature);
        onUnlock(apiKeyInput);
        setIsUnlocked(true);
        setVaultExists(true);
      }
    } catch (err) {
      console.error(err);
      alert("Vault action cancelled or failed.");
    }
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to clear the vault? You will need to enter your API key again.")) {
      clearVault();
      setIsUnlocked(false);
      setVaultExists(false);
      onLock();
      setApiKeyInput('');
      window.location.reload(); // Nuclear option: Force a full page refresh
    }
  };

  return (
    <div className="vault-ui-wrapper">
      {!walletAddress ? (
        <button onClick={connectWallet} className="vault-btn connect">
          <Wallet size={18} />
          {status === 'connecting' ? 'Connecting...' : 'Connect Wallet'}
        </button>
      ) : (
        <div className="vault-controls">
          {!isUnlocked ? (
            <div className="vault-input-group">
              {!vaultExists && (
                <textarea 
                  id="vault-token-area"
                  name="vault-token-area"
                  placeholder="👉 PASTE YOUR NEW API KEY HERE 👈" 
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  className="vault-api-input-area"
                  autoComplete="off"
                  rows="2"
                />
              )}
              <div className="vault-btn-group">
                <button onClick={handleVaultAction} className="vault-btn action">
                  {vaultExists ? <Unlock size={18} /> : <Lock size={18} />}
                  {vaultExists ? 'Unlock Vault' : 'Secure Vault'}
                </button>
                {vaultExists && (
                  <button onClick={handleReset} className="reset-btn-small" title="Delete current vault and start over">
                    Reset
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="vault-status">
              <ShieldCheck size={18} color="#4ade80" />
              <span className="address-badge">{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</span>
              <button onClick={handleReset} className="reset-btn" title="Reset Vault">
                Reset
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
