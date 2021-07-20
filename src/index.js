document.addEventListener('DOMContentLoaded', function () {
  dogImgs();
  breedList();
});

//Challenge 1 (Add dog images)
function dogImgs() {
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
  fetch(imgUrl)
    .then(res=> res.json())
    .then(json => {
      json.message.forEach(img => addImage(img))
    });
}

function addImage(img) {
  let dogImgContainer = document.querySelector('#dog-image-container');
  let newimgObj = document.createElement('img');
  newimgObj.src = img;
  dogImgContainer.appendChild(newimgObj);
}

//Challenge 2 (Add a list of dog breeds)
let breeds = [];
function breedList() {
  const breedUrl = 'https://dog.ceo/api/breeds/list/all'
  fetch(breedUrl)
    .then(res => res.json())
    .then(json => {
      breeds = Object.keys(json.message);
      updateBreedList(breeds);
      addBreedSelectListener();
    });
}

function updateBreedList(breeds) {
  let dogBreedList = document.querySelector('#dog-breeds');
  clearList(dogBreedList);
  breeds.forEach(breed => addBreed(breed));
}

function addBreed(breed) {
  let ul = document.querySelector('#dog-breeds');
  let li = document.createElement('li');
  li.innerText = breed;
  li.style.cursor = 'pointer';
  ul.appendChild(li);
  li.addEventListener('click', updateColor);
}

function clearList(list) {
  let element = list.lastElementChild;
  while (element) {
    list.removeChild(element);
    element = list.lastElementChild;
  }
}

// Challenage 3 (Add an EventListner)
function updateColor(event) {
  event.target.style.color = "red";
}

//Challenge 4 (Filter breed names with alphabet)
function addBreedSelectListener() {
  let breedSelector = document.querySelector('#breed-dropdown');
  breedSelector.addEventListener('change', function (e) {
    filterBreeds(e.target.value);
  });
}

function filterBreeds(alphabet) {
  updateBreedList(breeds.filter(breed => breed.startsWith(alphabet)));
}

