import {Bot} from "./Bot/BotRouter";
import {Telegraf} from "telegraf";

require("dotenv").config();

const token = process.env.BOT_TOKEN;

if (!token) {
    throw new Error("BOT_TOKEN is not defined");
}
const telegraf = new Telegraf(token);

const bot = new Bot(telegraf);

bot.launch();
