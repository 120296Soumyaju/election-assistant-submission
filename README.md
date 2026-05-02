# Election Assistant 🗳️

Welcome to the Election Assistant, a smart, interactive web application designed to guide voters through the electoral process, built for the **Google for Developers Virtual Prompt Wars (Challenge 2)**.

## Vertical
**General Public / Voter Education**
This application is aimed at simplifying the voting process for the general public, providing clear steps and timelines, and answering common questions about registering, researching candidates, and voting on Election Day.

## Approach and Logic

Our goal was to create a "vibe coded", highly polished, premium experience that feels like a modern AI assistant. 
The application has two core components:
1. **The Timeline:** A visual, interactive map of the election journey. It breaks down the overwhelming process of voting into manageable, sequential steps. Clicking on a step changes the application's context.
2. **The Assistant:** An integrated AI chat interface. It responds to clicks on the timeline by proactively offering relevant information and is fully conversational to answer any specific follow-up questions the user might have.

## How the Solution Works

- **Frontend Architecture:** The application is built with **React** and **Vite** for a fast, responsive user interface.
- **Styling:** We utilized **Vanilla CSS** with CSS variables to create a cohesive design system featuring glassmorphism (backdrop filters), deep slate themes, and subtle animated gradients.
- **Google Services Integration:** The assistant is powered by the **Google Gemini API** (`@google/genai`).
- **Cryptographic Vault (Web3):** To solve the issue of client-side key security, we implemented a **MetaMask-gated Vault**. The Gemini API key is encrypted using a unique signature from the user's wallet (AES-256) and stored locally. Only the wallet owner can unlock the vault to enable the AI.

### Setup Instructions
1. Clone the repository.
2. Run `npm install`.
3. Run `npm run dev`.
4. **Connect MetaMask** in the top right corner.
5. **Paste your Gemini API Key** and click **"Secure Vault"**.
6. Sign the message in MetaMask (Free/No Gas) to encrypt your key.
7. To use the app later, simply click **"Unlock Vault"** and sign again!

## Assumptions Made

- **Generalization:** Election laws vary wildly by state and local jurisdiction. We provide high-level guidance and direct users to official local sources (like vote.gov).
- **Web3 Accessibility:** We assume reviewers have a MetaMask extension installed to test the premium "Secure Vault" feature. If not, the app provides clear instructions on why it is required for secure AI integration.
