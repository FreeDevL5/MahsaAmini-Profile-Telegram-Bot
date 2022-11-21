export const emojiToName = (emoji: string) => {
    switch (emoji) {
        case "🔴":
        case "قرمز":
        case "red":
            return "red";
        case "🟠":
        case "نارنجی":
        case "orange":
            return "orange";
        case "🟡":
        case "زرد":
        case "yellow":
            return "yellow";
        case "🟢":
        case "سبز":
        case "green":
            return "green";
        case "🔵":
        case "آبی":
        case "blue":
            return "blue";
        case "🟣":
        case "بنفش":
        case "purple":
            return "purple";
        case "⚫":
        case "مشکی":
        case "black":
            return "black";
        case "⚪":
        case "سفید":
        case "white":
            return "white";
        default:
            return "UNKNOWN";
    }
};

export const translateColor = (color: string) => {
    switch (color) {
        case "red":
            return "قرمز";
        case "orange":
            return "نارنجی";
        case "yellow":
            return "زرد";
        case "green":
            return "سبز";
        case "blue":
            return "آبی";
        case "purple":
            return "بنفش";
        case "black":
            return "مشکی";
        case "white":
            return "سفید";
        default:
            return "نامشخص";
    }
};

export const translateMode = (mode: string) => {
    switch (mode) {
        case "profile":
            return "عکس پروفایل";
        case "normal":
            return "عکس معمولی";
        default:
            return "نامشخص";
    }
}

export const modeToName = (mode: string) => {
    switch (mode) {
        case "عکس پروفایل":
        case "profile":
            return "profile";
        case "عکس معمولی":
        case "normal":
            return "normal";
        default:
            return "UNKNOWN";
    }
}