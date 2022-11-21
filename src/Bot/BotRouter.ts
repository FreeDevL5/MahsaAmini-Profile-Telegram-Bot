import {Context, Telegraf} from "telegraf";
import {BotController} from "./BotController";

export class Bot {
    bot: Telegraf;
    botController;

    constructor(bot: Telegraf) {
        this.bot = bot;
        this.botController = new BotController();
        this.setRoutes();
    }

    public setRoutes = () => {
        this.bot.start((ctx: Context) => {
            return this.botController.start(ctx);
        });

        this.bot.on("photo", (ctx: Context) => {
            return this.botController.imageProcess(ctx);
        });

        this.bot.command("stats", (ctx: Context) => {
            return this.botController.stats(ctx);
        });

        this.bot.command("aboutus", (ctx: Context) => {
            return this.botController.aboutUs(ctx);
        });

        this.bot.on("text", (ctx: Context) => {
            return this.botController.message(ctx);
        });

    };

    public launch() {
        return this.bot.launch();
    }
}
