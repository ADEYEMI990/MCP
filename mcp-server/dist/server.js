"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const chatService_1 = require("./chatService");
const emailService_1 = require("./emailService");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/', (_req, res) => {
    res.send('✅ MCP Server is running. Use /api/chat or /api/send-email endpoints.');
});
app.post('/api/chat', async (req, res) => {
    try {
        const { question } = req.body;
        const answer = await (0, chatService_1.chatWithResume)(question);
        res.json({ answer });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.post('/api/send-email', async (req, res) => {
    try {
        const { to, subject, body } = req.body;
        const messageId = await (0, emailService_1.sendEmail)(to, subject, body);
        res.json({ success: true, messageId });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.listen(PORT, () => console.log(`MCP server running at http://localhost:${PORT}`));
//# sourceMappingURL=server.js.map