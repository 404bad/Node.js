import { Client, Events, GatewayIntentBits } from "discord.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

// Initialize client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Initialize AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

// Bot ready
client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

// Handle messages
client.on("messageCreate", async (message) => {
  // Ignore bots
  if (message.author.bot) return;

  // Check prefix
  if (message.content.toLowerCase().startsWith("hey botty")) {
    const prompt = message.content.slice(10).trim();

    // Safety check: if the user just says "Hey botty" with no question
    if (!prompt) {
      return message.reply("Yes? I'm listening! What can I help you with?");
    }

    try {
      // Show typing
      await message.channel.sendTyping();

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();

      // Truncate response
      if (responseText.length > 2000) {
        message.reply(responseText.substring(0, 2000));
      } else {
        message.reply(responseText);
      }
    } catch (error) {
      console.error("Gemini Error:", error);
      message.reply("Sorry, I ran into an error processing that.");
    }
  }
});

// Start bot
client.login(process.env.DISCORD_TOKEN);
