import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
declare const SupabaseStrategy_base: new (...args: any[]) => InstanceType<typeof Strategy>;
export declare class SupabaseStrategy extends SupabaseStrategy_base {
    private readonly configService;
    private readonly logger;
    constructor(configService: ConfigService);
    validate(payload: any): Promise<any>;
}
export {};
