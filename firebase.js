import { initializeApp } from "firebase/app"
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage"
import { getFirestore, arrayUnion, arrayRemove, doc, updateDoc, addDoc, collection, query, where, getDocs, Timestamp } from "firebase/firestore";
import { getDatabase } from 'firebase/database'
import { DateTime } from 'luxon'

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// database comments
const app = initializeApp(firebaseConfig);
const db_comments = getFirestore(app)
const storage = getStorage(app)
const db_notification = getDatabase(app)

async function uploadUserImage(username, img) {
    const imageUserRef = ref(storage, `${username}`)
    return uploadString(imageUserRef, img.split(',')[1], 'base64', { contentType: 'image/jpeg' }).then(async () => {
        return getDownloadURL(imageUserRef).then(url => {
            return url
        })
    })
}

async function setLikeDb(id, username, type) {

    const commentRef = doc(db_comments, "Comments", id)
    if (type == 'add') {
        await updateDoc(commentRef, {
            Like: arrayUnion(username)
        })
    } else if ('remove') {
        await updateDoc(commentRef, {
            Like: arrayRemove(username)
        })
    }

}

async function getUserComments(user) {

    const commentsRef = collection(db_comments, "Comments")
    const q = query(commentsRef, where("Author", "==", `${user}`))

    const querySnapshot = await getDocs(q)

    const data = []

    querySnapshot.forEach(doc => {
        data.unshift(doc.data())
    })

    return data
}

async function createComment(Content, Author, img) {

    const id_img = parseInt(Math.random() * 99999)

    if (img) {
        const imageCommentRef = ref(storage, `${Author}-${id_img}`)
        uploadString(imageCommentRef, img.split(',')[1], 'base64', { contentType: 'image/jpeg' }).then(() => {
            getDownloadURL(imageCommentRef).then(async url => {
                const data = DateTime.now().toISO()
                await addDoc(collection(db_comments, 'Comments'), {
                    Content: Content, Author: Author, Like: [], Dislike: [], Img: url, Time: data
                })
            })
        })

    } else {
        const data = DateTime.now().toISO()
        await addDoc(collection(db_comments, 'Comments'), {
            Content: Content, Author: Author, Like: [], Dislike: [], Time: data
        })
    }

}

async function setDislikeDb(id, username, type) {
    const commentRef = doc(db_comments, "Comments", id)
    if (type == 'add') {
        await updateDoc(commentRef, {
            Dislike: arrayUnion(username)
        })
    } else if ('remove') {
        await updateDoc(commentRef, {
            Dislike: arrayRemove(username)
        })
    }

}

export { uploadUserImage, db_comments, db_notification, getUserComments, createComment, setLikeDb, setDislikeDb }