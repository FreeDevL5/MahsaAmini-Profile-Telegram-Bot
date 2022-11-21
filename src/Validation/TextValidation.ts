export const isColor = (str: string) => {
    const emojies = ["🔴", "🟠", "🟡", "🟢", "🔵", "🟣", "⚫", "⚪"];
    const colors = ["red", "orange", "yellow", "green", "blue", "purple", "black", "white"];
    const translatedColors = ["قرمز", "نارنجی", "زرد", "سبز", "آبی", "بنفش", "مشکی", "سفید"];

    return emojies.includes(str) || colors.includes(str) || translatedColors.includes(str);

}

export const isMode = (str: string) => {
    const modes = ["عکس پروفایل", "عکس معمولی"];
    const translatedModes = ["profile", "normal"];

    return modes.includes(str) || translatedModes.includes(str);
}