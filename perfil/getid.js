const element = document.querySelectorAll(".book");
var livroid;

for (let i = 0; i < element.length; i++) {
    element[i].addEventListener("click", function (e) {
        if ((e.target.id != "notfoundalugados") && (e.target.id != "notfoundfavoritos") && (e.target.id != "notfoundhistorico") && (e.target.id != "searchhistorico") && (e.target.id != "searchalugados") && (e.target.id != "searchfavoritos")) {
            livroid = (e.target.id);
            window.location.href = "../Informações/info.html" + "?bookID=" + livroid;
        }
    })
}