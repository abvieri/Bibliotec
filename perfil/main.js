function Init() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {

        } else {
            window.location.href = "../index.html";
        }
    })
    user();
    findAlugados();
    findFavoritos();
    findHistorico();
    gerenciar();
}

/* Variáveis Globais */

var contgen = 1;
var countt = 0;
var img = document.querySelector('input[type=file]');


function user() {
    var nomeuser = document.getElementById('nome-usuario');
    var emailuser = document.getElementById('email-usuario');

    firebase.auth().onAuthStateChanged((user) => {
        firebase.firestore().collection('users').where('email', '==', user.email).get().then(snapshot => {
            const users = snapshot.docs.map(doc => doc.data());
            var userlog = users[0];
            var username = userlog.username;
            var useremail = userlog.email;
            var userimage = userlog.userPhoto;

            var sua_foto = document.getElementById('sua_foto');
            var img = document.createElement('img');
            if (userimage == undefined) {
                img.src = "../img/perfil.jpg";
            } else {
                img.src = userimage;
            }
            img.id = "imgusuario";
            sua_foto.appendChild(img);

            var Nome = document.createElement('h5');
            Nome.classList.add('minha-info');
            Nome.style = "display: flex;";
            Nome.innerText = "Nome do usuário: ";
            var p = document.createElement('p');
            p.innerText = username;
            p.style = "margin-left: 10px;";
            Nome.appendChild(p);
            nomeuser.appendChild(Nome);

            var email = document.createElement('h5');
            email.classList.add('minha-info');
            email.style = "display: flex;";
            email.innerText = "Email: ";
            var pe = document.createElement('p');
            pe.innerText = useremail;
            pe.style = "margin-left: 10px;";
            email.appendChild(pe)
            emailuser.appendChild(email);
        })
    })
}

function abiblioteca() {
    window.location.href = "../biblioteca/biblio.html";
}

function aSobre() {
    window.location.href = "../Sobre/sobre.html";
}


/* ===== Encontrar e Implementar Livros ===== */

function findAlugados() {
    firebase.auth().onAuthStateChanged((user) => {
        firebase.firestore().collection('users').where('email', '==', user.email).get().then(snapshot => {
            const users = snapshot.docs.map(doc => doc.data());
            var favoritos = users[0].alugados;
            favoritos.forEach(function (e) {
                firebase.firestore()
                    .collection('livros')
                    .where('id', '==', e)
                    .get()
                    .then(snapshot => {
                        const livros = snapshot.docs.map(doc => doc.data());
                        addbookalugados(livros);
                    })
            })
        })
    })
}

function addbookalugados(alugados) {
    const book = document.getElementById("searchalugados");

    for (i = 0; i < alugados.length; i++) {
        let transaction = alugados[i];

        if (i < 5) {
            const li = document.createElement('li');
            li.id = transaction.id;
            li.classList.add("foundalugados");

            const img = document.createElement('img');
            img.src = transaction.imagem;
            img.id = transaction.id;
            li.appendChild(img);

            const span = document.createElement('span');
            span.id = transaction.id;
            span.innerHTML = (transaction.titulo + " - " + transaction.autor);
            li.appendChild(span);

            book.appendChild(li);
        } else {
            break;
        }
    }
    notfoundAlugados();
}


function findFavoritos() {
    firebase.auth().onAuthStateChanged((user) => {
        firebase.firestore().collection('users').where('email', '==', user.email).get().then(snapshot => {
            const users = snapshot.docs.map(doc => doc.data());
            var favoritos = users[0].salvos;
            favoritos.forEach(function (e) {
                firebase.firestore()
                    .collection('livros')
                    .where('id', '==', e)
                    .get()
                    .then(snapshot => {
                        const livros = snapshot.docs.map(doc => doc.data());
                        addbookfavoritos(livros);
                    })
            })
        })
    })
}

function addbookfavoritos(livros) {
    const book = document.getElementById("searchfavoritos");

    for (i = 0; i < livros.length; i++) {
        let transaction = livros[i];

        if (i < 5) {
            const li = document.createElement('li');
            li.id = transaction.id;
            li.classList.add("foundfavoritos");

            const img = document.createElement('img');
            img.src = transaction.imagem;
            img.id = transaction.id;
            li.appendChild(img);

            const span = document.createElement('span');
            span.id = transaction.id;
            span.innerHTML = (transaction.titulo + " - " + transaction.autor);
            li.appendChild(span);

            book.appendChild(li);
        } else {
            break;
        }

    }
    notfoundfavoritos();
}


function findHistorico() {
    firebase.auth().onAuthStateChanged((user) => {
        firebase.firestore().collection('users').where('email', '==', user.email).get().then(snapshot => {
            const users = snapshot.docs.map(doc => doc.data());
            var favoritos = users[0].historico;
            favoritos.forEach(function (e) {
                firebase.firestore()
                    .collection('livros')
                    .where('titulo', '==', e)
                    .get()
                    .then(snapshot => {
                        const historico = snapshot.docs.map(doc => doc.data());
                        addbookhistorico(historico);
                    })
            })
        })
    })
}

function addbookhistorico(historico) {
    const book = document.getElementById("searchhistorico");

    for (i = 0; i < historico.length; i++) {
        let transaction = historico[i];

        if (i < 5) {
            const li = document.createElement('li');
            li.id = transaction.id;
            li.classList.add("foundhistorico");

            const img = document.createElement('img');
            img.src = transaction.imagem;
            img.id = transaction.id;
            li.appendChild(img);

            const span = document.createElement('span');
            span.id = transaction.id;
            span.innerHTML = (transaction.titulo + " - " + transaction.autor);
            li.appendChild(span);

            book.appendChild(li);
        } else {
            break;
        }

    }
    notfoundhistorico();
}


/* ===== Fazer Logout ===== */

function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = "../login/login.html";
    }).catch(() => {
        alert('Erro ao fazer logout');
    })
}


/* ===== Livros não encontrados ===== */

function notfoundAlugados() {
    var nf = document.querySelectorAll(".foundalugados");

    if (nf.length == 0 || nf == null || nf == undefined) {
        const Biblio = document.getElementsByClassName("Bibliotecaalugados");
        const div = document.createElement('div');
        const img = document.createElement('img');
        img.src = '../img/logo.png';
        div.id = 'notfoundalugados';
        div.classList.add('notfound');
        div.innerText = "Nenhum resultado encontrado";

        div.appendChild(img);
        Biblio[0].appendChild(div);
    } else {
        const notfoundalugados = document.getElementById("notfoundalugados");
        if (notfoundalugados) {
            notfoundalugados.remove();
        }
    }
}

function notfoundfavoritos() {
    var nf = document.querySelectorAll(".foundfavoritos");

    if (nf.length == 0 || nf == null || nf == undefined) {
        const Biblio = document.getElementsByClassName("Bibliotecafavoritos");
        const div = document.createElement('div');
        const img = document.createElement('img');
        img.src = '../img/logo.png';
        div.id = 'notfoundfavoritos';
        div.classList.add('notfound');
        div.innerText = "Nenhum resultado encontrado";

        div.appendChild(img);
        Biblio[0].appendChild(div);
    } else {
        const notfoundfavoritos = document.getElementById("notfoundfavoritos");
        if (notfoundfavoritos) {
            notfoundfavoritos.remove();
        }
    }
}

function notfoundhistorico() {
    var nf = document.querySelectorAll(".foundhistorico");
    if (nf.length == 0 || nf == null || nf == undefined) {
        const Biblio = document.getElementsByClassName("Bibliotecahistorico");
        const div = document.createElement('div');
        const img = document.createElement('img');
        img.src = '../img/logo.png';
        div.id = 'notfoundhistorico';
        div.classList.add('notfound');
        div.innerText = "Nenhum resultado encontrado";

        div.appendChild(img);
        Biblio[0].appendChild(div);
    } else {
        const notfoundhistorico = document.getElementById("notfoundhistorico");
        if (notfoundhistorico) {
            notfoundhistorico.remove();
        }
    }
}


/* ===== Limpar ===== */

function cleanhistory() {

    const confirmar = confirm('Deseja Limpar o Histórico?');
    if (confirmar) {
        const limpar = {
            historico: ['lista']
        }

        firebase.auth().onAuthStateChanged((user) => {
            firebase.firestore().collection('users').where('email', '==', user.email).get().then(snapshot => {
                const usuario = snapshot.docs.map(doc => doc.data());

                firebase.firestore().collection('users').where('email', '==', user.email).get().then(snapshot => {
                    firebase.firestore().collection('users').doc(snapshot.docs[0].id).update(limpar);
                    setTimeout(() => {
                        location.reload()
                    }, 1000);
                })
            })
        })
    }
}

function cleanfavoritos() {

    const conf = confirm('Deseja Limpar os Livros Salvos?');
    if (conf) {
        const limpar = {
            salvos: ['lista']
        }

        firebase.auth().onAuthStateChanged((user) => {
            firebase.firestore().collection('users').where('email', '==', user.email).get().then(snapshot => {
                const usuario = snapshot.docs.map(doc => doc.data());

                firebase.firestore().collection('users').where('email', '==', user.email).get().then(snapshot => {
                    firebase.firestore().collection('users').doc(snapshot.docs[0].id).update(limpar);
                    setTimeout(() => {
                        location.reload()
                    }, 1000);
                })
            })
        })
    }
}


/* ===== Modais ===== */

function ModalNome() {
    firebase.auth().onAuthStateChanged((user) => {

        firebase.firestore().collection('users').where('email', '==', user.email).get().then(snapshot => {
            const usuario = snapshot.docs.map(doc => doc.data());
            var Novonome = document.getElementById('Novonome');
            var Confirmarnome = document.getElementById('Confirmarnome');

            const newname = {
                username: Novonome.value
            }

            if (Novonome.value == Confirmarnome.value) {
                firebase.auth().onAuthStateChanged((user) => {
                    if (user) {
                        firebase.firestore().collection('users').where('email', '==', user.email).get().then(snapshot => {
                            firebase.firestore().collection('users').doc(snapshot.docs[0].id).update(newname);
                            setTimeout(() => {
                                location.reload()
                            }, 500);
                        })
                    }
                })
            } else {
                alert("Nomes divergentes");
            }
        })
    })
}

function ModalSenha() {
    firebase.auth().onAuthStateChanged((user) => {
        firebase.firestore().collection('users').where('email', '==', user.email).get().then(snapshot => {
            firebase.auth().sendPasswordResetEmail(user.email).then(() => {
                location.reload();
                alert('Email enviado com sucesso');
            });
        })
    })
}

img.addEventListener('change', (e) => {
    let file = e.target.files[0]
    const storage = firebase.storage();
    const upload = storage.ref("user-images/" + e.target.files[0].name).put(e.target.files[0]);
    upload.on("state_changed", function (snapshot) {

        console.log(snapshot);
        upload.snapshot.ref.getDownloadURL().then(function (url_imagem) {

            firebase.auth().onAuthStateChanged((user) => {

                firebase.firestore().collection('users').where('email', '==', user.email).get().then(snapshot => {
                    const usuario = snapshot.docs.map(doc => doc.data());

                    const newpicture = {
                        userPhoto: url_imagem
                    }

                    firebase.auth().onAuthStateChanged((user) => {
                        if (user) {
                            firebase.firestore().collection('users').where('email', '==', user.email).get().then(snapshot => {
                                firebase.firestore().collection('users').doc(snapshot.docs[0].id).update(newpicture);
                                setTimeout(() => {
                                    location.reload()
                                }, 500);
                            })
                        }
                    })
                })
            })

        })

    })
})

function gerenciar() {
    firebase.auth().onAuthStateChanged((user) => {

        firebase.firestore().collection('users').where('email', '==', user.email).get().then(snapshot => {
            const usuario = snapshot.docs.map(doc => doc.data());

            if (usuario[0].acesso == "administrador") {
                const div = document.getElementById('janelaadm');
                div.style.display = "block";

                const divcust = document.getElementById('custom');
                divcust.id = "custo";
            } else {
                const div = document.getElementById('custo');
                div.id = "custom";
            }
        })
    })
}


/* == Modal Adicionar == */

function adicionargen(dados) {
    var formadd = document.getElementById('formadd');
    var formedit = document.getElementById('formedit');
    if (dados) {
        contgen = dados;
    }

    if (contgen < 7) {
        const div = document.createElement('div');
        div.classList.add('col-md-12');
        div.classList.add('gener');
        div.style.marginTop = "10px";
        const input = document.createElement('input');
        input.type = "text";
        input.classList.add('form-control');
        input.id = "inputgen" + contgen;

        div.appendChild(input);
        formadd.appendChild(div);
        formedit.appendChild(div);
        contgen = contgen + 1;
    } else {
        alert("Limite de generos atingido");
    }
}

function add() {
    var dados = createTransaction();
    var img = document.querySelector('#formFileimg');
    var file = (img.files[0])

    if (file != null) {

        const upload = firebase.storage().ref("books-images/" + file.name).put(file);
        upload.on("state_changed", function (snapshot) {

            upload.snapshot.ref.getDownloadURL().then(function (url_imagem) {
                dados.imagem = url_imagem;

                var verificação = verificarcampos();

                if (verificação) {
                    firebase.firestore()
                        .collection('livros')
                        .add(dados)
                        .then(() => {

                            firebase.firestore()
                                .collection('livros')
                                .where("titulo", "==", dados.titulo)
                                .get().then(snapshot => {
                                    newdados = { id: snapshot.docs[0].id };
                                    firebase.firestore().collection('livros').doc(snapshot.docs[0].id).update(newdados);
                                    setTimeout(() => {
                                        setTimeout(() => {
                                            location.reload();
                                            alert("Cadastro realizado com sucesso!");
                                        }, 1000);
                                    }, 500);
                                })

                        })
                }
            })
        })

    } else {
        var alertimg = document.getElementById('alertimg');
        alertimg.style.display = "block";
    }
}

function createTransaction() {

    const form = {

        titulo: () => document.getElementById('inputnome'),
        autor: () => document.getElementById('inputautor'),
        paginas: () => document.getElementById('inputpag'),
        ano: () => document.getElementById('inputano'),

        genero: () => document.getElementById('inputgen'),
        genero1: () => document.getElementById('inputgen1'),
        genero2: () => document.getElementById('inputgen2'),
        genero3: () => document.getElementById('inputgen3'),
        genero4: () => document.getElementById('inputgen4'),
        genero5: () => document.getElementById('inputgen5'),
        genero6: () => document.getElementById('inputgen6'),

        licenca: () => document.getElementById('inputlic'),
        tipo: () => document.getElementById('inputtipo'),
        exemplares: () => document.getElementById('exemplares'),
        imagem: () => document.getElementById('formFileimg'),
        descricao: () => document.getElementById('descricao'),
        instituto: () => document.getElementById('instituto')
    }


    if (form.genero().value != "" || form.genero().value != null) {
        var gen = [form.genero().value]
    }

    if (form.genero1() != null) {
        var gen = [form.genero().value, form.genero1().value]
    }

    if (form.genero2() != null) {
        var gen = [form.genero().value, form.genero1().value, form.genero2().value]
    }

    if (form.genero3() != null) {
        var gen = [form.genero().value, form.genero1().value, form.genero2().value,
        form.genero3().value]
    }

    if (form.genero4() != null) {
        var gen = [form.genero().value, form.genero1().value, form.genero2().value,
        form.genero3().value, form.genero4().value]
    }

    if (form.genero5() != null) {
        var gen = [form.genero().value, form.genero1().value, form.genero2().value,
        form.genero3().value, form.genero4().value, form.genero5().value]
    }

    if (form.genero6() != null) {
        var gen = [form.genero().value, form.genero1().value, form.genero2().value,
        form.genero3().value, form.genero4().value, form.genero5().value, form.genero6().value]
    }

    return {
        titulo: form.titulo().value,
        autor: form.autor().value,
        paginas: form.paginas().value,
        ano: form.ano().value,
        genero: gen,
        licenca: form.licenca().value,
        tipo: form.tipo().value,
        exemplares: form.exemplares().value,
        imagem: form.imagem().value,
        descricao: form.descricao().value,
        instituto: form.instituto().value,
        nota: "N",
        id: "N",
    };
}

function verificarcampos() {
    var dados = createTransaction();
    if (dados.titulo != '') {
        var alerttitulo = document.getElementById('alerttitulo');
        alerttitulo.style.display = "none";

        if (dados.autor != '') {
            var alertautor = document.getElementById('alertautor');
            alertautor.style.display = "none";

            if (dados.paginas != '') {
                var alertpag = document.getElementById('alertpag');
                alertpag.style.display = "none";

                if (dados.ano != '') {
                    var alertano = document.getElementById('alertano');
                    alertano.style.display = "none";

                    if (dados.genero != '') {
                        var alertgen = document.getElementById('alertgen');
                        alertgen.style.display = "none";

                        if (dados.imagem != '') {
                            var alertimg = document.getElementById('alertimg');
                            alertimg.style.display = "none";

                            if (dados.descricao != '') {
                                var alertdescricao = document.getElementById('alertsin');
                                alertdescricao.style.display = "none";
                                return true;

                            } else {
                                var alertdescricao = document.getElementById('alertsin');
                                alertdescricao.style.display = "block";
                            }

                        } else {
                            var alertimg = document.getElementById('alertimg');
                            alertimg.style.display = "block";
                        }

                    } else {
                        var alertgen = document.getElementById('alertgen');
                        alertgen.style.display = "block";
                    }

                } else {
                    var alertano = document.getElementById('alertano');
                    alertano.style.display = "block";
                }

            } else {
                var alertpag = document.getElementById('alertpag');
                alertpag.style.display = "block";
            }

        } else {
            var alertautor = document.getElementById('alertautor');
            alertautor.style.display = "block";
        }

    } else {
        var alerttitulo = document.getElementById('alerttitulo');
        alerttitulo.style.display = "block";
    }

}


/* == Modal Gerenciar Livros == */

function ModalGerenciar() {
    var body = document.getElementById('modal-body');

    firebase.firestore()
        .collection('livros')
        .get()
        .then(snapshot => {
            const book = snapshot.docs.map(doc => doc.data());
            book.forEach(e => {

                var div1 = document.createElement('div');
                div1.classList.add('card');
                div1.classList.add('mb-3');
                div1.classList.add('carddiv');
                body.appendChild(div1);

                var div2 = document.createElement('div');
                div2.classList.add('row');
                div2.classList.add('g-0');
                div1.appendChild(div2);

                var div3 = document.createElement('div');
                div3.classList.add('col-md-4');
                var img = document.createElement('img');
                img.classList.add('previa');
                img.src = e.imagem;
                div3.appendChild(img);

                var div4 = document.createElement('div');
                div4.classList.add('col-md-8');

                var div5 = document.createElement('div');
                div5.classList.add('card-body');
                div5.id = "card-body";

                var h5 = document.createElement('h5');
                h5.classList.add('card-title');
                h5.innerText = e.titulo;

                var p1 = document.createElement('p');
                p1.classList.add('card-text');
                p1.classList.add('text-secondary');
                p1.innerText = "por " + e.autor;

                var p2 = document.createElement('p');
                p2.classList.add('card-text');
                p2.classList.add('mb-0');
                p2.innerText = "Tipo: " + e.tipo;

                var p3 = document.createElement('p');
                p3.classList.add('card-text');
                p3.classList.add('mb-0');
                p3.innerText = "Licença: " + e.licenca;

                var p4 = document.createElement('p');
                p4.classList.add('card-text');
                p4.classList.add('mb-5');
                p4.innerText = "Instituição: " + e.instituto;

                var div6 = document.createElement('div');
                div6.classList.add('flexend');

                var div7 = document.createElement('div');
                div7.classList.add('btn');
                div7.classList.add('Excluir');
                div7.classList.add('btn-warning');
                div7.innerText = "Excluir";

                div7.onclick = function divexcluir(e) {
                    const confirmar = confirm('Deseja excluir o livro?');
                    if (confirmar) {
                        firebase.firestore()
                            .collection("livros")
                            .doc(e.target.id)
                            .delete()
                            .then(() => {
                                setTimeout(() => {
                                    location.reload();
                                }, 1000);
                            })
                            .catch(error => {
                                console.log(error);
                                alert('Erro ao excluir livro');
                            })
                    }
                };

                div7.id = e.id;
                div6.appendChild(div7);

                var div8 = document.createElement('div');
                div8.classList.add('btn');
                div8.classList.add('btn-dark');
                div8.innerText = "Editar";
                div8.id = e.id;
                div8.onclick = function diveditar(e) {
                    modaleditar(e.target.id);
                };

                div6.appendChild(div8);

                div5.appendChild(h5);
                div5.appendChild(p1);
                div5.appendChild(p2);
                div5.appendChild(p3);
                div5.appendChild(p4);
                div5.appendChild(div6);

                div4.appendChild(div5);
                div2.appendChild(div3);
                div2.appendChild(div4);
            });
        })
}

var form = {};
var myform = document.getElementById('myform');

function modaleditar(value) {
    vall = value;
    var contador = 0;
    var modaleditar = document.getElementById('modal-editar');
    var carddiv = document.querySelectorAll('.carddiv');
    modaleditar.style.display = 'block';

    for (let i = 0; i < carddiv.length; i++) {
        const e = carddiv[i];
        e.style.display = 'none';
    }

    firebase.firestore()
        .collection('livros')
        .doc(value)
        .get().then(snapshot => {
            const livro = (snapshot._delegate._document.data.value.mapValue.fields);
            const gener = (livro.genero.arrayValue.values);

            myform.querySelector('#editinputnome').value = livro.titulo.stringValue;
            myform.querySelector('#editinputautor').value = livro.autor.stringValue;
            myform.querySelector('#editinputpag').value = livro.paginas.stringValue;
            myform.querySelector('#editinputano').value = livro.ano.stringValue;
            myform.querySelector('#editdescricao').value = livro.descricao.stringValue;
            myform.querySelector('#editinputlic').value = livro.licenca.stringValue;
            myform.querySelector('#editinputtipo').value = livro.tipo.stringValue;
            myform.querySelector('#institutoedit').value = livro.instituto.stringValue;


            gener.forEach(e => {
                if (contador == 0) {
                    myform.querySelector('#inputgener').value = e.stringValue;
                } else if (contador == 1) {
                    const element = document.getElementById("inputgen1");
                    if (element) {
                        element.remove();
                    }

                    adicionargen(1);
                    myform.querySelector('#inputgen1').value = e.stringValue;
                } else if (contador == 2) {
                    const element = document.getElementById("inputgen2");
                    if (element) {
                        element.remove();
                    }

                    adicionargen(2);
                    myform.querySelector('#inputgen2').value = e.stringValue;
                } else if (contador == 3) {
                    const element = document.getElementById("inputgen3");
                    if (element) {
                        element.remove();
                    }

                    adicionargen(3);
                    myform.querySelector('#inputgen3').value = e.stringValue;
                } else if (contador == 4) {
                    const element = document.getElementById("inputgen4");
                    if (element) {
                        element.remove();
                    }

                    adicionargen(4);
                    myform.querySelector('#inputgen4').value = e.stringValue;
                } else if (contador == 5) {
                    const element = document.getElementById("inputgen5");
                    if (element) {
                        element.remove();
                    }

                    adicionargen(5);
                    myform.querySelector('#inputgen5').value = e.stringValue;
                } else if (contador == 6) {
                    const element = document.getElementById("inputgen6");
                    if (element) {
                        element.remove();
                    }

                    adicionargen(6);
                    myform.querySelector('#inputgen6').value = e.stringValue;
                }

                contador = contador + 1;
            });

            myform.querySelector('#editexemplares').value = livro.exemplares.integerValue;
            form = {

                titulo: () => document.getElementById('editinputnome'),
                autor: () => document.getElementById('editinputautor'),
                paginas: () => document.getElementById('editinputpag'),
                ano: () => document.getElementById('editinputano'),

                genero: () => document.getElementById('inputgener'),
                genero1: () => document.getElementById('inputgen1'),
                genero2: () => document.getElementById('inputgen2'),
                genero3: () => document.getElementById('inputgen3'),
                genero4: () => document.getElementById('inputgen4'),
                genero5: () => document.getElementById('inputgen5'),
                genero6: () => document.getElementById('inputgen6'),

                licenca: () => document.getElementById('editinputlic'),
                tipo: () => document.getElementById('editinputtipo'),
                exemplares: () => document.getElementById('editexemplares'),
                imagem: () => document.getElementById('editformFileimg'),
                descricao: () => document.getElementById('editdescricao'),
                instituto: () => document.getElementById('institutoedit'),
            }

            var gen;

            if (form.genero().value != "" || form.genero().value != null) {
                gen = [form.genero().value]
            }

            if (form.genero1() != null) {
                gen = [form.genero().value, form.genero1().value]
            }

            if (form.genero2() != null) {
                gen = [form.genero().value, form.genero1().value, form.genero2().value]
            }

            if (form.genero3() != null) {
                gen = [form.genero().value, form.genero1().value, form.genero2().value,
                form.genero3().value]
            }

            if (form.genero4() != null) {
                gen = [form.genero().value, form.genero1().value, form.genero2().value,
                form.genero3().value, form.genero4().value]
            }

            if (form.genero5() != null) {
                gen = [form.genero().value, form.genero1().value, form.genero2().value,
                form.genero3().value, form.genero4().value, form.genero5().value]
            }

            if (form.genero6() != null) {
                gen = [form.genero().value, form.genero1().value, form.genero2().value,
                form.genero3().value, form.genero4().value, form.genero5().value, form.genero6().value]
            }

            lib = livro;
            genner = gen;
        })
}

function addeditar() {
    livro = lib;
    gen = genner;
    var img = document.querySelector('#formFileimg');
    var file = (img.files[0]);

    if (form.titulo().value != livro.titulo.stringValue) {
        titulo = form.titulo().value;
    } else {
        titulo = livro.titulo.stringValue;
    }

    if (form.autor().value != livro.autor.stringValue) {
        autor = form.autor().value;
    } else {
        autor = livro.autor.stringValue;
    }

    if (form.paginas().value != livro.paginas.stringValue) {
        paginas = form.paginas().value;
    } else {
        paginas = livro.paginas.stringValue;
    }

    if (form.ano().value != livro.ano.stringValue) {
        ano = form.ano().value;
    } else {
        ano = livro.ano.stringValue;
    }

    if (form.licenca().value != livro.licenca.stringValue) {
        licenca = form.licenca().value;
    } else {
        licenca = livro.licenca.stringValue;
    }

    if (form.tipo().value != livro.tipo.stringValue) {
        tipo = form.tipo().value;
    } else {
        tipo = livro.tipo.stringValue;
    }

    if (form.exemplares().value != livro.exemplares.integerValue) {
        exemplares = form.exemplares().value;
    } else {
        exemplares = livro.exemplares.integerValue;
    }

    if (form.imagem().value != "") {
        imagem = form.imagem().value;
    } else {
        imagem = livro.imagem.stringValue;
    }

    if (form.descricao().value != livro.descricao.stringValue) {
        descricao = form.descricao().value;
    } else {
        descricao = livro.descricao.stringValue;
    }

    if (form.instituto().value != livro.instituto.stringValue) {
        instituto = form.instituto().value;
    } else {
        instituto = livro.instituto.stringValue;
    }

    if (form.licenca().value != livro.licenca.stringValue) {
        licenca = form.licenca().value;
    } else {
        licenca = livro.licenca.stringValue;
    }

    if (form.tipo().value != livro.tipo.stringValue) {
        tipo = form.tipo().value;
    } else {
        tipo = livro.tipo.stringValue;
    }

    if (form.instituto().value != livro.instituto.stringValue) {
        instituto = form.instituto().value;
    } else {
        instituto = livro.instituto.stringValue;
    }

    exemplares = ((exemplares + 1) - 1);
    exemplares = (exemplares / 10);

    const dados = {
        titulo: titulo,
        autor: autor,
        paginas: paginas,
        ano: ano,
        genero: gen,
        licenca: licenca,
        tipo: tipo,
        exemplares: exemplares,
        imagem: imagem,
        descricao: descricao,
        instituto: instituto,
    };

    if (file) {
        const upload = firebase.storage().ref("books-images/" + file.name).put(file);
        upload.on("state_changed", function (snapshot) {
            upload.snapshot.ref.getDownloadURL().then(function (url_imagem) {
                dados.imagem = url_imagem;
                firebase.firestore()
                    .collection('livros')
                    .where("titulo", "==", dados.titulo)
                    .get().then(snapshot => {
                        firebase.firestore().collection('livros').doc(snapshot.docs[0].id).update(dados);
                        setTimeout(() => {
                            setTimeout(() => {
                                location.reload();
                                alert("Atualizado com sucesso!");
                            }, 1000);
                        }, 500);
                    })
            })
        })
    } else {
        firebase.firestore()
            .collection('livros')
            .where("titulo", "==", dados.titulo)
            .get().then(snapshot => {
                firebase.firestore().collection('livros').doc(snapshot.docs[0].id).update(dados);
                setTimeout(() => {
                    location.reload();
                    alert("Atualizado com sucesso!");
                }, 1000);
            })
    }

}

function editarcancelar() {
    var modaleditar = document.getElementById('modal-editar');
    modaleditar.style.display = 'none';
    var carddiv = document.querySelectorAll('.carddiv');

    var gr = document.querySelectorAll('.gener');
    gr.forEach(e => {
        e.remove();
    });

    for (let i = 0; i < carddiv.length; i++) {
        const e = carddiv[i];
        e.style.display = 'block';
    }
}


/* == Modal Gerenciar Comentarios == */
function comentPost() {
    firebase.firestore().collection('assessments').get().then(snapshot => {
        const transactions = snapshot.docs.map(doc => doc.data());

        if (cont == 0) {
            cont = (cont + 1);
            for (i = 0; i < transactions.length; i++) {
                let transaction = transactions[i];
                var novo_id = snapshot.docs[i].id;

                firebase.firestore().collection('users').where('email', '==', transaction.userEmail).get().then(snapshot => {
                    const usercoment = snapshot.docs.map(doc => doc.data());
                    img.src = usercoment[0].userPhoto;
                })

                const comentarios = document.getElementById('comentarios');

                const area = document.createElement('div');
                area.classList.add('comentarios');
                area.classList.add('mt-4');
                area.id = novo_id;

                const img = document.createElement('img');

                const div = document.createElement('div');
                div.classList.add("divpost");

                const nome = document.createElement("h3");
                nome.innerText = transaction.username;

                const excluir = document.createElement("h4");
                excluir.innerText = "Excluir";
                excluir.id = novo_id;
                excluir.style.cursor = 'pointer';

                const coment = document.createElement("p");
                coment.innerText = transaction.comment;

                const din = document.createElement("div");
                din.style.display = "flex";
                din.style.alignItems = "center";

                const ul = document.createElement("ul");
                ul.classList.add("avaliacao");
                ul.classList.add("starsComent");

                const str1 = document.createElement("li");
                str1.classList.add("nota");
                str1.style.fontSize = '18px';

                const str2 = document.createElement("li");
                str2.classList.add("nota");
                str2.style.fontSize = '18px';

                const str3 = document.createElement("li");
                str3.classList.add("nota");
                str3.style.fontSize = '18px';

                const str4 = document.createElement("li");
                str4.classList.add("nota");
                str4.style.fontSize = '18px';

                const str5 = document.createElement("li");
                str5.classList.add("nota");
                str5.style.fontSize = '18px';

                if (transaction.stars == 1) {
                    str1.classList.add("ativo");
                } else if (transaction.stars == 2) {
                    str2.classList.add("ativo");
                } else if (transaction.stars == 3) {
                    str3.classList.add("ativo");
                } else if (transaction.stars == 4) {
                    str4.classList.add("ativo");
                } else if (transaction.stars == 5) {
                    str5.classList.add("ativo");
                }

                const img2 = document.createElement('img');
                img2.classList.add('capacoment');

                firebase.firestore().collection('livros').where('id', '==', transaction.bookID).get().then(snapshot => {
                    const bkimg = snapshot.docs.map(doc => doc.data());
                    img2.src = bkimg[0].imagem;
                })

                comentarios.appendChild(area);
                area.appendChild(img2);
                area.appendChild(img);
                area.appendChild(div);
                din.appendChild(nome);
                div.appendChild(din);

                din.appendChild(excluir);
                excluir.addEventListener('click', function (e) {
                    const confirmar = confirm('Deseja remover o comentário?');
                    if (confirmar) {
                        firebase.firestore()
                            .collection("assessments")
                            .doc(this.id)
                            .delete()
                            .then(() => {
                                location.reload();
                            })
                            .catch(error => {
                                console.log(error);
                                alert('Erro ao remover transaçao');
                            })
                    }
                })

                div.appendChild(ul);
                ul.appendChild(str1);
                ul.appendChild(str2);
                ul.appendChild(str3);
                ul.appendChild(str4);
                ul.appendChild(str5);
                div.appendChild(coment);
            }
        }
    }
    )
}


/* == Pedidos de Alugueis == */

var cont = 0;
var contt = 0;

function ModalPedidos() {
    firebase.firestore().collection('reserved').get().then(snapshot => {
        const transactions = snapshot.docs.map(doc => doc.data());

        if (countt == 0) {
            countt = (countt + 1);
            for (i = 0; i < transactions.length; i++) {
                let transaction = transactions[i];
                let id_pedido = snapshot.docs[i].id;
                const alugueis = document.getElementById('alugueis');

                if (transaction.situacao == "Pendente") {
                    firebase.firestore()
                        .collection('livros')
                        .where("id", "==", transaction.book_id)
                        .get()
                        .then(snapshot => {
                            const book = snapshot.docs.map(doc => doc.data());

                            var div = document.createElement('div');
                            div.classList.add("card");
                            div.classList.add("text-center");
                            div.id = "text-center";

                            var div1 = document.createElement('div');
                            div1.classList.add("card-header");

                            var ul = document.createElement("ul");
                            ul.classList.add("nav");
                            ul.classList.add("nav-pills");
                            ul.classList.add("card-header-pills");

                            var li = document.createElement("li");
                            li.classList.add("nav-item");
                            var a = document.createElement("a");
                            a.classList.add("nav-link");
                            a.classList.add("active");
                            a.id = "link-pedido";
                            a.innerHTML = "Pedido";
                            a.onclick = function x() {

                                a1.classList.remove("active");
                                a1.style.color = "#000";
                                a.classList.add("active");
                                a.style.color = "#fff";
                                divbody.style.display = "flex";
                                divlivro.style.display = "none";
                            };

                            var li1 = document.createElement("li");
                            li1.classList.add("nav-item");
                            var a1 = document.createElement("a");
                            a1.classList.add("nav-link");
                            a1.id = "link-livro";
                            a1.innerHTML = "Livro";
                            a1.onclick = function y() {

                                a.classList.remove("active");
                                a.style.color = "#000";
                                divbody.style.display = "none";
                                a1.classList.add("active");
                                a1.style.color = "#fff";
                                divlivro.style.display = "flex";
                            };

                            var span = document.createElement("span");
                            span.innerText = "Pedido: " + id_pedido;
                            span.id = "Npedido";

                            var divbody = document.createElement("div");
                            divbody.classList.add("card-body");
                            divbody.id = "cardbody_pedido";
                            var form = document.createElement("form");
                            form.classList.add("row");
                            form.classList.add("g-3");

                            //Informações do usuario - Nome

                            var div2 = document.createElement("div");
                            div2.classList.add("col-md-6");
                            var labelnome = document.createElement("label");
                            labelnome.for = "inputNome";
                            labelnome.classList.add("form-label");
                            labelnome.innerText = "Nome";
                            var inputnome = document.createElement("input");
                            inputnome.type = "text";
                            inputnome.classList.add("form-control");
                            inputnome.id = "inputNome";
                            inputnome.value = transaction.nome;
                            inputnome.setAttribute("disabled", "disabled");
                            inputnome.setAttribute("readonly", "readonly");

                            div2.appendChild(labelnome);
                            div2.appendChild(inputnome);
                            form.appendChild(div2);

                            //Informações do usuario - RM

                            var div3 = document.createElement("div");
                            div3.classList.add("col-md-6");
                            var labelrm = document.createElement("label");
                            labelrm.for = "inputRM";
                            labelrm.classList.add("form-label");
                            labelrm.innerText = "RM";
                            var inputrm = document.createElement("input");
                            inputrm.type = "text";
                            inputrm.classList.add("form-control");
                            inputrm.id = "inputRM";
                            inputrm.value = transaction.rm;
                            inputrm.setAttribute("disabled", "disabled");
                            inputrm.setAttribute("readonly", "readonly");

                            div3.appendChild(labelrm);
                            div3.appendChild(inputrm);
                            form.appendChild(div3);

                            //Informações do usuario - Modulo

                            var div4 = document.createElement("div");
                            div4.classList.add("col-md-6");
                            var labelModulo = document.createElement("label");
                            labelModulo.for = "inputModulo";
                            labelModulo.classList.add("form-label");
                            labelModulo.innerText = "Módulo/série";
                            var inputModulo = document.createElement("input");
                            inputModulo.type = "text";
                            inputModulo.classList.add("form-control");
                            inputModulo.id = "inputModulo";
                            inputModulo.value = transaction.modulo;
                            inputModulo.setAttribute("disabled", "disabled");
                            inputModulo.setAttribute("readonly", "readonly");

                            div4.appendChild(labelModulo);
                            div4.appendChild(inputModulo);
                            form.appendChild(div4);

                            //Informações do usuario - Turma

                            var div5 = document.createElement("div");
                            div5.classList.add("col-md-6");
                            var labelTurma = document.createElement("label");
                            labelTurma.for = "inputTurma";
                            labelTurma.classList.add("form-label");
                            labelTurma.innerText = "Turma";
                            var inputTurma = document.createElement("input");
                            inputTurma.type = "text";
                            inputTurma.classList.add("form-control");
                            inputTurma.id = "inputTurma";
                            inputTurma.value = transaction.turma;
                            inputTurma.setAttribute("disabled", "disabled");
                            inputTurma.setAttribute("readonly", "readonly");

                            div5.appendChild(labelTurma);
                            div5.appendChild(inputTurma);
                            form.appendChild(div5);

                            //Informações do usuario - instituto

                            var div6 = document.createElement("div");
                            div6.classList.add("col-md-8");
                            var labelinstituto = document.createElement("label");
                            labelinstituto.for = "inputretirada";
                            labelinstituto.classList.add("form-label");
                            labelinstituto.innerText = "Instituição";
                            var inputinstituto = document.createElement("input");
                            inputinstituto.type = "text";
                            inputinstituto.classList.add("form-control");
                            inputinstituto.id = "instituto";
                            inputinstituto.value = transaction.instituicao;
                            inputinstituto.setAttribute("disabled", "disabled");
                            inputinstituto.setAttribute("readonly", "readonly");

                            div6.appendChild(labelinstituto);
                            div6.appendChild(inputinstituto);
                            form.appendChild(div6);

                            //Informações do usuario - Exemplares Disponiveis

                            var div7 = document.createElement("div");
                            div7.classList.add("col-md-4");
                            var labelexemplares = document.createElement("label");
                            labelexemplares.for = "inputexemplares";
                            labelexemplares.classList.add("form-label");
                            labelexemplares.innerText = "Disponiveis";
                            var inputexemplares = document.createElement("input");
                            inputexemplares.type = "text";
                            inputexemplares.classList.add("form-control");
                            inputexemplares.id = "inputexemplares";
                            inputexemplares.value = book[0].exemplares;
                            inputexemplares.setAttribute("disabled", "disabled");
                            inputexemplares.setAttribute("readonly", "readonly");

                            div7.appendChild(labelexemplares);
                            div7.appendChild(inputexemplares);
                            form.appendChild(div7);

                            var div16 = document.createElement("div");
                            div16.appendChild(li);
                            div16.appendChild(li1);
                            div16.style.display = "flex";

                            divbody.appendChild(form);
                            li1.appendChild(a1);
                            li.appendChild(a);
                            ul.appendChild(div16);
                            ul.appendChild(span);
                            div1.appendChild(ul);

                            //Botões

                            var div8 = document.createElement("div");
                            div8.id = "cardbody_pedido_algn";

                            var div9 = document.createElement("div");
                            div9.classList.add("btn");
                            div9.classList.add("btn-secondary");
                            div9.id = "btnrejeitar";
                            div9.innerText = "Rejeitar";
                            div9.onclick = function z() {
                                firebase.firestore().collection('reserved').doc(id_pedido).delete()
                                    .then(() => {
                                        setTimeout(() => {
                                            alert("Pedido Negado");
                                            location.reload();
                                        }, 1000);
                                    })
                            };

                            var div10 = document.createElement("div");
                            div10.classList.add("btn");
                            div10.classList.add("btn-warning");
                            div10.id = "btnconfirmar";
                            div10.innerText = "Confirmar";
                            div10.onclick = function w() {
                                const confirmar = {
                                    situacao: "Confirmado"
                                };

                                const dado = {
                                    exemplares: (book[0].exemplares - 1)
                                }

                                //
                                firebase.auth().onAuthStateChanged((user) => {
                                    if (user) {
                                        firebase.firestore().collection('users').where('email', '==', user.email).get().then(snapshot => {
                                            const usuario = snapshot.docs.map(doc => doc.data());

                                            var a = usuario[0].alugados.length;
                                            if (a <= 0 || a == null || a == undefined) {
                                                a = 1;
                                            } else {
                                                a = usuario[0].alugados.length;
                                            }

                                            let array = usuario[0].alugados;
                                            array.push(book[0].id);

                                            const data = {
                                                alugados: array
                                            };

                                            var en = false;
                                            for (let i = 0; i < a; i++) {
                                                const element = usuario[0].alugados[i];

                                                if (element == book[0].id) {
                                                    en = true;
                                                    break;
                                                }
                                            }

                                            if (!en) {
                                                firebase.firestore().collection('users').doc(snapshot.docs[0].id).update(data);
                                            }

                                            if (en) {
                                                firebase.firestore()
                                                    .collection('livros')
                                                    .where('id', '==', book[0].id)
                                                    .get()
                                                    .then(snapshot => {
                                                        const transactions = snapshot.docs.map(doc => doc.data());
                                                        var book = usuario[0].alugados;

                                                        for (let i = 0; i < a; i++) {
                                                            const element = usuario[0].alugados[i];

                                                            if (transactions[0].id == element) {

                                                                var encontrado = false;
                                                                for (var e = 0; e < book.length; e++) {
                                                                    if (book[e] == element) {
                                                                        book[e] = '';
                                                                        encontrado = true;
                                                                    }
                                                                }

                                                                if (encontrado) {
                                                                    const remo = {
                                                                        alugados: book
                                                                    }

                                                                    Remove(remo);
                                                                }
                                                            }
                                                        }
                                                    })
                                            }
                                        })
                                    }
                                })
                                //

                                firebase.firestore().collection('livros').doc(snapshot.docs[0].id).update(dado);
                                firebase.firestore().collection('reserved').doc(id_pedido).update(confirmar);
                                setTimeout(() => {
                                    alert("Pedido Confirmado com Sucesso");
                                    location.reload();
                                }, 1000);
                            };

                            div8.appendChild(div9);
                            div8.appendChild(div10);
                            divbody.appendChild(div8);

                            //Livro

                            var divlivro = document.createElement("div");
                            divlivro.classList.add("card-body");
                            divlivro.id = "cardbody_livro";
                            divlivro.style = "display: none;";

                            var div11 = document.createElement("div");
                            div11.classList.add("card");
                            div11.classList.add("carddiv_alugueis");
                            div11.id = "carddiv_alugueis";

                            var div12 = document.createElement("div");
                            div12.classList.add("row");
                            div12.classList.add("g-0");

                            var div13 = document.createElement("div");
                            div13.classList.add("col-md-5");

                            var img = document.createElement("img");
                            img.classList.add("previa");
                            img.src = book[0].imagem;

                            var div14 = document.createElement("div");
                            div14.classList.add("col-md-7");
                            div14.classList.add("text_alugueis");

                            var h5 = document.createElement("h5");
                            h5.classList.add("card-title");
                            h5.classList.add("mt-3");
                            h5.innerText = book[0].titulo;

                            var div15 = document.createElement("div");
                            div15.classList.add("card-body");
                            div15.id = "card-body";

                            var p = document.createElement("p");
                            p.classList.add("card-text");
                            p.innerText = "Autor: " + book[0].autor;

                            var p1 = document.createElement("p");
                            p1.classList.add("card-text");
                            p1.innerText = "Ano: " + book[0].ano;

                            var p2 = document.createElement("p");
                            p2.classList.add("card-text");
                            p2.innerText = "Páginas: " + book[0].paginas;

                            var p3 = document.createElement("p");
                            p3.classList.add("card-text");
                            p3.innerText = "Tipo: " + book[0].tipo;

                            var p4 = document.createElement("p");
                            p4.classList.add("card-text");
                            p4.innerText = "Licença: " + book[0].licenca;

                            var p5 = document.createElement("p");
                            p5.classList.add("card-text");
                            p5.innerText = "Instituição: " + book[0].instituto;

                            div14.appendChild(h5);
                            div14.appendChild(div15);

                            div15.appendChild(p);
                            div15.appendChild(p1);
                            div15.appendChild(p2);
                            div15.appendChild(p3);
                            div15.appendChild(p4);
                            div15.appendChild(p5);

                            div13.appendChild(img);
                            div12.appendChild(div13);
                            div12.appendChild(div14);
                            div11.appendChild(div12);
                            divlivro.appendChild(div11);

                            alugueis.appendChild(div);
                            div.appendChild(div1);
                            div.appendChild(divbody);
                            div.appendChild(divlivro);
                        })
                }
            }
        }
    })
}

function ModalAlugueis() {
    firebase.firestore().collection('reserved').get().then(snapshot => {
        const transactions = snapshot.docs.map(doc => doc.data());

        if (contt == 0) {
            contt = (contt + 1);
            for (i = 0; i < transactions.length; i++) {
                let transaction = transactions[i];
                let id_pedido = snapshot.docs[i].id;
                const livros_alugados = document.getElementById('livros_alugados');

                if (transaction.situacao == "Confirmado") {
                    firebase.firestore()
                        .collection('livros')
                        .where("id", "==", transaction.book_id)
                        .get()
                        .then(snapshot => {
                            const book = snapshot.docs.map(doc => doc.data());

                            var divx = document.createElement('div');
                            divx.classList.add("card");
                            divx.classList.add("text-center");
                            divx.id = "text-center";

                            var divx1 = document.createElement('div');
                            divx1.classList.add("card-header");

                            var ulx = document.createElement("ul");
                            ulx.classList.add("nav");
                            ulx.classList.add("nav-pills");
                            ulx.classList.add("card-header-pills");

                            var lix = document.createElement("li");
                            lix.classList.add("nav-item");
                            var ax = document.createElement("a");
                            ax.classList.add("nav-link");
                            ax.classList.add("active");
                            ax.style.width = "100%";
                            ax.id = "confirm_devolucao";
                            ax.innerHTML = "Confirmar Devolução";
                            ax.onclick = function x() {
                                const dado = {
                                    exemplares: (book[0].exemplares + 1)
                                }

                                cleanalgados();
                                firebase.firestore().collection('livros').doc(snapshot.docs[0].id).update(dado);
                                firebase.firestore().collection('reserved').doc(id_pedido).delete()
                                    .then(() => {
                                        setTimeout(() => {
                                            alert("Devolução Confirmada com Sucesso");
                                            location.reload();
                                        }, 1000);
                                    })
                            };

                            var spanx = document.createElement("span");
                            spanx.innerText = "Pedido: " + id_pedido;
                            spanx.id = "Npedido";

                            var divxbody = document.createElement("div");
                            divxbody.classList.add("card-body");
                            divxbody.id = "cardbody_pedido";
                            var formx = document.createElement("form");
                            formx.classList.add("row");
                            formx.classList.add("g-3");

                            //Informações do usuario - Nome

                            var divx2 = document.createElement("div");
                            divx2.classList.add("col-md-6");
                            var labelnomex = document.createElement("label");
                            labelnomex.for = "inputNome";
                            labelnomex.classList.add("form-label");
                            labelnomex.innerText = "Nome";
                            var inputnomex = document.createElement("input");
                            inputnomex.type = "text";
                            inputnomex.classList.add("form-control");
                            inputnomex.id = "inputNome";
                            inputnomex.value = transaction.nome;
                            inputnomex.setAttribute("disabled", "disabled");
                            inputnomex.setAttribute("readonly", "readonly");

                            divx2.appendChild(labelnomex);
                            divx2.appendChild(inputnomex);
                            formx.appendChild(divx2);

                            //Informações do usuario - RM

                            var divx3 = document.createElement("div");
                            divx3.classList.add("col-md-6");
                            var labelrmx = document.createElement("label");
                            labelrmx.for = "inputRM";
                            labelrmx.classList.add("form-label");
                            labelrmx.innerText = "RM";
                            var inputrmx = document.createElement("input");
                            inputrmx.type = "text";
                            inputrmx.classList.add("form-control");
                            inputrmx.id = "inputRM";
                            inputrmx.value = transaction.rm;
                            inputrmx.setAttribute("disabled", "disabled");
                            inputrmx.setAttribute("readonly", "readonly");

                            divx3.appendChild(labelrmx);
                            divx3.appendChild(inputrmx);
                            formx.appendChild(divx3);

                            //Informações do usuario - Modulo

                            var divx4 = document.createElement("div");
                            divx4.classList.add("col-md-6");
                            var labelModulox = document.createElement("label");
                            labelModulox.for = "inputModulo";
                            labelModulox.classList.add("form-label");
                            labelModulox.innerText = "Módulo/série";
                            var inputModulox = document.createElement("input");
                            inputModulox.type = "text";
                            inputModulox.classList.add("form-control");
                            inputModulox.id = "inputModulo";
                            inputModulox.value = transaction.modulo;
                            inputModulox.setAttribute("disabled", "disabled");
                            inputModulox.setAttribute("readonly", "readonly");

                            divx4.appendChild(labelModulox);
                            divx4.appendChild(inputModulox);
                            formx.appendChild(divx4);

                            //Informações do usuario - Turma

                            var divx5 = document.createElement("div");
                            divx5.classList.add("col-md-6");
                            var labelTurmax = document.createElement("label");
                            labelTurmax.for = "inputTurma";
                            labelTurmax.classList.add("form-label");
                            labelTurmax.innerText = "Turma";
                            var inputTurmax = document.createElement("input");
                            inputTurmax.type = "text";
                            inputTurmax.classList.add("form-control");
                            inputTurmax.id = "inputTurma";
                            inputTurmax.value = transaction.turma;
                            inputTurmax.setAttribute("disabled", "disabled");
                            inputTurmax.setAttribute("readonly", "readonly");

                            divx5.appendChild(labelTurmax);
                            divx5.appendChild(inputTurmax);
                            formx.appendChild(divx5);

                            //Informações do usuario - instituto

                            var divx6 = document.createElement("div");
                            divx6.classList.add("col-md-12");
                            var labelinstitutox = document.createElement("label");
                            labelinstitutox.for = "inputretirada";
                            labelinstitutox.classList.add("form-label");
                            labelinstitutox.innerText = "Instituição";
                            var inputinstitutox = document.createElement("input");
                            inputinstitutox.type = "text";
                            inputinstitutox.classList.add("form-control");
                            inputinstitutox.id = "instituto";
                            inputinstitutox.value = transaction.instituicao;
                            inputinstitutox.setAttribute("disabled", "disabled");
                            inputinstitutox.setAttribute("readonly", "readonly");

                            divx6.appendChild(labelinstitutox);
                            divx6.appendChild(inputinstitutox);
                            formx.appendChild(divx6);

                            //Informações do usuario - Livro

                            var divx16 = document.createElement("div");
                            divx16.classList.add("col-md-8");
                            var labellivro = document.createElement("label");
                            labellivro.for = "inputlivro";
                            labellivro.classList.add("form-label");
                            labellivro.innerText = "Livro";
                            var inputlivro = document.createElement("input");
                            inputlivro.type = "text";
                            inputlivro.classList.add("form-control");
                            inputlivro.id = "livro";
                            inputlivro.value = book[0].titulo;
                            inputlivro.setAttribute("disabled", "disabled");
                            inputlivro.setAttribute("readonly", "readonly");

                            divx16.appendChild(labellivro);
                            divx16.appendChild(inputlivro);
                            formx.appendChild(divx16);

                            //Informações do usuario - Exemplares Disponiveis

                            var divx7 = document.createElement("div");
                            divx7.classList.add("col-md-4");
                            var labelexemplaresx = document.createElement("label");
                            labelexemplaresx.for = "inputexemplares";
                            labelexemplaresx.classList.add("form-label");
                            labelexemplaresx.innerText = "Disponiveis";
                            var inputexemplaresx = document.createElement("input");
                            inputexemplaresx.type = "text";
                            inputexemplaresx.classList.add("form-control");
                            inputexemplaresx.id = "inputexemplares";
                            inputexemplaresx.value = book[0].exemplares;
                            inputexemplaresx.setAttribute("disabled", "disabled");
                            inputexemplaresx.setAttribute("readonly", "readonly");


                            divx7.appendChild(labelexemplaresx);
                            divx7.appendChild(inputexemplaresx);
                            formx.appendChild(divx7);

                            divxbody.appendChild(formx);
                            ulx.appendChild(lix);
                            lix.appendChild(ax);
                            ulx.appendChild(spanx);
                            divx1.appendChild(ulx);

                            livros_alugados.appendChild(divx);
                            divx.appendChild(divx1);
                            divx.appendChild(divxbody);
                        })
                }
            }
        }
    })
}

function Remove(remo) {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            firebase.firestore().collection('users').where('email', '==', user.email).get().then(snapshot => {
                firebase.firestore().collection('users').doc(snapshot.docs[0].id).update(remo);
            })
        }

        var arraynotnull = remo.alugados.filter(function (i) {
            return i;
        });

        const rem = {
            alugados: arraynotnull
        };

        firebase.firestore().collection('users').where('email', '==', user.email).get().then(snapshot => {
            firebase.firestore().collection('users').doc(snapshot.docs[0].id).update(rem);
        })
    })
}

function cleanalgados() {

    const confirmar = confirm('Deseja confirmar a devolução?');
    if (confirmar) {
        const limpar = {
            alugados: ['lista']
        }

        firebase.auth().onAuthStateChanged((user) => {
            firebase.firestore().collection('users').where('email', '==', user.email).get().then(snapshot => {
                const usuario = snapshot.docs.map(doc => doc.data());

                firebase.firestore().collection('users').where('email', '==', user.email).get().then(snapshot => {
                    firebase.firestore().collection('users').doc(snapshot.docs[0].id).update(limpar);
                    setTimeout(() => {
                        location.reload()
                    }, 1000);
                })
            })
        })
    }
}