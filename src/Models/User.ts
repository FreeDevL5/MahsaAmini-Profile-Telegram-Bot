import {hash} from "../Lib/CryptoLib";
import * as fs from "fs";
import {UserDatabase} from "../Interfaces/UserDatabase";

export class User {
    static default_values: UserDatabase = {
        color: null,
        mode: null,
    };
    user_token: string;
    color: string | null = null;
    mode: string | null = null;

    constructor(user_id: number | undefined) {
        let id = user_id || 0;
        this.user_token = hash(id.toString());
        if (!this.checkIfDatabaseExists()) {
            fs.writeFileSync(`db/${this.user_token}.json`, JSON.stringify(User.default_values, null, 4));
        }
    }

    public getUserDatabase = (): UserDatabase => {
        return JSON.parse(fs.readFileSync(`db/${this.user_token}.json`).toString());
    };
    public save = (data: UserDatabase) => {
        fs.writeFileSync(`db/${this.user_token}.json`, JSON.stringify(data, null, 4));
    };

    public checkIfDatabaseExists = (): boolean => {
        return fs.existsSync(`db/${this.user_token}.json`);
    };

    public getColor = (): string | null => {
        if (!this.color) this.color = this.getUserDatabase().color;
        return this.color;
    };

    public getMode = (): string | null => {
        if (!this.mode) this.mode = this.getUserDatabase().mode;
        return this.mode;
    }

    public setColor = (color: string): void => {
        const user = this.getUserDatabase();
        this.color = user.color = color;
        this.save(user);
    };

    public setMode = (mode: string): void => {
        const user = this.getUserDatabase();
        this.mode = user.mode = mode;
        this.save(user);
    }
}
