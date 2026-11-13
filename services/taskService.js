import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from '../firebase/firebase';
import {doc,updateDoc} from 'firebase/firestore';
import { deleteDoc} from 'firebase/firestore';


export const createTask = async (task) => {
    const reference = await addDoc(
        collection(db, 'tareas'),
        task
    );

    return reference.id;
};

export const getTasks = async () => {
    const snapshot = await getDocs(collection(db, 'tareas'));

    return snapshot.docs.map(
        (document) => ({
            id: document.id,
            ...document.data()
        })
    );
};

export const updateTask = async (taskId,data) => {

    const reference = doc(db,'tareas', taskId);

    await updateDoc(reference, data);

};

export const deleteTask = async (taskId) => {

    const reference = doc(db,'tareas',taskId);

    await deleteDoc(reference);

};
