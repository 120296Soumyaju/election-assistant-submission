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
- **Google Services Integration:** The assistant is powered by the **Google Gemini API** (`@google/genai`). It utilizes a system prompt to take on the persona of a helpful, non-partisan election guide.

### Setup Instructions
1. Clone the repository.
2. Run `npm install`.
3. Run `npm run dev`.
4. Open the application and **enter your Gemini API Key in the top right corner** to activate the AI assistant.

## Assumptions Made

- **Generalization:** Election laws vary wildly by state and local jurisdiction. We assume the assistant's primary role is to provide general, high-level guidance (e.g., "you need to register") and direct users to official local sources (like vote.gov) for specific, binding details.
- **API Key:** We assumed that reviewers would prefer to enter their own API key via the UI for easy testing, rather than configuring `.env` files locally. Therefore, the API key is handled directly within the browser state.
