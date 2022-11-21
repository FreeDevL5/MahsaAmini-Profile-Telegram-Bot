import {Context} from "telegraf";
import {sendImageToTelegram} from "../Lib/TelegramLib";
import {User} from "../Models/User";
import {
    isColor,
    isMode,
} from "../Validation/TextValidation";
import {
    emojiToName,
    modeToName
} from "../Lib/TranslatorLib";
import {Statistics} from "../Models/Statistics";
import {imageProcess} from "../Lib/ImageProcessorLib";

export class BotController {
    bot_menu = [
        ["انتخاب رنگ", "انتخاب حالت"],
        ["آمار", "درباره ما"]
    ]
    color_menu = [
        ["🔴", "🟠", "🟡", "🟢"],
        ["🔵", "🟣", "⚫", "⚪"],
    ];
    mode_menu = [
        ["عکس پروفایل", "عکس معمولی"],
    ]
    public start = async (ctx: Context) => {
        await ctx.reply("به ربات مهسا امینی خوش آمدید");
        ctx.reply("یک رنگ انتخاب کنید", {
            reply_markup: {
                keyboard: this.color_menu,
            },
        });
        new User(ctx.from?.id);
    };

    public imageProcess = async (ctx: Context) => {
        const user = new User(ctx.from?.id);
        if (!ctx.message || !("photo" in ctx.message)) return false;
        ctx.sendChatAction("upload_photo");
        const photo = await ctx.telegram.getFileLink(ctx.message.photo[ctx.message.photo.length - 1].file_id);
        const color = user.getColor();
        const mode = user.getMode();
        const processedImage = await imageProcess(photo.href, color , mode);
        if (processedImage) {
            sendImageToTelegram(processedImage, ctx);
        }
    };

    public stats = (ctx: Context) => {
        ctx.reply(Statistics.getStatistics());
    };

    public message = async (ctx: Context) => {
        const user = new User(ctx.from?.id);


        if (!ctx.message || !("text" in ctx.message)) return false;
        const message = ctx.message.text;

        if (isColor(message ?? null)) {
            await this.setColor(ctx)
        }

        if (isMode(message ?? null)) {
            await this.setMode(ctx)
        }
        if (!user.getColor() || message == "انتخاب رنگ") {
            return ctx.reply("یک رنگ را انتخاب کنید", {
                reply_markup: {
                    keyboard: this.color_menu,
                },
            });
        }
        if (!user.getMode() || message == "انتخاب حالت") {
            return ctx.reply("یک حالت را انتخاب کنید", {
                reply_markup: {
                    keyboard: this.mode_menu,
                },
            });
        }
        if (message == "آمار") {
            return this.stats(ctx)
        }
        if (message == "درباره ما") {
            return this.aboutUs(ctx)
        }
        return ctx.reply("یک عکس ارسال کنید", {
            reply_markup: {
                keyboard: this.bot_menu,
            },
        });

    };

    public aboutUs = async (ctx: Context) => {
        const message = `این ربات توسط تیم WeAreMahsaAmini ساخته شده است
        هیچ اطلاعاتی از شما اعم از عکس ها، پیام ها و اطلاعات کاربری شما ذخیره نمی شود
        برای اطمینان از اینکه اطلاعات شما ذخیره نمیشود، می توانید کد منبع ربات را مشاهده کنید
        لینک سورس پروژه: SOURCE_LINK
        `;
        await ctx.reply(message);
    };

    private setColor = async (ctx: Context) => {
        const user = new User(ctx.from?.id);
        if (!ctx.message || !("text" in ctx.message)) return false;
        const message = ctx.message.text;
        user.setColor(emojiToName(message));
        await ctx.reply(`رنگ ${message} انتخاب شد`);
    }

    private setMode = async (ctx: Context) => {
        const user = new User(ctx.from?.id);
        if (!ctx.message || !("text" in ctx.message)) return false;
        const message = ctx.message.text;
        user.setMode(modeToName(message));
        await ctx.reply(`حالت ${message} انتخاب شد`);
    }
}
