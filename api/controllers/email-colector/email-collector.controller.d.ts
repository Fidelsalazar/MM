import { EmailCollectorService } from '../../services/email-collector.service';
import { SupabaseService } from '../../modules/supabase-strategy/supabase.service';
export declare class EmailCollectorController {
    private readonly emailCollectorService;
    private readonly supabaseService;
    private key;
    private iv;
    constructor(emailCollectorService: EmailCollectorService, supabaseService: SupabaseService);
    receiveEmail(encryptedData: string): Promise<{
        message: string;
    }>;
}
