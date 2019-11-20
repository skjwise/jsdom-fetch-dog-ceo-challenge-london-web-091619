// document.addEventListener("DOMContentLoaded", () => {
//     const imgURL = "https://dog.ceo/api/breeds/image/random/4";
//     const breedURL = "https://dog.ceo/api/breeds/list/all";

//     const container = document.querySelector('#dog-image-container')
//     const ulEL = document.querySelector('#dog-breeds')
//     const dropdown = document.querySelector('#breed-dropdown')
//     let breeds = [];

//     function init(){
//         fetchImages();
//         fetchBreeds();
//         selectedBreedsEvent();
//     }

//     //challenge 1 - fetch the images for the URL provided, then get a JSON response(promise)
//     //then iterate through each image
//     function fetchImages(){
//         return fetch(imgURL)
//         .then( resp => resp.json())
//         .then(function(results){
//             results.message.forEach(image => addImage(image));
//         })
//     }

//     //function renders the 4 random dog images and appends the img tags to the html dog-image-container
//     //I added in the image height and width sizes to make the page look clearer 
//     function addImage(image){
//         let dogImage = document.createElement('img')
//         dogImage.src = image
//         dogImage.width = "300"
//         dogImage.height = "300"
//         container.append(dogImage)
//     }

//     //challenge 2 - fetched the breedURL list, then got a promise response from JSON
//     //then  
//     function fetchBreeds(){
//         fetch(breedURL)
//         .then( resp => resp.json())
//         .then(breedsInfo => displayBreed(breedsInfo.message))
//     }
//     //this function renders the list of breeds, each breed displayed in a li element (html li tag)
//     function displayBreed(breeds){
//         for (let breed in breeds ){
//             const liEl = document.createElement('li')
//             liEl.innerHTML = breed
//             ulEL.append(liEl)
//             liEl.addEventListener('click', colorChange)
//         }
//     }

//     //challenge 3 - added a click event listener above, 
//     //then the function below targets the click event and changes the text color to pink
//     function colorChange(e){
//         e.target.style.color = 'pink'
//     }

//     //challenge 4 - create a function that expands the dropdown menu to a-z 
//     //when dropdown letter had been selected then show dog breeds starting with that selected letter
//     function selectedBreedsEvent(){
//         dropdown.addEventListener('change', function(e){
//             updateBreedList(e.target.value)
//         })
//     }
//     function updateBreedList(letter){
//         displayUpdatedBreeds(breeds.filter(breed => breed.startsWith(letter)))
//     }
//     function displayUpdatedBreeds(breeds){
//         // console.log(breeds.push(breed => displayBreed(breed)))
//         console.log(breeds.push(breeds))
//     }
//     // function selectedBreeds(letter){
//     //     updateBreedList(breeds.filter(breed => breed.startsWith(letter)));
//     // }

//     init();
// })

let breeds = [];

document.addEventListener('DOMContentLoaded', function () {
  loadImages();
  loadBreedOptions();
});

function loadImages() {
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
  fetch(imgUrl)
    .then(res=> res.json())
    .then(results => {
      results.message.forEach(image => addImage(image))
    });
}

function addImage(dogPicUrl) {
  let container = document.querySelector('#dog-image-container');
  let newImageEl = document.createElement('img');
  newImageEl.src = dogPicUrl;
  newImageEl.height = "300"
  newImageEl.width = "300"
  container.appendChild(newImageEl);
}

function loadBreedOptions() {
  const breedUrl = 'https://dog.ceo/api/breeds/list/all'
  fetch(breedUrl)
    .then(res => res.json())
    .then(results => {

      breeds = Object.keys(results.message);
      updateBreedList(breeds);
      addBreedSelectListener();
    });
}

function updateBreedList(breeds) {
  let ul = document.querySelector('#dog-breeds');
  removeChildren(ul);
  breeds.forEach(breed => addBreed(breed));
}

function removeChildren(element) {
  let child = element.lastElementChild;
  while (child) {
    element.removeChild(child);
    child = element.lastElementChild;
  }
}

function selectBreedsStartingWith(letter) {
  updateBreedList(breeds.filter(breed => breed.startsWith(letter)));
}

function addBreedSelectListener() {
  let breedDropdown = document.querySelector('#breed-dropdown');
  breedDropdown.addEventListener('change', function (e) {
    selectBreedsStartingWith(e.target.value);
  });
}

function addBreed(breed) {
  let ul = document.querySelector('#dog-breeds');
  let li = document.createElement('li');
  li.innerText = breed;
  li.style.cursor = 'pointer';
  ul.appendChild(li);
  li.addEventListener('click', updateColor);
}

function updateColor(e) {
  e.target.style.color = 'pink';
}