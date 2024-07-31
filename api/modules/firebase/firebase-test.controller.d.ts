import { FirebaseService } from './firebase.service';
export declare class FirebaseTestController {
    private readonly firebaseService;
    constructor(firebaseService: FirebaseService);
    testConnection(): Promise<{
        message: string;
        error?: undefined;
    } | {
        message: string;
        error: any;
    }>;
}
