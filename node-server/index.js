import admin from 'firebase-admin'
import serviceAccount from './hack-junction-firebase-adminsdk-fnzj1-077a886425.json'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://hack-junction.firebaseio.com/'
});

const db = admin.database()

const ownersRef = db.ref('owners')
ownersRef.on('value', snapshot => {
  console.log(snapshot.val())
}, console.error)
