import '@babel/polyfill'
import chalk from 'chalk'
import admin from 'firebase-admin'
import serviceAccount from './hack-junction-firebase-adminsdk-fnzj1-077a886425.json'
import {promisify} from 'util'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://hack-junction.firebaseio.com/'
});

const db = admin.database()
const makeAllChatbotOff = false

const setTimeoutPromise = (cb, ...args) => new Promise((resolve, reject) => {
  setTimeout(async () => {
    try {
      resolve(await cb())
    } catch (err) {
      reject(err)
    }
  }, ...args)
})

const handleConversation = conversationSnap => {
  const conversationID = conversationSnap.val()
  console.log(`handle conversation id ${conversationID}`)
  let replying = false
  const conversationRef = db.ref(`conversations/${conversationID}`)
  conversationRef.child('last_message').on('value', async snap => {
    try {
      if (replying) return
      replying = true
      const {payload, is_bot} = snap.val()
      if (!is_bot) {
        await setTimeoutPromise(async () => {
          const replyPayload = `this is reply for ${payload}`
          const message = {
            payload: replyPayload,
            is_bot: true,
            reserve_timestamp: -Date.now()
          }
          const messagesRef = conversationRef.child('messages')
          await promisify(::messagesRef.push)(message)
          const lastMessageRef = conversationRef.child('last_message')
          await promisify(::lastMessageRef.set)(message)
        }, 1000)
      }
    } catch (err){
      console.error(err)
    } finally {
      replying = false
    }
  })
}

const handleBotsSnap = async (ownerID, botSnap) => {
  try {
    const {ready} = botSnap.val()
    const botID = botSnap.key
    const botRef = db.ref(`owners/${ownerID}/bots/${botID}`)
    //make sure all chatbot off
    if (ready) {
      console.log(`make chatbot id ${botID} is ready. Tell it to shutdown for a moment`)
      await promisify(::botRef.update)({ready: false})
      console.log(`chatbot id ${botID} has shutdown`)
    }
    if (!makeAllChatbotOff) {
      console.log(`initialize chatbot id ${botID}`)
      await setTimeoutPromise(async () => {
        await promisify(::botRef.update)({ready: true})
        console.log(`chatbot id ${botID} has been inited successfully. Now watching for conversation`)
        db.ref(`owners/${ownerID}/bots/${botID}/conversations`).on('child_added', handleConversation)
      }, 100)
    }
  } catch (err){
    console.error(err)
  }
}

const handleOwnerSnap = ({key}) => {
  console.log(`handle owner id ${key}`)
  db.ref(`owners/${key}/bots`).on('child_added',handleBotsSnap.bind(null, key))
}

// handle chatbot
db.ref('owners').on('child_added', handleOwnerSnap)

console.log('%s server is serving', chalk.green('✓'))
