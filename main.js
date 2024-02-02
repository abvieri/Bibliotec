function Init() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      document.getElementById('btnPerfil').innerText = "Perfil";
      document.getElementById('btnLogin').innerText = "Sair";
      console.log('Usuário online')
    } else {
      console.log('Usuário offline')
    }
  })
  findTransactionsRomance();
  findTransactionsFantasia();
  findTransactionsFicCientífica();
  findTransactionsLitBrasileira();
  findTransactionsDidaticos();
  findTransactionsPopulares();
}

function dupli() {
  var elementosDuplicados = document.querySelectorAll('li');
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

function aLogin() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      logout();
    } else {
      window.location.href = "Login/login.html";
    }
  })
}

function aPerfil() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      window.location.href = "Perfil/index.html";
    } else {
      window.location.href = "login/login.html";
    }
  })
}

function logout() {
  firebase.auth().signOut().then(() => {
    window.location.href = "login/login.html";
  }).catch(() => {
    alert('Erro ao fazer logout');
  })
}

function abiblioteca() {
  window.location.href = "biblioteca/biblio.html";
}

function aSobre() {
  window.location.href = "Sobre/sobre.html";
}

/*
  Busca por genero no firebase
*/

function findTransactionsRomance() {
  firebase.firestore()
    .collection('livros')
    .where('genero', 'array-contains', 'Romance')
    .get()
    .then(snapshot => {
      const Romance = snapshot.docs.map(doc => doc.data());
      addbookRomance(Romance);
    })
}

function findTransactionsFantasia() {
  firebase.firestore()
    .collection('livros')
    .where('genero', 'array-contains', 'Ficção')
    .get()
    .then(snapshot => {
      const Fantasia = snapshot.docs.map(doc => doc.data());
      addbookFantasia(Fantasia);
    })
}

function findTransactionsFicCientífica() {
  firebase.firestore()
    .collection('livros')
    .where('genero', 'array-contains', 'Artes')
    .get()
    .then(snapshot => {
      const FicCientífica = snapshot.docs.map(doc => doc.data());
      addbookFicCientífica(FicCientífica);
    })
}

function findTransactionsLitBrasileira() {
  firebase.firestore()
    .collection('livros')
    .where('genero', 'array-contains', 'Literatura Brasileira')
    .get()
    .then(snapshot => {
      const LitBrasileira = snapshot.docs.map(doc => doc.data());
      addbookLitBrasileira(LitBrasileira);
    })
}

function findTransactionsPopulares() {
  firebase.firestore()
    .collection('livros')
    .orderBy("nota", "desc")
    .get()
    .then(snapshot => {
      const Populares = snapshot.docs.map(doc => doc.data());
      addbookPopulares(Populares);
    })
}

function findTransactionsDidaticos() {
  firebase.firestore()
    .collection('livros')
    .where('genero', 'array-contains', 'Didático')
    .get()
    .then(snapshot => {
      const Didaticos = snapshot.docs.map(doc => doc.data());
      addbookDidaticos(Didaticos);
    })
}

/*
  Implementação na página
*/

function addbookRomance(transactions) {
  const book = document.getElementsByClassName("book");

  for (i = 0; i < transactions.length; i++) {
    let transaction = transactions[i];

    if (i < 13) {
      const li = document.createElement('li');
      li.id = transaction.id;

      const img = document.createElement('img');
      img.src = transaction.imagem;
      img.id = transaction.id;
      li.appendChild(img);

      const span = document.createElement('span');
      span.id = transaction.id;
      span.innerHTML = (transaction.titulo + " - " + transaction.autor);
      li.appendChild(span);

      Romance.appendChild(li);
    } else {
      break;
    }

  }
  dupli();
}

function addbookFantasia(transactions) {
  const book = document.getElementsByClassName("book");
  for (i = 0; i < transactions.length; i++) {
    let transaction = transactions[i];
    if (i < 5) {
      const li = document.createElement('li');
      li.id = transaction.id;

      const img = document.createElement('img');
      img.src = transaction.imagem;
      img.id = transaction.id;
      li.appendChild(img);

      const span = document.createElement('span');
      span.id = transaction.id;
      span.innerHTML = (transaction.titulo + " - " + transaction.autor);
      li.appendChild(span);

      Fantasia.appendChild(li);
    } else {
      break;
    }

  }
  dupli();
}

function addbookFicCientífica(transactions) {
  const book = document.getElementsByClassName("book");
  for (i = 0; i < transactions.length; i++) {
    let transaction = transactions[i];
    if (i < 5) {
      const li = document.createElement('li');
      li.id = transaction.id;

      const img = document.createElement('img');
      img.src = transaction.imagem;
      img.id = transaction.id;
      li.appendChild(img);

      const span = document.createElement('span');
      span.id = transaction.id;
      span.innerHTML = (transaction.titulo + " - " + transaction.autor);
      li.appendChild(span);

      FicCientífica.appendChild(li);
    } else {
      break;
    }

  }
  dupli();
}

function addbookLitBrasileira(transactions) {
  const book = document.getElementsByClassName("book");
  for (i = 0; i < transactions.length; i++) {
    let transaction = transactions[i];
    if (i < 5) {
      const li = document.createElement('li');
      li.id = transaction.id;

      const img = document.createElement('img');
      img.src = transaction.imagem;
      img.id = transaction.id;
      li.appendChild(img);

      const span = document.createElement('span');
      span.id = transaction.id;
      span.innerHTML = (transaction.titulo + " - " + transaction.autor);
      li.appendChild(span);

      LitBrasileira.appendChild(li);
    } else {
      break;
    }

  }
  dupli();
}

function addbookDidaticos(transactions) {
  const book = document.getElementsByClassName("book");
  for (i = 0; i < transactions.length; i++) {
    let transaction = transactions[i];
    if (i < 5) {
      const li = document.createElement('li');
      li.id = transaction.id;

      const img = document.createElement('img');
      img.src = transaction.imagem;
      img.id = transaction.id;
      li.appendChild(img);

      const span = document.createElement('span');
      span.id = transaction.id;
      span.innerHTML = (transaction.titulo + " - " + transaction.autor);
      li.appendChild(span);

      Didaticos.appendChild(li);
    } else {
      break;
    }

  }
  dupli();
}

function addbookPopulares(transactions) {
  const book = document.getElementsByClassName("book");
  for (i = 0; i < transactions.length; i++) {
    let transaction = transactions[i];
    if (i < 5) {
      const li = document.createElement('li');
      li.id = transaction.id;

      const img = document.createElement('img');
      img.src = transaction.imagem;
      img.id = transaction.id;
      li.appendChild(img);

      const span = document.createElement('span');
      span.id = transaction.id;
      span.innerHTML = (transaction.titulo + " - " + transaction.autor);
      li.appendChild(span);

      Populares.appendChild(li);
    } else {
      break;
    }
  }
  dupli();
}

var botoes = document.querySelectorAll(".card");
for (var i = 0; i < botoes.length; i++) {
  botoes[i].addEventListener("click", cardgenero);
}

function cardgenero(event) {
  var botao = event.target;
  var idDoBotao = botao.id;
  idDoBotao = idDoBotao.replace("-", "");
  idDoBotao = idDoBotao.replace("*", " ");

  var Encode = encodeURIComponent(idDoBotao)
  window.location.href = "../Biblioteca/biblio.html" + "?selectedgender=" + Encode;
}