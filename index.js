var login = function(){
    localStorage.setItem("name", $("#userN").val());
    window.location = "room.html";
}