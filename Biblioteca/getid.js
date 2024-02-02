const element = document.querySelectorAll(".book");
var livroid;

for (let i = 0; i < element.length; i++) {
    element[i].addEventListener("click", function (e) {
        livroid = (e.target.id);
        if (livroid != "Biblioteca") {
            window.location.href = "../Informações/info.html" + "?bookID=" + livroid;
        }
    })
}