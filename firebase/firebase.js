import { initializeApp } from 'firebase/app'
import firebaseConfig from './config'
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import { addDoc, collection, getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

class Firebase {

    constructor () {

        const app = initializeApp(firebaseConfig)
        this.auth = getAuth()
        this.db = getFirestore(app)
        this.storage = getStorage(app)

    }

    async createAccount (name, email, password) {

        const newUser = await createUserWithEmailAndPassword(this.auth, email, password)

        return await updateProfile(newUser.user, {
            displayName: name
        })

    }

    async login (email, password) {

        return await signInWithEmailAndPassword(this.auth, email, password)

    }

    async logout () {

        return await signOut(this.auth)

    }

    async createProduct (product) {

        return await addDoc(collection(firebase.db, 'products'), product)

    }

}

const firebase = new Firebase()

export default firebase
