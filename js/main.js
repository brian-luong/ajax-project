var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://hp-api.herokuapp.com/api/characters');
xhr.responseType = 'json';
xhr.addEventListener('load', displayAll);
xhr.send();

window.addEventListener('load', loadFavorites);

var $letterCats = document.querySelector('.letter-categories');
var $letters = document.querySelector('.letters');
var $modal = document.querySelector('.modal');

function displayAll() {
  for (var i = 1; i < $letters.children.length; i++) {
    displayChar($letters.children[i].textContent);
  }
}

function displayChar(letter) {
  var allChars = xhr.response;
  var arr = [];
  for (var i = 0; i < allChars.length; i++) {
    if (allChars[i].name.toLowerCase().indexOf(letter.toLowerCase()) === 0) {
      arr.push(allChars[i].name);
    }
  }
  arr.sort();
  var li = document.createElement('li');
  var div = document.createElement('div');
  div.className = 'category-letter';
  div.textContent = letter;
  var ul = document.createElement('ul');
  ul.className = 'names';
  for (var index = 0; index < arr.length; index++) {
    var listItem = document.createElement('li');
    var anchor = document.createElement('a');
    anchor.setAttribute('data-char', arr[index]);
    var span = document.createElement('span');

    span.textContent = arr[index];
    listItem.appendChild(anchor).appendChild(span);
    ul.appendChild(listItem);
  }
  li.appendChild(div).appendChild(ul);
  $letterCats.appendChild(li);
}

function filterLetter() {
  if (event.target.tagName !== 'LI') {
    return;
  }

  var letter = event.target.textContent;

  if (event.target.textContent === 'All') {
    removeAllChildNodes($letterCats);
    displayAll();
  } else {
    removeAllChildNodes($letterCats);
    displayChar(letter);
  }

  for (var i = 0; i < $letters.children.length; i++) {
    if ($letters.children[i] === event.target) {
      $letters.children[i].className = 'selected';
    } else {
      $letters.children[i].className = '';
    }
  }
}

var $charTiles = document.querySelectorAll('.character-tile');

for (var i = 0; i < $charTiles.length; i++) {
  $charTiles[i].addEventListener('click', function (event) {
    displayModal(event);
  });
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

$letters.addEventListener('click', filterLetter);
$letterCats.addEventListener('click', displayModal);
var $overlay = document.querySelector('.overlay');

function displayModal(event) {
  var allChars = xhr.response;
  if (event.target.parentNode.tagName !== 'A') {
    return;
  }

  var $charName = document.querySelector('.char-name');
  var $dob = document.querySelector('.dob');
  var $patronus = document.querySelector('.patronus');
  var $house = document.querySelector('.house');
  var $status = document.querySelector('.status');
  var $gender = document.querySelector('.gender');
  var $species = document.querySelector('.species');
  var $ancestry = document.querySelector('.ancestry');
  var $charImg = document.querySelector('.char-img');
  var $star = document.querySelector('.fa-star');

  for (var i = 0; i < allChars.length; i++) {
    if (allChars[i].name === event.target.parentNode.getAttribute('data-char')) {
      $overlay.style.display = 'flex';
      $charName.textContent = allChars[i].name;
      $modal.setAttribute('data-name', allChars[i].name);

      if (!allChars[i].dateOfBirth) {
        $dob.textContent = 'Unknown';
      } else {
        $dob.textContent = allChars[i].dateOfBirth;
      }

      if (!allChars[i].patronus) {
        $patronus.textContent = 'Unknown';
      } else {
        $patronus.textContent = allChars[i].patronus;
      }

      if (!allChars[i].house) {
        $house.textContent = 'Unknown';
      } else {
        $house.textContent = allChars[i].house;
      }

      if (!allChars[i].alive) {
        $status.textContent = 'Unknown';
      } else if (allChars[i].alive === true) {
        $status.textContent = 'Alive';
      } else {
        $status.textContent = 'Deceased';
      }

      if (!allChars[i].gender) {
        $gender.textContent = 'Unknown';
      } else {
        $gender.textContent = allChars[i].gender;
      }

      if (!allChars[i].species) {
        $species.textContent = 'Unknown';
      } else {
        $species.textContent = allChars[i].species;
      }

      if (!allChars[i].ancestry) {
        $ancestry.textContent = 'Unknown';
      } else {
        $ancestry.textContent = allChars[i].ancestry;
      }

      if (allChars[i].image === '') {
        $charImg.src = 'images/No-Image-Placeholder.svg.png';
      } else {
        $charImg.src = allChars[i].image;
      }

    }
  }

  if (data.favNames.indexOf($modal.getAttribute('data-name')) > -1) {
    $star.className = 'fa-solid fa-star';
  } else {
    $star.className = 'fa-regular fa-star';
  }

}

var $circleX = document.querySelector('.fa-circle-xmark');

$circleX.addEventListener('click', function () {
  $overlay.style.display = 'none';
});

var $star = document.querySelector('.fa-star');
$star.addEventListener('click', toggleFavorite);

function toggleFavorite(event) {

  if (event.target.tagName !== 'I') {
    return;
  }

  if (data.favNames.indexOf($modal.getAttribute('data-name')) === -1) {
    var allChars = xhr.response;
    for (var i = 0; i < allChars.length; i++) {
      if ($modal.getAttribute('data-name') === allChars[i].name) {
        data.favorites.push(allChars[i]);
        data.favNames.push($modal.getAttribute('data-name'));
      }
    }
    $star.className = 'fa-solid fa-star';
  } else if (data.favNames.indexOf($modal.getAttribute('data-name')) > -1) {
    for (let i = 0; i < data.favorites.length; i++) {
      if ($modal.getAttribute('data-name') === data.favorites[i].name) {
        var index = data.favNames.indexOf($modal.getAttribute('data-name'));
        data.favNames.splice(index, 1);
        data.favorites.splice(index, 1);
      }
    }
    $star.className = 'fa-regular fa-star';

  }
  clearFavorites($favoriteCharCon);
  loadFavorites();
}

var $navItems = document.querySelector('.nav-items');
var $view = document.querySelectorAll('.view');

function viewSwap(event) {
  if (event.target.tagName !== 'A') {
    return;
  }
  var $dataView = event.target.getAttribute('data-view');
  for (var i = 0; i < $view.length; i++) {
    if ($dataView === $view[i].getAttribute('data-view')) {
      $view[i].className = 'view';
    } else {
      $view[i].className = 'view hidden';
    }
  }
}

$navItems.addEventListener('click', viewSwap);
var $favoriteCharCon = document.querySelector('.favorite-char-container');

function loadFavorites() {

  for (var i = 0; i < data.favorites.length; i++) {
    var a = document.createElement('a');
    a.className = 'character-tile favorite-char-tile';
    a.setAttribute('data-char', data.favorites[i].name);
    var img = document.createElement('img');

    if (data.favorites[i].image === '') {
      img.src = 'images/No-Image-Placeholder.svg.png';
    } else {
      img.src = data.favorites[i].image;
    }

    var div = document.createElement('div');
    div.className = 'character-name';
    div.textContent = data.favorites[i].name;
    a.appendChild(img);
    a.appendChild(div);

    $favoriteCharCon.appendChild(a);
  }
  var $favoriteCharTile = document.querySelectorAll('.favorite-char-tile');
  for (var index = 0; index < $favoriteCharTile.length; index++) {
    $favoriteCharTile[index].addEventListener('click', function (event) {
      displayModal(event);
    });
  }
}

function clearFavorites(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function loadView(event) {
  for (var i = 0; i < $view.length; i++) {
    if (data.view === $view[i].getAttribute('data-view')) {
      $view[i].className = 'view';
    } else {
      $view[i].className = 'view hidden';
    }
  }
}

window.addEventListener('DOMContentLoaded', loadView);
