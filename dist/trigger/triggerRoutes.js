"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var TriggerRepository_1 = require("../TriggerRepository");
var router = express_1.Router();
router.get("/", function (req, res) {
    res.send(TriggerRepository_1.default.getInstance().triggerMap);
});
exports.default = router;
//# sourceMappingURL=triggerRoutes.js.map