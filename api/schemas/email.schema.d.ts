import { Document } from 'mongoose';
export type EmailDocument = Email & Document;
export declare class Email {
    email: string;
    createdAt: Date;
}
export declare const EmailSchema: import("mongoose").Schema<Email, import("mongoose").Model<Email, any, any, any, Document<unknown, any, Email> & Email & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Email, Document<unknown, {}, import("mongoose").FlatRecord<Email>> & import("mongoose").FlatRecord<Email> & {
    _id: import("mongoose").Types.ObjectId;
}>;
