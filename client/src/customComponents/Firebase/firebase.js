import app from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.database = app.database();
  }

  createUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  signInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  signOut = () => this.auth.signOut();

  sendPasswordResetEmail = email => this.auth.sendPasswordResetEmail(email);

  updatePassword = password => this.auth.currentUser.updatePassword(password);

  // GET FUNCTIONS

  getCurrentUser = user_type => {
    const user_id = this.auth.currentUser.uid;
    if (!user_id) {
      throw {
        message: `There is no user log in`
      };
    }

    switch (user_type) {
      case "owner":
        this.database
          .ref(`owners/${user_id}`)
          .once("value")
          .then(snapshot => {
            if (!snapshot.exists()) {
              throw {
                message: `There is no current user registered with user_type: ${user_type}`
              };
            }
            return snapshot.val();
          });
        break;
      default:
        this.database
          .ref(`chatters/${user_id}`)
          .once("value")
          .then(snapshot => {
            if (!snapshot.exists()) {
              throw {
                message: `There is no current user registered with user_type: ${user_type}`
              };
            }
            return snapshot.val();
          });
        break;
    }
  };

  getOwner = owner_id =>
    this.database
      .ref(`owners/${owner_id}`)
      .once("value")
      .then(snapshot => {
        if (!snapshot.exists()) {
          throw {
            message: `There is no owner registered with user_id: ${owner_id}`
          };
        }
        return snapshot.val();
      });

  getBot = (owner_id, bot_id) =>
    this.database
      .ref(`owners/${owner_id}/${bot_id}`)
      .once("value")
      .then(snapshot => {
        if (!snapshot.exists()) {
          throw {
            message: `There is no bot registered with bot_id: ${bot_id} \n and with owner_id: ${owner_id}`
          };
        }
        return snapshot.val();
      });

  getChatter = chatter_id =>
    this.database
      .ref(`chatters/${chatter_id}`)
      .once("value")
      .then(snapshot => {
        if (!snapshot.exists()) {
          throw {
            message: `There is no user registered with user_id: ${chatter_id}`
          };
        }
        return snapshot.val();
      });

  getConversation = conversation_id =>
    this.database.ref(`conversations/${conversation_id}`).then(snapshot => {
      if (!snapshot.exists()) {
        throw {
          message: `There is no conversation with conversation_id: ${conversation_id}`
        };
      }
      return snapshot.val();
    });

  getMessage = (conversation_id, message_id) =>
    this.database
      .ref(`conversations/${conversation_id}/messages/${message_id}`)
      .then(snapshot => {
        if (!snapshot.exists()) {
          throw {
            message: `There is no message with message_id: ${message_id}`
          };
        }
        return snapshot.val();
      });

  // POST FUNCTIONS

  updateOwner = (user_id, payload) => {
    if (!user_id || user_id.length === 0) {
      throw {
        message: `user_id is empty or nil: ${user_id}`
      };
    }
    return this.database.ref(`owners/${user_id}`).update(payload);
  };

  updateBot = (owner_id, bot_id, payload) => {
    if (!bot_id || bot_id.length === 0) {
      throw {
        message: `bot_id is empty or nil: ${bot_id}`
      };
    }
    return this.database.ref(`owners/${owner_id}/${bot_id}`).update(payload);
  };

  updateConversation = (conversation_id, payload) => {
    if (!conversation_id || conversation_id.length === 0) {
      throw {
        message: `conversation_id is empty or nil: ${conversation_id}`
      };
    }
    return this.database
      .ref(`conversations/${conversation_id}`)
      .update(payload);
  };

  updateChatter = (chatter_id, payload) => {
    if (!chatter_id || chatter_id.length === 0) {
      throw {
        message: `chatter_id is empty or nil: ${chatter_id}`
      };
    }
    return this.database.ref(`chatters/${chatter_id}`).update(payload);
  };

  // CUSTOM FUNCTIONS

  addBot = ({ name, description, source_code, model_url }) => {
    const user_id = getCurrentUserId();

    const bot_id = generateKey();

    const bot_payload = {
      id: bot_id,
      name,
      description,
      conversations: {},
      ready: false,
      source_code,
      model_url
    };

    updateBot(user_id, bot_id, bot_payload);
  };

  addConversation = async ({ owner_id, bot_id, chatter_id }) => {
    const conversation_id = generateKey();

    // update owner bot
    await this.database
      .ref(`owners/${owner_id}/bots/${bot_id}/conversations/${conversation_id}`)
      .set(1);

    // update chatter
    await this.database
      .ref(`chatters/${chatter_id}/conversations/${conversation_id}`)
      .set(1);

    // create conversation
    const conversation_payload = {
      bot_id,
      chatter_id
    };
    updateConversation(conversation_id, conversation_payload);
  };

  addMessage = async ({ conversation_id, payload }) => {
    const message_id = generateKey();

    // message payload
    const message_payload = {
      payload,
      is_bot: false,
      reverse_timestamp: -Date.now()
    };

    // update conversation
    await this.database
      .ref(`conversations/${conversation_id}/last_message/`)
      .set(message_payload);

    // update messages
    this.database
      .ref(`conversations/${conversation_id}/messages/${message_id}`)
      .set(message_payload);
  };

  registerToConversation = async conversation_id => {
    await this.database
      .ref(`conversations/${conversation_id}/messages`)
      .orderByChild("reverse_timestamp")
      .limitToFirst(30)
      .on("child_added")
      .then(snapshot => {
        if (!snapshot.exists()) {
          return {};
        }
        return snapshot.val();
      });
  };

  unregisterFromConversation = conversation_id => {
    this.database.ref(`conversations/${conversation_id}/messages`).off();
  };

  // HELPER FUNCTIONS

  generateKey = () => this.database.ref().push().key;

  getCurrentUserId = () => {
    const user_id = this.auth.currentUser.uid;
    if (!user_id) {
      throw {
        message: `There is no user log in`
      };
    }
    return user_id;
  };
}

export default Firebase;
