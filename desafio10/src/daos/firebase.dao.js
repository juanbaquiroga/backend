import { json } from "express";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, addDoc, getDocs, updateDoc,  deleteDoc, getDoc} from "firebase/firestore";
import { firebaseConfig } from '../db/keys.js'

export class FirebaseDao {
    constructor(collection) {
        this.collection = collection;
        this.dbConfig = firebaseConfig;
        this.db = getFirestore(initializeApp(this.dbConfig));
    }

    async create(docToAdd) {
        try {
            await addDoc(collection(this.db, this.collection), docToAdd)
            console.log('Data inserted.');
        } catch (err) {
            console.log(err);
        }
    }

    async getAll() {
        const objs = [];

        try {
            const snapshot = await getDocs(collection(this.db, this.collection));
            snapshot.forEach((doc) => {objs.push(doc.data())});
            return objs;
        }
        catch (err) {console.log(err)}
    }

    async getById (id){
        try{
            const docRef = doc(this.db, this.collection, id);
            const snapshot = await getDoc(docRef)
            return snapshot.data();
        }
        catch (err) {console.log(err)}
    };

    async update(id, product) {
        try {
            const docRef = doc(this.db, this.collection, id);
            await updateDoc(docRef, product);
            return "Item updated successfully";
        } catch (err) {
            console.log(err);
        }
    }

    async delete(idDelete) {
        try {
            const cartsRef = doc(this.db, this.collection, idDelete);
            await deleteDoc(cartsRef);
            console.log(`delete doc!, ID: ${idDelete}`);
        } catch (err) {
            console.log(err);
        }
    }
}