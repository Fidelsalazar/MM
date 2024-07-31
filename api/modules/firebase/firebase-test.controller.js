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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseTestController = void 0;
const common_1 = require("@nestjs/common");
const firebase_service_1 = require("./firebase.service");
let FirebaseTestController = class FirebaseTestController {
    constructor(firebaseService) {
        this.firebaseService = firebaseService;
    }
    async testConnection() {
        try {
            const db = this.firebaseService.getFirestore();
            const testDoc = await db.collection('test').doc('testDoc').get();
            if (testDoc.exists) {
                return { message: 'Successfully connected to Firebase Firestore!' };
            }
            else {
                await db.collection('test').doc('testDoc').set({ message: 'Connection test successful!' });
                return { message: 'Connected to Firebase Firestore. Document created successfully!' };
            }
        }
        catch (error) {
            return { message: 'Failed to connect to Firebase Firestore.', error: error.message };
        }
    }
};
exports.FirebaseTestController = FirebaseTestController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FirebaseTestController.prototype, "testConnection", null);
exports.FirebaseTestController = FirebaseTestController = __decorate([
    (0, common_1.Controller)('firebase-test'),
    __metadata("design:paramtypes", [firebase_service_1.FirebaseService])
], FirebaseTestController);
//# sourceMappingURL=firebase-test.controller.js.map