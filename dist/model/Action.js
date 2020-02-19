"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var actionSchema = new mongoose_1.Schema({
    trigger: {
        type: String,
        required: true
    },
    action: {
        actionType: {
            type: String,
            required: true
        }
    }
});
exports.default = mongoose_1.model("Actions", actionSchema);
//# sourceMappingURL=Action.js.map