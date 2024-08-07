"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const email_collector_controller_1 = require("./controllers/email-colector/email-collector.controller");
const mongoose_1 = require("@nestjs/mongoose");
const email_schema_1 = require("./schemas/email.schema");
const email_collector_service_1 = require("./services/email-collector.service");
const process = require("node:process");
const config_1 = require("@nestjs/config");
const video_module_1 = require("./modules/video/video.module");
const supabase_strategy_1 = require("./modules/supabase-strategy");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            supabase_strategy_1.SupabaseModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            mongoose_1.MongooseModule.forRoot(process.env.DATABASE_URL),
            mongoose_1.MongooseModule.forFeature([{ name: email_schema_1.Email.name, schema: email_schema_1.EmailSchema }]),
            video_module_1.VideoModule,
        ],
        controllers: [app_controller_1.AppController, email_collector_controller_1.EmailCollectorController],
        providers: [app_service_1.AppService, email_collector_service_1.EmailCollectorService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map