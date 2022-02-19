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
    anchor.textContent = arr[index];
    listItem.appendChild(anchor);
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

function displayModal(event) {
  var allChars = xhr.response;
  if (event.target.tagName !== 'A') {
    return;
  }
  for (var i = 0; i < allChars.length; i++) {
    if (allChars[i].name === event.target.textContent) {
      $overlay.style.display = 'flex';
    }
  }
}

var $circleX = document.querySelector('.fa-circle-xmark');

$circleX.addEventListener('click', function () {
  $overlay.style.display = 'none';
});
