import * as admin from 'firebase-admin';
export declare class FirebaseService {
    private readonly firestore;
    constructor();
    getFirestore(): admin.firestore.Firestore;
}
