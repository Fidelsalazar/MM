import { EmailCollectorService } from '../../services/email-collector.service';
export declare class EmailCollectorController {
    private readonly emailCollectorService;
    private key;
    private iv;
    constructor(emailCollectorService: EmailCollectorService);
    receiveEmail(encryptedData: string): Promise<{
        message: string;
    }>;
}
