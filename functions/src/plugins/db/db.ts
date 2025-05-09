import type {
    Firestore,
    Transaction,
    DocumentData,
    WithFieldValue,
    WhereFilterOp,
} from 'firebase/firestore';
import {
    doc,
    query,
    where,
    setDoc,
    getDocs,
    deleteDoc,
    updateDoc,
    collection,
    arrayUnion,
    runTransaction,
} from 'firebase/firestore';

import { ArrayOrObject, Path } from '@/helpers';
import { definePlugin } from '@/core';

type Field = WithFieldValue<DocumentData>;

type CollectionData<
    F extends Field,
    T extends ArrayOrObject<F> = ArrayOrObject<F>,
    K extends Path<T> = Path<T>,
> = {
    data: F;
    path: string;
    pathSegments: string[];
    filters: Array<{
        field: K;
        operator: WhereFilterOp;
        value: T[K] extends Array<infer V> ? V : T[K];
    }>;
};

type CollectionSegmentData<F extends Field, S> = {
    path: string;
    pathSegments: string[];
    pathToSegment: Path<F>;
    dataSegment: S;
};

type CollectionWithData<F extends Field> = Omit<CollectionData<F>, 'filters'>;
type CollectionWithFilters<F extends Field> = Omit<CollectionData<F>, 'data'>;
type CollectionWithOnlyPaths<F extends Field> = Omit<CollectionData<F>, 'data' | 'filters'>;

export default definePlugin(async () => {
    return async (firestore: Firestore) => {
        async function setItem<F extends Field>({ path, data, pathSegments }: CollectionWithData<F>) {
            const ref = doc(firestore, path, ...pathSegments);

            return setDoc(ref, data);
        }

        async function deleteItem<F extends Field>({ path, pathSegments }: CollectionWithOnlyPaths<F>) {
            const ref = doc(firestore, path, ...pathSegments);

            return deleteDoc(ref);
        }

        async function getItem<F extends Field>({ path, filters, pathSegments }: CollectionWithFilters<F>) {
            const q = query(
                collection(firestore, path, ...pathSegments),
                ...filters.map(({ field, operator, value }) => where(field as string, operator, value))
            );

            return getDocs(q)
                .then((querySnapshot) => {
                    const result = querySnapshot.docs.map((doc) => doc.data() as F);
                    return result ? result[0] : null;
                });
        }

        async function getList<F extends Field>({ path, filters, pathSegments }: CollectionWithFilters<F>) {
            const q = query(
                collection(firestore, path, ...pathSegments),
                ...filters.map(({ field, operator, value }) => where(field as string, operator, value))
            );

            return getDocs(q)
                .then((querySnapshot) => {
                    return querySnapshot.docs.map<F>((doc) => doc.data() as F);
                });
        }

        async function insert<F extends Field, S>({
            path,
            pathToSegment,
            dataSegment,
            pathSegments,
        }: CollectionSegmentData<F, S>) {
            const ref = doc(firestore, path, ...pathSegments);

            updateDoc(ref, {
                [pathToSegment]: arrayUnion(dataSegment),
            });
        }

        async function transaction<F extends Field>() {
            const getRef = ({
                path,
                pathSegments,
            }: CollectionWithOnlyPaths<F>) => doc(firestore, path, ...pathSegments);

            const transaction = async (callback: (t: Transaction) => void) => {
                return await runTransaction(firestore, async (transaction) => {
                    return callback(transaction);
                });
            };

            return { getRef, transaction };
        }

        return {
            insert,
            setItem,
            getItem,
            getList,
            deleteItem,
            transaction,
        };
    };
});
