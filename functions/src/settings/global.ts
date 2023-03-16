import * as functions from "firebase-functions";
import * as admin from "firebase-admin"

admin.initializeApp();

export const https = functions.https;
export const db = admin.firestore();
export const auth = admin.auth();
export const authEvent = functions.auth.user();

export const logSuccess = (data: any) => {
    functions.logger.info(data);
}

export const logError = (data: any) => {
    functions.logger.error(data);
}