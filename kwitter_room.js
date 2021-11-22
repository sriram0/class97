
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





//Added Code
$("#nameL").html(`Welcome ${localStorage.getItem("name")}!`);
var addRoom = function (room) {
      firebase.database().ref("/").child(room).update({
            actual: true
      });
      localStorage.setItem("roomName", room);
      window.location = "chat.html";
}, logout = function () {
      localStorage.removeItem("name");
      localStorage.removeItem("roomName");
      window.location = "index.html";
}, visitRoom = function(room){
      console.log("clicked!!!!!!!!!!!!!!!!");
      localStorage.setItem("roomName", room);
      window.location = "chat.html";
}, getData = function () {
      firebase.database().ref("/").on('value', function (snapshot) {
            $("#trending span").html("");
            console.log(snapshot);
            snapshot.forEach(function (childSnapshot) {
                  console.log(childSnapshot === snapshot);
                  var childKey = childSnapshot.key;
                  var Room_name = childKey;
                  //Start code

                  var div = $("#trending span");
                  div.append(`<label id="${Room_name}" onclick="visitRoom(this.id);">#${Room_name}</label><hr>`);

                  //End code
            });
      });
};

getData();

/*
Errors:

GET https://www.googleapis.com/identitytoolkit/v3/relyingparty/
getProjectConfig?key=AIzaSyDB-PGl4jmKIWpLyh7JkH7XTIC8qNh-WSs&cb=1637137757876 400

When clicking on the room label:
      If the room name has a space:
            Uncaught SyntaxError: missing ) after argument list (happens only once per room)
      Else:
            Uncaught ReferenceError: [Room Name] is not defined at HTMLLabelElement.onclick

*/