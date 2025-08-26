import * as admin from 'firebase-admin';

// Check if a Firebase app is already initialized
if (!admin.apps.length) {
    const serviceAccount = JSON.parse(
        process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
    );

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

// Export the entire admin object
export default admin;
