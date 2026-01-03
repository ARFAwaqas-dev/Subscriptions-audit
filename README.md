
# SubAudit - Subscription Savings Tool

SubAudit helps you identify "zombie" subscriptions bleeding your bank account every month.

## How to Deploy to Vercel

1. **Create a GitHub Repository**: Create a new repository on GitHub and push these files to it.
2. **Connect to Vercel**:
   - Go to [Vercel](https://vercel.com).
   - Click **Add New** > **Project**.
   - Import your GitHub repository.
3. **Environment Variables**:
   - During the import step, find the **Environment Variables** section.
   - Add a variable named `API_KEY`.
   - Paste your **Gemini API Key** (get one from [Google AI Studio](https://aistudio.google.com)).
4. **Deploy**: Click "Deploy". Your app will be live in seconds!

## Features
- **AI Statement Analysis**: Paste messy bank transaction lines and Gemini will extract service names, prices, and categories.
- **Waste Detection**: Flag services you rarely use and see exactly how much they cost you annually.
- **Modern UI**: Clean, responsive dashboard designed for clarity.
