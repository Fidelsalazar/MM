"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupabaseModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const supabase_controller_1 = require("./supabase.controller");
const supabase_service_1 = require("./supabase.service");
let SupabaseModule = class SupabaseModule {
};
exports.SupabaseModule = SupabaseModule;
exports.SupabaseModule = SupabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule],
        controllers: [supabase_controller_1.SupabaseController],
        providers: [
            {
                provide: 'SUPABASE_CLIENT',
                useFactory: (configService) => {
                    const supabaseUrl = configService.get('SUPABASE_URL');
                    const supabaseKey = configService.get('SUPABASE_KEY');
                    const { createClient } = require('@supabase/supabase-js');
                    return createClient(supabaseUrl, supabaseKey);
                },
                inject: [config_1.ConfigService],
            },
            supabase_service_1.SupabaseService,
        ],
        exports: [supabase_service_1.SupabaseService],
    })
], SupabaseModule);
//# sourceMappingURL=supabase.module.js.map