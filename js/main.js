var $letters = document.querySelector('.letters');

function displayAll() {
  for (var i = 1; i < $letters.children.length; i++) {
    getCharData($letters.children[i].textContent);
  }
}

function createUl() {
  var ul = document.createElement('ul');
  ul.className = 'letter-categories';
  var $characterList = document.querySelector('.character-list');
  $characterList.appendChild(ul);
}

displayAll();

function getCharData(letter) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://hp-api.herokuapp.com/api/characters');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var arr = [];
    for (var i = 0; i < xhr.response.length; i++) {
      if (xhr.response[i].name.toLowerCase().indexOf(letter.toLowerCase()) === 0) {
        arr.push(xhr.response[i].name);
      }
    }
    arr.sort();

    var $letCats = document.querySelector('.letter-categories');

    var lettah = document.createElement('li');
    var div = document.createElement('div');
    div.className = 'category-letter';
    div.textContent = letter;
    var ul = document.createElement('ul');
    ul.className = 'names';

    for (var index = 0; index < arr.length; index++) {
      var listItem = document.createElement('li');
      var anchor = document.createElement('a');
      anchor.setAttribute('href', '');
      anchor.textContent = arr[index];
      listItem.appendChild(anchor);

      ul.appendChild(listItem);
    }

    lettah.appendChild(div).appendChild(ul);

    $letCats.appendChild(lettah);
  });

  xhr.send();

}

function clearChars() {
  var $letterCats = document.querySelector('.letter-categories');
  $letterCats.remove();
}

function renderName(event) {
  if (event.target.tagName !== 'LI') {
    return;
  }
  var letter = event.target.textContent;

  if (event.target.textContent === 'All') {
    clearChars();
    createUl();
    displayAll();
  } else {
    clearChars();
    createUl();
    getCharData(letter);
  }

  for (var i = 0; i < $letters.children.length; i++) {
    if ($letters.children[i] === event.target) {
      $letters.children[i].className = 'selected';
    } else {
      $letters.children[i].className = '';
    }
  }

}

$letters.addEventListener('click', renderName);
