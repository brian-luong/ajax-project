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
    if ($letCats.children.length > 0) {
      $letCats.children[0].remove();
    }
    var lettah = document.createElement('li');
    var div = document.createElement('div');
    div.className = 'category-letter';
    div.textContent = letter;
    var ul = document.createElement('ul');
    ul.className = 'names';

    for (var index = 0; index < arr.length; index++) {
      var listItem = document.createElement('li');
      listItem.textContent = arr[index];
      ul.appendChild(listItem);
    }

    lettah.appendChild(div).appendChild(ul);

    $letCats.appendChild(lettah);
  });

  xhr.send();

}

function renderName(event) {
  if (event.target.tagName !== 'LI') {
    return;
  }

  var letter = event.target.textContent;

  getCharData(letter);

}

var $letters = document.querySelector('.letters');

$letters.addEventListener('click', renderName);
