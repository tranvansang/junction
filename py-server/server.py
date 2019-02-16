import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

cred = credentials.Certificate('./hack-junction-firebase-adminsdk-fnzj1-077a886425.json')
default_app = firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://hack-junction.firebaseio.com/',
})


ownersRef = db.reference('/owners')

ownersRef.addChildEventListener(new ChildEventListener() {
    @Override
    public void onChildAdded(DataSnapshot dataSnapshot, String prevChildKey) {
	Post newPost = dataSnapshot.getValue(Post.class);
	System.out.println("Author: " + newPost.author);
	System.out.println("Title: " + newPost.title);
	System.out.println("Previous Post ID: " + prevChildKey);
	}

    @Override
    public void onChildChanged(DataSnapshot dataSnapshot, String prevChildKey) {}

    @Override
    public void onChildRemoved(DataSnapshot dataSnapshot) {}

    @Override
    public void onChildMoved(DataSnapshot dataSnapshot, String prevChildKey) {}

    @Override
    public void onCancelled(DatabaseError databaseError) {}
    }
    );
