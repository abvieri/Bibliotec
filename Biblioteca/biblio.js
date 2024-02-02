function Init() {
    findbooks();
    filtroGeneros();
    filtroautores();
    inputs();   

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            document.getElementById('btnPerfil').innerText = "Perfil";
            console.log('Usuário online')
        } else {
            console.log('Usuário offline')
        }
    })
}

function dupli() {
    var elementosDuplicados = document.querySelectorAll('[id]');
    var idsDuplicados = new Set();
    elementosDuplicados.forEach(function (elemento) {
        var id = elemento.id;

        if (idsDuplicados.has(id)) {
            elemento.parentNode.removeChild(elemento);
        } else {
            idsDuplicados.add(id);
        }
    });
}

function notfound() {
    var nf = document.querySelectorAll(".found");

    if (nf.length == 0 || nf == null || nf == undefined) {
        const Biblioteca = document.getElementById("Biblioteca");
        const div = document.createElement('div');
        const img = document.createElement('img');
        const p = document.createElement('p');
        img.src = '../img/logo.png';
        div.id = 'notfound';
        p.innerText = "Nenhum resultado encontrado";

        div.appendChild(p);
        div.appendChild(img);
        Biblioteca.appendChild(div);

        dupli();
    } else {
        const notfound = document.getElementById("notfound");
        if (notfound) {
            notfound.remove();
        }
    }
}

function aPerfil() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            window.location.href = "../Perfil/index.html";
        } else {
            window.location.href = "../login/login.html";
        }
    })
}

function aSobre() {
    window.location.href = "../Sobre/sobre.html";
}

/* ===== Gerador dos Livros ===== */

function findbooks() {
    firebase.firestore()
        .collection('livros')
        .get()
        .then(snapshot => {
            const books = snapshot.docs.map(doc => doc.data());
            addbook(books);
            dupli();
        })
}

function addbook(books) {
    const Biblioteca = document.getElementById("Biblioteca");

    for (i = 0; i < books.length; i++) {
        let book = books[i];

        if (i < 1000) {
            const li = document.createElement('li');
            li.id = "a" + book.id;
            li.classList.add("null");
            li.classList.add("found");

            const img = document.createElement('img');
            img.src = book.imagem;
            img.id = book.id;
            li.appendChild(img);

            const span = document.createElement('span');
            span.id = book.id;
            span.innerHTML = (book.titulo + " - " + book.autor);
            li.appendChild(span);

            Biblioteca.appendChild(li);
        } else {
            break;
        }
        ctt = i;
    }
    dupli();
    notfound();
}


/* ===== Gerador de Filtros ===== */

function filtroGeneros() {
    firebase.firestore()
        .collection('livros')
        .get()
        .then(snapshot => {
            const cnt = snapshot.docs.map(doc => doc.data());
            for (i = 0; i < cnt.length; i++) {
                var contt = cnt[i];
                var x = 0;
                var e = 1;

                if (i > 4) {
                    break
                } else {

                    for (let i = 0; i < 1; i++) {
                        const element = [i];

                        while (x < e) {
                            if (contt.autor == undefined) {
                                break;
                            } else {
                                const genero = document.getElementById("genero");
                                const div = document.createElement('div');
                                div.classList.add("filtro");
                                const span = document.createElement('span');
                                const cttg = contt.genero[i];
                                span.innerText = cttg;
                                const input = document.createElement('input');
                                input.type = "checkbox";
                                input.onclick = inputgen;
                                input.classList.add("genero");
                                input.innerText = contt.genero[i];

                                div.append(input);
                                div.append(span);
                                genero.appendChild(div);

                            }
                            x++;
                        }

                    }

                }
            }
        })
}

function filtroautores() {
    firebase.firestore()
        .collection('livros')
        .get()
        .then(snapshot => {
            const cnt = snapshot.docs.map(doc => doc.data());
            for (i = 0; i < cnt.length; i++) {
                var contt = cnt[i];
                var x = 0;
                var e = 1;

                if (i > 3) {
                    break
                } else {

                    for (let i = 0; i < 1; i++) {
                        const element = [i];

                        while (x < e) {
                            if (contt.autor == undefined) {
                                break;
                            } else {
                                const autor = document.getElementById("autor");
                                const div = document.createElement('div');
                                div.classList.add("filtro");
                                const span = document.createElement('span');
                                span.innerText = contt.autor;
                                const input = document.createElement('input');
                                input.type = "checkbox";
                                input.onclick = inputautor;
                                input.classList.add("autor");
                                input.innerText = contt.autor;

                                div.append(input);
                                div.append(span);
                                autor.appendChild(div);
                            }
                            x++;
                        }

                    }

                }
            }
        })
}


/* ===== Filtro por Estrelas ===== */

document.getElementById("input1").addEventListener("click", input1);
function input1() {
    var input1 = document.getElementById("input1").checked;
    const inp1 = document.querySelectorAll('.input1');

    if (input1 == true) {
        var input = "1";
    } else {
        var input = "0";
    }

    if (input1 == false) {
        inp1.forEach(e => {
            e.remove();
        });
    }

    if (input == "0") {
        fic();
    } else {
        firebase.firestore()
            .collection('livros')
            .where('nota', '==', input)
            .get()
            .then(snapshot => {
                const funcestrelas = snapshot.docs.map(doc => doc.data());
                addEstrelas(funcestrelas);
            });
    }
}

document.getElementById("input2").addEventListener("click", input2);
function input2() {
    var input2 = document.getElementById("input2").checked;
    const inp2 = document.querySelectorAll('.input2');

    if (input2 == true) {
        var input = "2";
    } else {
        var input = "0";
    }

    if (input2 == false) {
        inp2.forEach(e => {
            e.remove();
        });
    }

    if (input == "0") {
        fic();
    } else {
        firebase.firestore()
            .collection('livros')
            .where('nota', '==', input)
            .get()
            .then(snapshot => {
                const funcestrelas = snapshot.docs.map(doc => doc.data());
                addEstrelas(funcestrelas);
            });
    }
}

document.getElementById("input3").addEventListener("click", input3);
function input3() {
    var input3 = document.getElementById("input3").checked;
    const inp3 = document.querySelectorAll('.input3');

    if (input3 == true) {
        var input = "3";
    } else {
        var input = "0";
    }

    if (input3 == false) {
        inp3.forEach(e => {
            e.remove();
        });
    }

    if (input == "0") {
        fic();
    } else {
        firebase.firestore()
            .collection('livros')
            .where('nota', '==', input)
            .get()
            .then(snapshot => {
                const funcestrelas = snapshot.docs.map(doc => doc.data());
                addEstrelas(funcestrelas);
            });
    }
}

document.getElementById("input4").addEventListener("click", input4);
function input4() {
    var input4 = document.getElementById("input4").checked;
    const inp4 = document.querySelectorAll('.input4');

    if (input4 == true) {
        var input = "4";
    } else {
        var input = "0";
    }

    if (input4 == false) {
        inp4.forEach(e => {
            e.remove();
        });
    }

    if (input == "0") {
        fic();
    } else {
        firebase.firestore()
            .collection('livros')
            .where('nota', '==', input)
            .get()
            .then(snapshot => {
                const funcestrelas = snapshot.docs.map(doc => doc.data());
                addEstrelas(funcestrelas);
            });
    }
}

document.getElementById("input5").addEventListener("click", input5);
function input5() {
    var input5 = document.getElementById("input5").checked;
    const inp5 = document.querySelectorAll('.input5');

    if (input5 == true) {
        var input = "5";
    } else {
        var input = "0";
    }

    if (input5 == false) {
        inp5.forEach(e => {
            e.remove();
        });
    }

    if (input == "0") {
        fic();
    } else {
        firebase.firestore()
            .collection('livros')
            .where('nota', '==', input)
            .get()
            .then(snapshot => {
                const funcestrelas = snapshot.docs.map(doc => doc.data());
                addEstrelas(funcestrelas);
            });
    }
}

function fic() {
    var input1 = document.getElementById("input1").checked;
    var input2 = document.getElementById("input2").checked;
    var input3 = document.getElementById("input3").checked;
    var input4 = document.getElementById("input4").checked;
    var input5 = document.getElementById("input5").checked;

    if ((input1 == true) || (input2 == true) || (input3 == true) || (input4 == true) || (input5 == true)) {

    } else {
        verificarInputs();
    }

}

function addEstrelas(funcestrelas) {
    const Biblioteca = document.getElementById("Biblioteca");

    const elementosParaExcluir = document.querySelectorAll('.null');
    elementosParaExcluir.forEach(elemento => {
        elemento.remove();
    });

    for (i = 0; i < funcestrelas.length; i++) {
        let book = funcestrelas[i];

        if (i < 1000) {
            const li = document.createElement('li');
            li.id = "a" + book.id;
            li.classList.add("found");

            if (book.nota == 1) {
                li.classList.add("input1");
            } if (book.nota == 2) {
                li.classList.add("input2");
            } if (book.nota == 3) {
                li.classList.add("input3");
            } if (book.nota == 4) {
                li.classList.add("input4");
            } if (book.nota == 5) {
                li.classList.add("input5");
            }

            const img = document.createElement('img');
            img.src = book.imagem;
            img.id = book.id;
            li.appendChild(img);

            const span = document.createElement('span');
            span.id = book.id;
            span.innerHTML = (book.titulo + " - " + book.autor);
            li.appendChild(span);

            Biblioteca.appendChild(li);
        } else {
            break;
        }
        ctt = i;
    }
    dupli();
    notfound();
}


/* ===== Filtro por Gêneros ===== */

function inputgen() {
    var htcollection = document.getElementsByClassName("genero");
    const genero = [...htcollection]

    for (let i = 0; i < genero.length; i++) {
        const gen = genero[i];
        gen.id = i;
        gen.classList.add("genero" + i);
    }

    var genero0 = document.getElementById("0").checked;
    var genero1 = document.getElementById("1").checked;
    var genero2 = document.getElementById("2").checked;
    var genero3 = document.getElementById("3").checked;

    if (genero0) {
        FiltroGen01();
    }
    if (genero1) {
        FiltroGen02();
    }
    if (genero2) {
        FiltroGen03();
    }
    if (genero3) {
        FiltroGen04();
    } else {
        ficgenero();
    }

    const gen0 = document.querySelectorAll('.gen0');
    const gen1 = document.querySelectorAll('.gen1');
    const gen2 = document.querySelectorAll('.gen2');
    const gen3 = document.querySelectorAll('.gen3');

    if (genero0 == false) {
        gen0.forEach(e => {
            e.remove();
        });
    }
    if (genero1 == false) {
        gen1.forEach(e => {
            e.remove();
        });
    }
    if (genero2 == false) {
        gen2.forEach(e => {
            e.remove();
        });
    }
    if (genero3 == false) {
        gen3.forEach(e => {
            e.remove();
        });
    }

}

function FiltroGen01() {
    var genero0 = document.getElementById("0").checked;
    const gen0 = document.querySelectorAll('.genero0');
    const gen = document.querySelectorAll('.gen0');

    firebase.firestore()
        .collection('livros')
        .get()
        .then(snapshot => {
            const cnt = snapshot.docs.map(doc => doc.data());
            for (e = 0; e < 1; e++) {
                var contt = cnt[e];

                if (genero0 == true) {
                    var input = gen0[0].textContent;
                }

                firebase.firestore()
                    .collection('livros')
                    .where('genero', 'array-contains', input)
                    .get()
                    .then(snapshot => {
                        const genero = snapshot.docs.map(doc => doc.data());
                        addgenero(genero);
                        dupli();
                    });
            }
        }
        )
}

function FiltroGen02() {
    var genero0 = document.getElementById("1").checked;
    const gen0 = document.querySelectorAll('.genero1');
    const gen = document.querySelectorAll('.gen1');

    firebase.firestore()
        .collection('livros')
        .get()
        .then(snapshot => {
            const cnt = snapshot.docs.map(doc => doc.data());
            for (e = 0; e < 1; e++) {
                var contt = cnt[e];

                if (genero0 == true) {
                    var input = gen0[0].textContent;
                }

                firebase.firestore()
                    .collection('livros')
                    .where('genero', 'array-contains', input)
                    .get()
                    .then(snapshot => {
                        const genero = snapshot.docs.map(doc => doc.data());
                        addgenero(genero);
                        dupli();
                    });
            }
        }
        )
}

function FiltroGen03() {
    var genero0 = document.getElementById("2").checked;
    const gen0 = document.querySelectorAll('.genero2');
    const gen = document.querySelectorAll('.gen2');

    firebase.firestore()
        .collection('livros')
        .get()
        .then(snapshot => {
            const cnt = snapshot.docs.map(doc => doc.data());
            for (e = 0; e < 1; e++) {
                var contt = cnt[e];

                if (genero0 == true) {
                    var input = gen0[0].textContent;
                }

                firebase.firestore()
                    .collection('livros')
                    .where('genero', 'array-contains', input)
                    .get()
                    .then(snapshot => {
                        const genero = snapshot.docs.map(doc => doc.data());
                        addgenero(genero);
                        dupli();
                    });
            }
        }
        )
}

function FiltroGen04() {
    var genero0 = document.getElementById("3").checked;
    const gen0 = document.querySelectorAll('.genero3');
    const gen = document.querySelectorAll('.gen3');

    firebase.firestore()
        .collection('livros')
        .get()
        .then(snapshot => {
            const cnt = snapshot.docs.map(doc => doc.data());
            for (e = 0; e < 1; e++) {
                var contt = cnt[e];

                if (genero0 == true) {
                    var input = gen0[0].textContent;
                }

                firebase.firestore()
                    .collection('livros')
                    .where('genero', 'array-contains', input)
                    .get()
                    .then(snapshot => {
                        const genero = snapshot.docs.map(doc => doc.data());
                        addgenero(genero);
                        dupli();
                    });
            }
        }

        )
}

function ficgenero() {
    var genero0 = document.getElementById("0").checked;
    var genero1 = document.getElementById("1").checked;
    var genero2 = document.getElementById("2").checked;
    var genero3 = document.getElementById("3").checked;

    if ((genero0 == true) || (genero1 == true) || (genero2 == true) || (genero3 == true)) {

    } else {
        verificarInputs();
    }
}

function addgenero(genero) {
    const Biblioteca = document.getElementById("Biblioteca");

    const elementosParaExcluir = document.querySelectorAll('.null');
    elementosParaExcluir.forEach(elemento => {
        elemento.remove();
    });

    var gen0 = document.querySelectorAll('.genero0');
    var gen1 = document.querySelectorAll('.genero1');
    var gen2 = document.querySelectorAll('.genero2');
    var gen3 = document.querySelectorAll('.genero3');

    for (i = 0; i < genero.length; i++) {
        let book = genero[i];

        if (i < 1000) {
            const li = document.createElement('li');
            li.id = "a" + book.id;
            li.classList.add("found");

            if ((book.genero[0] == gen0[0].textContent) || (book.genero[1] == gen0[0].textContent) || (book.genero[2] == gen0[0].textContent) || (book.genero[3] == gen0[0].textContent) || (book.genero[4] == gen0[0].textContent)) {
                li.classList.add("gen0");
            } else if ((book.genero[0] == gen1[0].textContent) || (book.genero[1] == gen1[0].textContent) || (book.genero[2] == gen1[0].textContent) || (book.genero[3] == gen1[0].textContent) || (book.genero[4] == gen1[0].textContent)) {
                li.classList.add("gen1");
            } else if ((book.genero[0] == gen2[0].textContent) || (book.genero[1] == gen2[0].textContent) || (book.genero[2] == gen2[0].textContent) || (book.genero[3] == gen2[0].textContent) || (book.genero[4] == gen2[0].textContent)) {
                li.classList.add("gen2");
            } else if ((book.genero[0] == gen3[0].textContent) || (book.genero[1] == gen3[0].textContent) || (book.genero[2] == gen3[0].textContent) || (book.genero[3] == gen3[0].textContent) || (book.genero[4] == gen3[0].textContent)) {
                li.classList.add("gen3");
            }

            const img = document.createElement('img');
            img.src = book.imagem;
            img.id = book.id;
            li.appendChild(img);

            const span = document.createElement('span');
            span.id = book.id;
            span.innerHTML = (book.titulo + " - " + book.autor);
            li.appendChild(span);

            Biblioteca.appendChild(li);

        } else {
            break;
        }
    }
    dupli();
    notfound();
}


/* ===== Filtro por Autores ===== */

function inputautor() {
    var htcollection = document.getElementsByClassName("autor");
    const autor = [...htcollection]

    for (let i = 0; i < autor.length; i++) {
        const aut = autor[i];
        aut.id = "a" + i;
        aut.classList.add("autor" + i);
    }


    var autor0 = document.getElementById("a0").checked;
    var autor1 = document.getElementById("a1").checked;
    var autor2 = document.getElementById("a2").checked;
    var autor3 = document.getElementById("a3").checked;

    if (autor0) {
        Filtroaut01();
    }
    if (autor1) {
        Filtroaut02();
    }
    if (autor2) {
        Filtroaut03();
    }
    if (autor3) {
        Filtroaut04();
    } else {
        ficautor();
    }

    const aut0 = document.querySelectorAll('.aut0');
    const aut1 = document.querySelectorAll('.aut1');
    const aut2 = document.querySelectorAll('.aut2');
    const aut3 = document.querySelectorAll('.aut3');

    if (autor0 == false) {
        aut0.forEach(e => {
            e.remove();
        });
    }
    if (autor1 == false) {
        aut1.forEach(e => {
            e.remove();
        });
    }
    if (autor2 == false) {
        aut2.forEach(e => {
            e.remove();
        });
    }
    if (autor3 == false) {
        aut3.forEach(e => {
            e.remove();
        });
    }

}

function Filtroaut01() {
    var autor0 = document.getElementById("a0").checked;
    const aut0 = document.querySelectorAll('.autor0');

    firebase.firestore()
        .collection('livros')
        .get()
        .then(snapshot => {
            const cnt = snapshot.docs.map(doc => doc.data());
            for (e = 0; e < 1; e++) {
                var contt = cnt[e];

                if (autor0 == true) {
                    var input = aut0[0].textContent;
                }

                firebase.firestore()
                    .collection('livros')
                    .where('autor', '==', input)
                    .get()
                    .then(snapshot => {
                        const autor = snapshot.docs.map(doc => doc.data());
                        addautor(autor);
                        dupli();
                    });
            }
        }
        )
}

function Filtroaut02() {
    var autor0 = document.getElementById("a1").checked;
    const aut0 = document.querySelectorAll('.autor1');
    const aut = document.querySelectorAll('.aut1');

    firebase.firestore()
        .collection('livros')
        .get()
        .then(snapshot => {
            const cnt = snapshot.docs.map(doc => doc.data());
            for (e = 0; e < 1; e++) {
                var contt = cnt[e];

                if (autor0 == true) {
                    var input = aut0[0].textContent;
                }

                firebase.firestore()
                    .collection('livros')
                    .where('autor', '==', input)
                    .get()
                    .then(snapshot => {
                        const autor = snapshot.docs.map(doc => doc.data());
                        addautor(autor);
                        dupli();
                    });
            }
        }
        )
}

function Filtroaut03() {
    var autor0 = document.getElementById("a2").checked;
    const aut0 = document.querySelectorAll('.autor2');
    const aut = document.querySelectorAll('.aut2');

    firebase.firestore()
        .collection('livros')
        .get()
        .then(snapshot => {
            const cnt = snapshot.docs.map(doc => doc.data());
            for (e = 0; e < 1; e++) {
                var contt = cnt[e];

                if (autor0 == true) {
                    var input = aut0[0].textContent;
                }

                firebase.firestore()
                    .collection('livros')
                    .where('autor', '==', input)
                    .get()
                    .then(snapshot => {
                        const autor = snapshot.docs.map(doc => doc.data());
                        addautor(autor);
                        dupli();
                    });
            }
        }
        )
}

function Filtroaut04() {
    var autor0 = document.getElementById("a3").checked;
    const aut0 = document.querySelectorAll('.autor3');
    const aut = document.querySelectorAll('.aut3');

    firebase.firestore()
        .collection('livros')
        .get()
        .then(snapshot => {
            const cnt = snapshot.docs.map(doc => doc.data());
            for (e = 0; e < 1; e++) {
                var contt = cnt[e];

                if (autor0 == true) {
                    var input = aut0[0].textContent;
                }

                firebase.firestore()
                    .collection('livros')
                    .where('autor', '==', input)
                    .get()
                    .then(snapshot => {
                        const autor = snapshot.docs.map(doc => doc.data());
                        addautor(autor);
                        dupli();
                    });
            }
        }

        )
}

function ficautor() {
    var autor0 = document.getElementById("a0").checked;
    var autor1 = document.getElementById("a1").checked;
    var autor2 = document.getElementById("a2").checked;
    var autor3 = document.getElementById("a3").checked;

    if ((autor0 == true) || (autor1 == true) || (autor2 == true) || (autor3 == true)) {

    } else {
        verificarInputs();
    }
}

function addautor(autor) {
    const Biblioteca = document.getElementById("Biblioteca");

    const elementosParaExcluir = document.querySelectorAll('.null');
    elementosParaExcluir.forEach(elemento => {
        elemento.remove();
    });

    var aut0 = document.querySelectorAll('.autor0');
    var aut1 = document.querySelectorAll('.autor1');
    var aut2 = document.querySelectorAll('.autor2');
    var aut3 = document.querySelectorAll('.autor3');

    for (i = 0; i < autor.length; i++) {
        let book = autor[i];

        if (i < 1000) {
            const li = document.createElement('li');
            li.id = "a" + book.id;
            li.classList.add("found");

            if (book.autor == aut0[0].textContent) {
                li.classList.add("aut0");
            } else if (book.autor == aut1[0].textContent) {
                li.classList.add("aut1");
            } else if (book.autor == aut2[0].textContent) {
                li.classList.add("aut2");
            } else if (book.autor == aut3[0].textContent) {
                li.classList.add("aut3");
            }

            const img = document.createElement('img');
            img.src = book.imagem;
            img.id = book.id;
            li.appendChild(img);

            const span = document.createElement('span');
            span.id = book.id;
            span.innerHTML = (book.titulo + " - " + book.autor);
            li.appendChild(span);

            Biblioteca.appendChild(li);

        } else {
            break;
        }
    }
    dupli();
    notfound();
}


/* ===== Verificando os valores ===== */

function verificarInputs() {

    var input1 = document.getElementById("input1");
    var input2 = document.getElementById("input2");
    var input3 = document.getElementById("input3");
    var input4 = document.getElementById("input4");
    var input5 = document.getElementById("input5");

    var genero0 = document.getElementById("0");
    var genero1 = document.getElementById("1");
    var genero2 = document.getElementById("2");
    var genero3 = document.getElementById("3");

    var autor0 = document.getElementById("a0");
    var autor1 = document.getElementById("a1");
    var autor2 = document.getElementById("a2");
    var autor3 = document.getElementById("a3");

    if ((input1 == null || input1.checked == false) &&
        (input2 == null || input2.checked == false) &&
        (input3 == null || input3.checked == false) &&
        (input4 == null || input4.checked == false) &&
        (input5 == null || input5.checked == false) &&

        (genero0 == null || genero0.checked == false) &&
        (genero1 == null || genero1.checked == false) &&
        (genero2 == null || genero2.checked == false) &&
        (genero3 == null || genero3.checked == false) &&

        (autor0 == null || autor0.checked == false) &&
        (autor1 == null || autor1.checked == false) &&
        (autor2 == null || autor2.checked == false) &&
        (autor3 == null || autor3.checked == false)) {
        findbooks();
    }
}

var buscar = document.getElementById('filtro');
var lupa = document.getElementById('buscar');

lupa.addEventListener("click", function () {
    Find();
});

function Find() {

    firebase.firestore()
        .collection("livros")
        .where("titulo", "==", buscar.value)
        .get()
        .then(snapshot => {
            const books = snapshot.docs.map(doc => doc.data());
            addbusca(books);
        })

    firebase.firestore()
        .collection("livros")
        .where("autor", "==", buscar.value)
        .get()
        .then(snapshot => {
            const books = snapshot.docs.map(doc => doc.data());
            addbusca(books); console.log(books);
        })

    firebase.firestore()
        .collection("livros")
        .where('genero', 'array-contains', buscar.value)
        .get()
        .then(snapshot => {
            const books = snapshot.docs.map(doc => doc.data());
            addbusca(books);
        })

    firebase.firestore()
        .collection("livros")
        .where('descricao', '==', buscar.value)
        .get()
        .then(snapshot => {
            const books = snapshot.docs.map(doc => doc.data());
            addbusca(books); console.log(books);
        })
}

function addbusca(books) {
    const Biblioteca = document.getElementById("Biblioteca");

    const elementosParaExcluir = document.querySelectorAll('.null');
    elementosParaExcluir.forEach(elemento => {
        elemento.remove();
    });

    if (books.length >= 1) {
        for (i = 0; i < books.length; i++) {
            let book = books[i];

            if (i < 1000) {
                const li = document.createElement('li');
                li.id = "a" + book.id;
                li.classList.add("found");

                const img = document.createElement('img');
                img.src = book.imagem;
                img.id = book.id;
                li.appendChild(img);

                const span = document.createElement('span');
                span.id = book.id;
                span.innerHTML = (book.titulo + " - " + book.autor);
                li.appendChild(span);

                Biblioteca.appendChild(li);
            } else {
                break;
            }
            ctt = i;
        }
    }
    dupli();
    //notfound();
}

/* ===== Inputs ===== */
function inputs() {
    var gender = window.location.search;
    gender = decodeURIComponent(gender);
    gender = gender.replace("?selectedgender=", "");  console.log(gender);

    if (gender) {
        firebase.firestore()
            .collection('livros')
            .where('genero', 'array-contains', gender)
            .get()
            .then(snapshot => {
                const inputs = snapshot.docs.map(doc => doc.data());
                addInputs(inputs); console.log(inputs);
                dupli();
            })
    }
}

function addInputs(inputs) {
    const Biblioteca = document.getElementById("Biblioteca");

    const elementosParaExcluir = document.querySelectorAll('.null');
    elementosParaExcluir.forEach(elemento => {
        elemento.remove();
    });


    for (i = 0; i < inputs.length; i++) {
        let book = inputs[i];

        if (i < 1000) {
            const li = document.createElement('li');
            li.id = "a" + book.id;
            li.classList.add("found");

            const img = document.createElement('img');
            img.src = book.imagem;
            img.id = book.id;
            li.appendChild(img);

            const span = document.createElement('span');
            span.id = book.id;
            span.innerHTML = (book.titulo + " - " + book.autor);
            li.appendChild(span);

            Biblioteca.appendChild(li);

        } else {
            break;
        }
    }
    dupli();
    notfound();
}