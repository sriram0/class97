//ADD YOUR FIREBASE LINKS HERE
var firebaseConfig = {
    apiKey: "AIzaSyDB-PGl4jmKIWpLyh7JkH7XTIC8qNh-WSs",
    authDomain: "kwitter-dd789.firebaseapp.com",
    databaseURL: "https://kwitter-dd789-default-rtdb.firebaseio.com",
    projectId: "kwitter-dd789",
    storageBucket: "kwitter-dd789.appspot.com",
    messagingSenderId: "397890781398",
    appId: "1:397890781398:web:1ac9fc13af58bade558977"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


var messages = [];
var mi = $("#messageI");

$("#roomH").html("#"+localStorage.getItem("roomName"));

if(firebase.database().ref(localStorage.getItem("roomName")) != null){
    firebase.database().ref(localStorage.getItem("roomName")).on('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
              var childKey = childSnapshot.key;
              console.log(childSnapshot.text);
        });
  });
}

var send = function(){
    firebase.database().ref(localStorage.getItem("roomName")).push({
        text: mi.val(),
        user: localStorage.getItem("name"),
        likes: 1
    });
    messages.push({
        text: mi.val(),
        user: localStorage.getItem("name"),
        likes: 1
    });
    console.log(messages);
    mi.val("");
}
var logout = function(){
    localStorage.removeItem("name");
    localStorage.removeItem("roomName");
    window.location = "index.html";
}
var back = function(){
    window.location = "room.html";
}, getData = function(){
    firebase.database().ref("/" + localStorage.getItem("roomName")).on('value', function (snapshot) {
        $("#chat div").remove();
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if (childKey != "actual") {
                firebase_message_id = childKey;
                message_data = childData;

                //start code
                console.log(message_data)
                console.log(` Firebase Message Id: ${firebase_message_id}`);

                mi.before(`<div style="width:30%;">${message_data.user} <img src="tick.png" width="20px"> <br> <label class="text-secondary">${message_data.text}</label><button style="margin-left:5px;margin-bottom:5px;" id="${message_data}" class="btn btn-warning " onclick="likeIt(this.id, ${firebase_message_id})" ><i class="far fa-thumbs-up"></i> Likes: ${message_data.likes}</button></div>`);
                //end code
            }
        });
  });
}, likeIt = function(obj, messageId){
    console.log(messageId);
    firebase.database().ref(localStorage.getItem("roomName")).child("-"+messageId).update({
        likes: obj.likes + 1
    });
}



getData();