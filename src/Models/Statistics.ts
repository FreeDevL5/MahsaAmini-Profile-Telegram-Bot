import fs from "fs";
import {translateColor} from "../Lib/TranslatorLib";

export class Statistics {
    static db = "db/statistics.json";
    static increase = (color: string) => {
        const file = Statistics.getDatabase();
        const data = JSON.parse(file.toString());
        if (!data[color]) {
            data[color] = 0;
        }
        data[color] += 1;
        fs.writeFileSync(Statistics.db, JSON.stringify(data, null, 4));
    };

    static getDatabase = () => {
        if (!fs.existsSync(Statistics.db)) {
            fs.writeFileSync(Statistics.db, JSON.stringify({}, null, 4));
        }
        return JSON.parse(fs.readFileSync(Statistics.db).toString());
    };

    static getStatistics = () => {
        const data = this.getDatabase();
        let message = "🔢 آمار رنگ‌های انتخاب شده توسط کاربران:\n";
        let count = 0;
        Object.keys(data).forEach((color) => {
            message += `🔹 ${translateColor(color)}: ${data[color]}\n`;
            count += data[color];
        });
        message += `🔸 مجموع: ${count}`;
        return message;
    };
}
