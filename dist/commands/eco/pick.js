"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../../structures/Command"));
const Util = __importStar(require("../../utils/util"));
const config = __importStar(require("../../config"));
const db_1 = require("../../utils/db");
class default_1 extends Command_1.default {
    get options() {
        return { aliases: ['поднять'] };
    }
    execute(message, _) {
        db_1.Plant.getData()
            .then(plants => [...plants.values()])
            .then(plants => {
            if (plants.length < 1) {
                message.channel
                    .send({
                    embed: {
                        color: config.meta.defaultColor,
                        description: 'Дропов не найдено'
                    }
                })
                    .then(msg => msg.delete({ timeout: config.meta.errorMsgDeletion }))
                    .catch(() => { });
                return;
            }
            db_1.User.getOne({ userID: message.author.id }).then(userDoc => {
                const amount = plants.reduce((prev, plant) => plant.amount + prev, 0);
                userDoc.gold += amount;
                userDoc.save();
                db_1.Plant.deleteMany({});
                message.channel
                    .send({
                    embed: {
                        color: config.meta.defaultColor,
                        description: `Вы подняли ${amount.toLocaleString('ru-RU')}${Util.resolveEmoji(config.meta.emojis.cy).trim()}`
                    }
                })
                    .then(msg => msg.delete({ timeout: config.meta.msgDeletion }))
                    .catch(() => { });
            });
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=pick.js.map