function contactInstagram() {
  var hashtag = document.getElementById('input').value;
  if (hashtag === null || hashtag === '') {
    return;
  }
  // Création d'une requête HTTP
  var req = new XMLHttpRequest();
  // Requête HTTP GET synchrone vers le fichier langages.txt publié localement
  req.open("GET", "https://www.instagram.com/explore/tags/" + hashtag + "/?__a=1", false);
  req.addEventListener("load", function () {
    if (req.status >= 200 && req.status < 400) { // Le serveur a réussi à traiter la requête
      var divPictures = document.getElementById('pictures');
      divPictures.innerHTML = null;
      var data = JSON.parse(req.responseText);
      var pictures = data.graphql.hashtag.edge_hashtag_to_top_posts.edges;
      for (var i = 0; i < pictures.length; i++) {
        var picture = pictures[i].node.display_url;
        var likes = pictures[i].node.edge_liked_by.count;
        appendPicture(picture, likes);
      }
    } else {
      // Affichage des informations sur l'échec du traitement de la requête
      console.error(req.status + " " + req.statusText);
      document.getElementById('input').value = 'Not found';
    }
  });
  // Envoi de la requête
  req.send(null);
}

function appendPicture(picture, likes) {
  var divPictures = document.getElementById('pictures');
  let div = document.createElement('div');
  div.className = 'picture';
  div.innerHTML = `
    <img src="${picture}" alt="Picture">
    <div class="picture-hover">
      <div class="like">
        <img class="like-icon" src="./like.svg" alt="like icon">
        <p class="like-text">${likes}</p>
      </div>
    </div>
  `;
  divPictures.appendChild(div);
}
