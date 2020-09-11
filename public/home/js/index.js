var first = document.getElementById("firstPage");
var login = document.getElementById("loginIn");
first.onmousemove = function() {
    this.className = 'active';
}
first.onmouseleave = function() {
    this.className = '';
}
login.onmousemove = function() {
    this.className = 'active';
}
login.onmouseleave = function() {
    this.className = '';
}