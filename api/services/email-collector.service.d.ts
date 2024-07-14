import { Model } from 'mongoose';
import { Email, EmailDocument } from '../schemas/email.schema';
export declare class EmailCollectorService {
    private emailModel;
    constructor(emailModel: Model<EmailDocument>);
    saveEmail(email: string): Promise<Email>;
}
