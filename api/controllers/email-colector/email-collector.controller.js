"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailCollectorController = void 0;
const common_1 = require("@nestjs/common");
const crypto = require("crypto");
const email_collector_service_1 = require("../../services/email-collector.service");
const process = require("node:process");
const supabase_service_1 = require("../../modules/supabase-strategy/supabase.service");
let EmailCollectorController = class EmailCollectorController {
    constructor(emailCollectorService, supabaseService) {
        this.emailCollectorService = emailCollectorService;
        this.supabaseService = supabaseService;
        this.key = process.env.KEY;
        this.iv = process.env.IV;
    }
    async receiveEmail(encryptedData) {
        console.log(encryptedData);
        try {
            const decipher = crypto.createDecipheriv('aes-256-cbc', this.key, this.iv);
            let decrypted = decipher.update(encryptedData, 'base64', 'utf8');
            decrypted += decipher.final('utf8');
            console.log(decrypted);
            const email = decrypted;
            await this.supabaseService.saveEmail(email);
            console.log(`Correo electrónico recibido: ${email}`);
            return { message: 'Correo electrónico recibido con éxito' };
        }
        catch (error) {
            console.error('Error desencriptando los datos:', error.message);
            throw new Error('Error desencriptando los datos');
        }
    }
};
exports.EmailCollectorController = EmailCollectorController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmailCollectorController.prototype, "receiveEmail", null);
exports.EmailCollectorController = EmailCollectorController = __decorate([
    (0, common_1.Controller)('api/v1/email-colector'),
    __metadata("design:paramtypes", [email_collector_service_1.EmailCollectorService,
        supabase_service_1.SupabaseService])
], EmailCollectorController);
//# sourceMappingURL=email-collector.controller.js.map