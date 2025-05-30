import { initializeApp, getApps } from 'firebase/app';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';

import { env } from '@/env';
import { Env } from '@/core';

interface FirestoreData {
    apiKey: string;
    projectId: string;
    authDomain: string;
}

export function getFirestoreInstance(data: FirestoreData) {
    const { apiKey, authDomain, projectId } = data;

    const app = getApps().length === 0 ? initializeApp({
        apiKey,
        projectId,
        authDomain,
    }, 'functions') : getApps()[0];

    const firestore = getFirestore(app);

    if (env.value() as Env === 'LOCAL') {
        connectFirestoreEmulator(firestore, '127.0.0.1', 8080);
    }

    return firestore;
}
