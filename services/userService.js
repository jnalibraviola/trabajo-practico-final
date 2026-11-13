import {doc,setDoc} from 'firebase/firestore';


import {db} from '../firebase/firebase';


export const saveUser = async (uid,data) => {


    return setDoc(doc(db,'usuarios',uid),data);


};
