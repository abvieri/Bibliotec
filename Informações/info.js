var livroID = window.location.search;
livroID = livroID.replace("?bookID=", "")
var stars = document.querySelectorAll(".star-icon");
var finalstars;
var usuario;
var media;
var novo_id;

function initial() {
  findInformation();
  Generos();
  contagem();
  savestatus();
  findTransactionsSimilares();

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      usuario = (user.uid);
      document.getElementById('btnPerfil').innerText = "Perfil";
      console.log('Usuário online')
      var btnreservar = document.getElementById("btn-reservar");
      btnreservar.attributes[2].nodeValue = "modal";
    } else {
      console.log('Usuário offline')
      var btnreservar = document.getElementById("btn-reservar");
      btnreservar.attributes[2].nodeValue = "mod";
    }
    comentPost();
  });
}

/* Buscar e inserir as informações do livro*/

function findInformation() {
  firebase.firestore()
    .collection('livros')
    .where('id', '==', livroID)
    .get()
    .then(snapshot => {
      const Information = snapshot.docs.map(doc => doc.data());
      addbookInformation(Information);
    })
}

function addbookInformation(transactions) {
  for (i = 0; i < transactions.length; i++) {
    let transaction = transactions[i];
    document.getElementById("ano").innerText += transaction.ano;
    document.getElementById("pag").innerText += transaction.paginas;
    document.getElementById("tipo").innerText += transaction.tipo;
    document.getElementById("licenca").innerText += transaction.licenca;
    document.getElementById("descricao").innerText += transaction.descricao;

    if (transaction.licenca == "Domínio Público") {
      const containerr = document.querySelectorAll(".containerr");
      containerr[0].classList.add('fell');
    }

    var disable = document.getElementById("containerr-reservar");
    var btn_reservar = document.getElementById("btn-reservar");
    var inputExemplares = document.getElementById("inputExemplares");
    inputExemplares.value = transaction.exemplares;

    if (disable.classList.length == 2) {
      btn_reservar.attributes[3].nodeValue = "#Modal";
    } else {
      btn_reservar.attributes[3].nodeValue = "#Modal_reservar";
    }

    if (transaction.licenca == "Privado") {
      const containerr = document.querySelectorAll(".containerr");
      containerr[1].classList.add('fell');
    }

  }
}


/* Buscar e inserir os Gêneros*/

function Generos() {
  firebase.firestore()
    .collection('livros')
    .where('id', '==', livroID)
    .get()
    .then(snapshot => {
      const transactions = snapshot.docs.map(doc => doc.data());
      for (i = 0; i < transactions.length; i++) {
        var transaction = transactions[i];
        var i = 0;
        var e = 100;

        while (i < e) {
          if (transaction.genero[i] == undefined) {
            break;
          } else {
            const generos = document.getElementById("generos");
            const div = document.createElement('div');
            div.classList.add("genero");
            div.innerText = transaction.genero[i];
            generos.appendChild(div);
          }
          i++;
        }
        var url = (transaction.imagem);
        var autor = ("por " + transaction.autor);
        document.getElementById("title_book").innerText = transaction.titulo;
        document.getElementById("sub_titulo").innerText = autor;
        document.getElementById("livro").style.backgroundImage = `url(${url})`;
        document.getElementById("livrored").style.backgroundImage = `url(${url})`;
      }
    })
}

/* Adicionar Avaliação*/

document.getElementById("btnRegsitrar").addEventListener('click', function () {

  var elemento = document.getElementById("crivo");
  elemento.style.display = 'flex';

  function opacity() {
    elemento.style.opacity = '100%';
  }

  if (elemento.style.display = 'flex') {
    setTimeout(opacity, 100);
  }

  var btn = document.getElementById("btnRegsitrar");
  btn.style.display = 'none';
})

document.addEventListener('click', function (e) {
  var classStar = e.target.classList;
  if (!classStar.contains('ativo')) {
    stars.forEach(function (star) {
      star.classList.remove('ativo');
    });
    classStar.add('ativo');
    finalstars = (e.target.getAttribute('data-avaliacao'));
  }
});

function contagem() {
  firebase.firestore().collection('assessments').where('bookID', '==', livroID).get().then(snapshot => {
    const transactions = snapshot.docs.map(doc => doc.data());

    const total = document.getElementById('total');
    var p = document.createElement('p');
    p.innerText = (transactions.length == 1 ? transactions.length + " avaliação" : transactions.length + " avaliações");
    total.appendChild(p);

    var str1 = 0; var str2 = 0; var str3 = 0; var str4 = 0; var str5 = 0;
    var av1 = 0; var av2 = 0; var av3 = 0; var av4 = 0; var av5 = 0; var avf = 0;

    const barra01 = document.getElementById('barra01');
    const barra02 = document.getElementById('barra02');
    const barra03 = document.getElementById('barra03');
    const barra04 = document.getElementById('barra04');
    const barra05 = document.getElementById('barra05');

    for (i = 0; i < transactions.length; i++) {

      if (transactions[i].stars == 5) {
        str1 = str1 + 1;
        av1 = av1 + 5;
      } else if (transactions[i].stars == 4) {
        str2 = str2 + 1;
        av2 = av2 + 4;
      } else if (transactions[i].stars == 3) {
        str3 = str3 + 1;
        av3 = av3 + 3;
      } else if (transactions[i].stars == 2) {
        str4 = str4 + 1;
        av4 = av4 + 2;
      } else if (transactions[i].stars == 1) {
        str5 = str5 + 1;
        av5 = av5 + 1;
      }

      barra01.innerText = str1;
      barra02.innerText = str2;
      barra03.innerText = str3;
      barra04.innerText = str4;
      barra05.innerText = str5;
      avf = (av1 + av2 + av3 + av4 + av5);

    }

    var percent = transactions.length;
    var progress01 = (str1 * 100) / percent;
    var progress02 = (str2 * 100) / percent;
    var progress03 = (str3 * 100) / percent;
    var progress04 = (str4 * 100) / percent;
    var progress05 = (str5 * 100) / percent;

    if (percent == 0) {
      var progress01 = percent;
      var progress02 = percent;
      var progress03 = percent;
      var progress04 = percent;
      var progress05 = percent;
    }

    var root = document.documentElement;
    root.style.setProperty('--progress01', progress01);
    root.style.setProperty('--progress02', progress02);
    root.style.setProperty('--progress03', progress03);
    root.style.setProperty('--progress04', progress04);
    root.style.setProperty('--progress05', progress05);

    const resultado = Math.trunc((avf * 50) / (percent * 5))
    var string = resultado.toString();
    media = string.split("");
    media = (media[0]);
    var md = document.getElementById('media');

    if (string == "NaN") { md.innerText = 0; } else { md.innerText = media; }

    var med = document.getElementById('md');

    const md1 = document.createElement('li');
    md1.classList.add('nota');
    const md2 = document.createElement('li');
    md2.classList.add('nota');
    const md3 = document.createElement('li');
    md3.classList.add('nota');
    const md4 = document.createElement('li');
    md4.classList.add('nota');
    const md5 = document.createElement('li');
    md5.classList.add('nota');

    if (media[0] <= 1) {
      md1.classList.add('ativo');
    } else if (media[0] <= 2) {
      md2.classList.add('ativo');
    } else if (media[0] <= 3) {
      md3.classList.add('ativo');
    } else if (media[0] <= 4) {
      md4.classList.add('ativo');
    } else if (media[0] <= 5) {
      md5.classList.add('ativo');
    }

    med.appendChild(md1);
    med.appendChild(md2);
    med.appendChild(md3);
    med.appendChild(md4);
    med.appendChild(md5);

    adicionarNota();
    SalvarNota();
  })
}


/*Publicar Avaliações*/

function SaveAssessments() {
  var cmt = document.getElementById('comment').value;
  var str = finalstars;

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      firebase.firestore().collection('users').where("email", '==', user.email).get().then(e => {
        const users = e.docs.map(doc => doc.data());
        var userlog = users[0];
        var username = userlog.username;
        var email = userlog.email;

        if ((cmt != '') && (str != null)) {

          const transaction = {
            'comment': cmt,
            'stars': str,
            'username': username,
            'userEmail': email,
            'bookID': livroID,
          };

          if (user) {
            firebase.firestore()
              .collection('assessments')
              .add(transaction)
              .then(() => {
                alert("Obrigado pela sua Avaliação!");
                location.reload();
              })
              .catch(() => {
                alert('Erro ao salvar transaçao');
              })

            var elemento = document.getElementById("crivo");
            elemento.style.display = 'none';
            var btn = document.getElementById("btnRegsitrar");
            btn.style.display = 'flex';
          }

        } else {
          if ((cmt == '') && (str == null)) {
            alert("Ei! ainda á campos vazios");
          } else if (str == null) {
            alert("Ops... Parece que você esqueceu de selecionar uma estrela");
          } else {
            alert("Parece que você esqueceu seu de escrever comentário");
          }
        }
      })
    } else {
      window.location.href = "../Login/Login.html";
      alert("Entre ou acesse sua conta antes de avaliar");
    }
  })
}

/*Recomendações*/

function findTransactionsSimilares() {

  firebase.firestore().collection('livros').where('id', '==', livroID).get().then(snapshot => {
    const transactions = snapshot.docs.map(doc => doc.data());

    for (i = 0; i < transactions.length; i++) {
      var transaction = transactions[i];
      var e = 1,
        i = 0;

      while (i < e) {
        if ((transaction.genero[i] == undefined)) {
          break;
        } else {
          firebase.firestore()
            .collection('livros')
            .where('genero', 'array-contains', transaction.genero[i])
            .get()
            .then(snapshot => {
              const transactions = snapshot.docs.map(doc => doc.data());
              addbookSimilares(transactions);
            })
          i++;
        }
      }
    }
  })
}

function addbookSimilares(transactions) {
  const semelhantes = document.getElementById("similares");
  var livroid;

  for (i = 0; i < transactions.length; i++) {
    let transaction = transactions[i];

    if ((i < 5) && (transaction.id != livroID)) { // (1 < qntd de números que devem aparecer)
      const div = document.createElement("div");
      div.classList.add("recom");
      div.classList.add("mt-4");

      const img = document.createElement("img");
      img.src = transaction.imagem;
      img.id = transaction.id;
      img.classList.add("book");
      div.appendChild(img);
      semelhantes.appendChild(div);
    }
  }

  const element = document.querySelectorAll(".book");
  var livroid;

  for (let i = 0; i < element.length; i++) {
    element[i].addEventListener("click", function (e) {
      livroid = (e.target.id);
      console.log(livroid);
      window.location.href = "../Informações/info.html" + "?bookID=" + livroid;
    })
  }
}

function comentPost() {
  firebase.firestore().collection('assessments').where('bookID', '==', livroID).get().then(snapshot => {
    const transactions = snapshot.docs.map(doc => doc.data());

    firebase.auth().onAuthStateChanged((user) => {

      if (user) { usuario = (user.uid); }

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
        area.classList.add('mt-5');
        area.classList.add('mb-3');
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

        comentarios.appendChild(area);
        area.appendChild(img);
        area.appendChild(div);
        din.appendChild(nome);
        div.appendChild(din);

        firebase.auth().onAuthStateChanged((user) => {
          firebase.firestore().collection('assessments').where('userEmail', '==', user.email).get().then(snapshot => {
            const usuario = snapshot.docs.map(doc => doc.data());

            if (transaction.userEmail == user.email && usuario.length > 0) {
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
            }
          })
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
    )
  })
}


/*Adicionar Nota*/

function adicionarNota() {
  firebase.firestore()
    .collection('livros')
    .doc(livroID)
    .get()
    .then(doc => {
      BuscarNota(doc.data());
    })
}

function BuscarNota() {
  var mid = media;
  if (mid == 'N,a') { mid = "0"; }
  return { nota: mid };
}

function SalvarNota() {
  firebase.firestore()
    .collection("livros")
    .doc(livroID)
    .update(BuscarNota())
    .then(() => { })
}


/*Botões*/

function aOnline() {
  const containerr = document.querySelectorAll(".containerr");
  var contei = containerr[1].classList;

  if (contei[1] == 'fell') {
    alert("Opção de leitura indisponível");
  } else {
    firebase.firestore()
      .collection('livros')
      .where('id', '==', livroID)
      .get()
      .then(snapshot => {
        const selected = snapshot.docs.map(doc => doc.data());
        for (i = 0; i < selected.length; i++) {
          var titulo = selected[i].titulo;
          var Encodetitulo = encodeURIComponent(titulo)
          window.location.href = "../Leitor/index.html" + "?selectedbook=" + Encodetitulo;
        }
      })
  }

}


function reservar() {
  if (usuario) {
    firebase.firestore().collection('livros').where('id', '==', livroID).get().then(snapshot => {
      const books = snapshot.docs.map(doc => doc.data());
      if (books[0].exemplares >= 1) {
      } else {
        setTimeout(() => {
          location.reload()
        }, 100);
        alert("Este livro não tem exemplar disponivel!");
      }
    })

    var disable = document.getElementById("containerr-reservar");
    if (disable.classList.length == 2) {
      alert("Indisponível no momento");
    }

    const form = {
      nome: () => document.getElementById('inputNome'),
      rm: () => document.getElementById('inputRM'),
      modulo: () => document.getElementById('inputModulo'),
      turma: () => document.getElementById('inputTurma'),
      instituicao: () => document.getElementById('instituto')
    }

    return {
      nome: form.nome().value,
      rm: form.rm().value,
      modulo: form.modulo().value,
      turma: form.turma().value,
      instituicao: form.instituicao().value,
      book_id: livroID,
      userId: usuario,
      situacao: "Pendente"
    };

  } else {
    alert("Faça login para realizar uma reserva.")
  }

}

function verificarcampos() {
  var dados = reservar();
  var nome = false;
  var rm = false;
  var modulo = false;
  var turma = false;
  var instituicao = false;

  if (dados.nome == '') {
    var alertnome = document.getElementById('alertnome');
    alertnome.style.display = "block";
  } else {
    var alertnome = document.getElementById('alertnome');
    alertnome.style.display = "none";
    nome = true;
  }

  if (dados.rm == '') {
    var alertrm = document.getElementById('alertrm');
    alertrm.style.display = "block";
  } else {
    var alertrm = document.getElementById('alertrm');
    alertrm.style.display = "none";
    rm = true;
  }

  if (dados.modulo == '') {
    var alertmodulo = document.getElementById('alertmodulo');
    alertmodulo.style.display = "block";
  } else {
    var alertmodulo = document.getElementById('alertmodulo');
    alertmodulo.style.display = "none";
    modulo = true;
  }

  if (dados.turma == '') {
    var alertturma = document.getElementById('alertturma');
    alertturma.style.display = "block";
  } else {
    var alertturma = document.getElementById('alertturma');
    alertturma.style.display = "none";
    turma = true;
  }

  if (dados.instituicao == 'Selecione') {
    var alertinstituicao = document.getElementById('alertinstituicao');
    alertinstituicao.style.display = "block";
  } else {
    var alertinstituicao = document.getElementById('alertinstituicao');
    alertinstituicao.style.display = "none";
    instituicao = true;
  }

  if (nome == true && rm == true && modulo == true && turma == true && instituicao == true) {
    return true;
  }
}

function addReservar() {
  var dados = reservar();
  var verificar = verificarcampos();

  if (verificar) {
    firebase.firestore()
      .collection('reserved')
      .add(dados)
      .then(() => {
        alert("Seu pedido foi encaminhado e em breve será analisado e confirmado por um administrador. Para acompanhar o status do seu pedido verifique os livros alugados, acessando a guia perfil.");
        location.reload();
      })
  }
}

function lnPerfil() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      window.location.href = "../Perfil/index.html";
    } else {
      window.location.href = "../login/login.html";
    }
  })
}

function aaSobre() {
  window.location.href = "../Sobre/sobre.html";
}

function abibliotec() {
  window.location.href = "../biblioteca/biblio.html";
}


/*Salvar*/
var btnsalvar = document.getElementById('salvar');
var img = document.createElement('img');
var p = document.createElement('p');

function savestatus() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      firebase.firestore().collection('users').where('email', '==', user.email).get().then(snapshot => {
        const usuario = snapshot.docs.map(doc => doc.data());

        for (let i = 0; i < (usuario[0].salvos.length); i++) {
          const element = usuario[0].salvos[i];

          if (element == livroID) {
            img.src = "../img/salvo.png";
            p.innerText = "Salvo";
            break
          } else {
            img.src = "../img/salvar.png";
            p.innerText = "Salvar";
          }

        }

      })
    } else {
      img.src = "../img/salvar.png";
      p.innerText = "Salvar";
    }
  })
}

btnsalvar.appendChild(img);
btnsalvar.appendChild(p);

function Salvar() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      firebase.firestore().collection('users').where('email', '==', user.email).get().then(snapshot => {
        const usuario = snapshot.docs.map(doc => doc.data());

        var a = usuario[0].salvos.length;
        if (a <= 0 || a == null || a == undefined) {
          a = 1;
        } else {
          a = usuario[0].salvos.length;
        }

        let array = usuario[0].salvos;
        array.push(livroID);

        const dados = {
          salvos: array
        };

        var en = false;
        for (let i = 0; i < a; i++) {
          const element = usuario[0].salvos[i];

          if (element == livroID) {
            en = true;
            break;
          }
        }

        if (!en) {
          img.src = "../img/salvo.png";
          p.innerText = "Salvo";
          firebase.firestore().collection('users').doc(snapshot.docs[0].id).update(dados);
          console.log("Salvo");
        }

        if (en) {
          firebase.firestore()
            .collection('livros')
            .where('id', '==', livroID)
            .get()
            .then(snapshot => {
              const transactions = snapshot.docs.map(doc => doc.data());
              var book = usuario[0].salvos;

              for (let i = 0; i < a; i++) {
                const element = usuario[0].salvos[i];

                if (transactions[0].id == element) {

                  var encontrado = false;
                  for (var e = 0; e < book.length; e++) {
                    if (book[e] == element) {
                      book[e] = '';
                      encontrado = true;
                    }
                  }

                  if (encontrado) {
                    const remover = {
                      salvos: book
                    }

                    img.src = "../img/salvar.png";
                    p.innerText = "Salvar";
                    Remove(remover);
                  }
                }
              }
            })
        }
      })
    } else {
      window.location.href = "../Login/Login.html";
      alert("Entre ou acesse sua conta antes de Salvar");
    }
  })
}

function Remove(remover) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      firebase.firestore().collection('users').where('email', '==', user.email).get().then(snapshot => {
        firebase.firestore().collection('users').doc(snapshot.docs[0].id).update(remover);
      })
    }

    var arraynotnull = remover.salvos.filter(function (i) {
      return i;
    });

    const rem = {
      salvos: arraynotnull
    };

    firebase.firestore().collection('users').where('email', '==', user.email).get().then(snapshot => {
      firebase.firestore().collection('users').doc(snapshot.docs[0].id).update(rem);
    })
  })
}