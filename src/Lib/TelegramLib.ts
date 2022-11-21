import {Context} from "telegraf";

export const sendImageToTelegram = (image: Buffer, ctx: Context) => {
    ctx.replyWithPhoto({source: image});
};

export const sendColorPicker = (ctx: Context) => {
    ctx.reply("یک رنگ انتخاب کنید", {
        reply_markup: {
            keyboard: [
                ["🔴", "🟠", "🟡", "🟢"],
                ["🔵", "🟣", "⚫", "⚪"],
            ],
        },
    });
};