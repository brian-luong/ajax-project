var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://hp-api.herokuapp.com/api/characters');
xhr.responseType = 'json';
xhr.addEventListener('load', displayAll);
xhr.send();

var $letterCats = document.querySelector('.letter-categories');
var $letters = document.querySelector('.letters');

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

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

$letters.addEventListener('click', filterLetter);
$letterCats.addEventListener('click', displayModal);
var $overlay = document.querySelector('.overlay');

var $charTiles = document.querySelectorAll('.character-tile');
for (var i = 0; i < $charTiles.length; i++) {
  $charTiles[i].addEventListener('click', function (event) {
    displayModal(event);
  });
}

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

  if (data.favorites.indexOf(event.target.parentNode.getAttribute('data-char')) > -1) {
    $star.className = 'fa-solid fa-star';
  } else {
    $star.className = 'fa-regular fa-star';
  }

  for (var i = 0; i < allChars.length; i++) {
    if (allChars[i].name === event.target.parentNode.getAttribute('data-char')) {
      $overlay.style.display = 'flex';
      $charName.textContent = allChars[i].name;
      $star.setAttribute('data-name', allChars[i].name);

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
      } else if (allChars[i].alive === 'true') {
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

}

var $circleX = document.querySelector('.fa-circle-xmark');

$circleX.addEventListener('click', function () {
  $overlay.style.display = 'none';
});

var $star = document.querySelector('.fa-star');
$star.addEventListener('click', function (event) {
  if (event.target.tagName !== 'I') {
    return;
  }

  if (data.favorites.indexOf(event.target.getAttribute('data-name')) === -1) {
    data.favorites.push(event.target.getAttribute('data-name'));
  }
  $star.className = 'fa-solid fa-star';
});
