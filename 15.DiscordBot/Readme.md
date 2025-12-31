# Discord AI Bot

A lightweight Discord bot powered by Google's Gemini AI that responds to natural language queries with intelligent, contextual answers.

## Features

- AI-powered responses using Gemini 2.5 Flash Lite
- Simple prefix-based command system (`hey botty`)
- Fast response times with typing indicators
- Built-in safety checks and error handling
- Automatic message length management (Discord 2000 char limit)

## Prerequisites

- Node.js (v16.9.0 or higher)
- A Discord bot token
- A Google Gemini API key

## Installation

1. Clone the repository:

```bash
git clone https://github.com/404bad/Node.js
cd Node.js
```

2. Install dependencies:

```bash
npm install discord.js @google/generative-ai dotenv
```

3. Create a `.env` file in the root directory:

```env
DISCORD_TOKEN=your_discord_bot_token_here
GEMINI_API_KEY=your_gemini_api_key_here
```

## Setup

### Getting a Discord Bot Token

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application" and give it a name
3. Navigate to the "Bot" section
4. Click "Add Bot"
5. Under "Token", click "Reset Token" and copy it to your `.env` file
6. Enable these Privileged Gateway Intents:
   - Message Content Intent
   - Server Members Intent (optional)

### Getting a Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Get API Key"
4. Copy the key to your `.env` file

### Inviting the Bot to Your Server

1. In the Discord Developer Portal, go to "OAuth2" → "URL Generator"
2. Select these scopes:
   - `bot`
3. Select these bot permissions:
   - Send Messages
   - Read Messages/View Channels
   - Read Message History
4. Copy the generated URL and open it in your browser
5. Select your server and authorize the bot

## Usage

Start the bot:

```bash
node index.js
```

In Discord, interact with the bot by prefixing your messages with `hey botty`:

```
hey botty what's the weather like today?
hey botty explain quantum computing
hey botty write me a haiku about coding
```

## Configuration

### Changing the AI Model

To use a different Gemini model, modify the model initialization:

```javascript
const model = genAI.getGenerativeModel({ model: "gemini-pro" });
```

### Changing the Prefix

To use a different command prefix, update line 28:

```javascript
if (message.content.toLowerCase().startsWith("your-prefix")) {
```

## Project Structure

```
.
├── index.js          # Main bot file
├── .env              # Environment variables (create this)
├── package.json      # Dependencies
└── README.md         # This file
```

## Error Handling

The bot includes error handling for:

- Empty prompts (prompts the user for input)
- API failures (sends error message to user)
- Message length limits (truncates at 2000 characters)
- Bot message filtering (ignores other bots)

## Troubleshooting

**Bot doesn't respond:**

- Verify the bot is online in your server
- Check that Message Content Intent is enabled
- Ensure your `.env` file has valid tokens

**API errors:**

- Verify your Gemini API key is valid
- Check your API quota hasn't been exceeded
- Ensure you have internet connectivity

**Permission errors:**

- Verify the bot has "Send Messages" permission in the channel
- Check that the bot's role is positioned correctly in the server hierarchy

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

## License

MIT License - feel free to use this project however you'd like.

## Acknowledgments

- Built with [discord.js](https://discord.js.org/)
- Powered by [Google Gemini AI](https://deepmind.google/technologies/gemini/)

---

**Note:** Keep your `.env` file secure and never commit it to version control. Add `.env` to your `.gitignore` file.
