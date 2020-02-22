'use strict';
console.log('We\'re in business');

var imageElements = document.getElementsByTagName('img');

var productIndex1 = 0;
var productIndex2 = 1;
var productIndex3 = 2;
var allProducts = [];
var totalClicks = 0;
var rounds = 25;

// Constructor
function Product(name, url){
  this.name = name;
  this.productUrl = url;
  this.timesClicked = 0;
  this.timesSeen = 0;
  allProducts.push(this);
}

// Create Products
new Product('Bag', 'img/bag.jpg');
new Product('Banana Slicer', 'img/banana.jpg');
new Product('Bathroom Accessory', 'img/bathroom.jpg');
new Product('Toeless Boots', 'img/boots.jpg');
new Product('Breakfast Maker', 'img/breakfast.jpg');
new Product('Meatball Bubble Gum', 'img/bubblegum.jpg');
new Product('Funky Chair', 'img/chair.jpg');
new Product('Cthulhu Action Figure', 'img/cthulhu.jpg');
new Product('Dog Duck Lips', 'img/dog-duck.jpg');
new Product('Dragon Meat', 'img/dragon.jpg');
new Product('Silverware Pens', 'img/pen.jpg');
new Product('Pizza Scissors', 'img/scissors.jpg');
new Product('Shark Sleeping Bag', 'img/shark.jpg');
new Product('Pet Sweeper', 'img/pet-sweep.png');
new Product('Tauntaun Sleeping Bag', 'img/tauntaun.jpg');
new Product('Unicorn Meat', 'img/unicorn.jpg');
new Product('Tentacle Thumbdrive', 'img/usb.gif');
new Product('Watering Can', 'img/water-can.jpg');
new Product('Wine Glass', 'img/wine-glass.jpg');

// Account for first three Products being seen
allProducts[productIndex1].timesSeen++;
allProducts[productIndex2].timesSeen++;
allProducts[productIndex3].timesSeen++;

function productClicked(event) {
  totalClicks++;
  if(event.srcElement.id === '1') {
    allProducts[productIndex1].timesClicked++;
  }
  else if (event.srcElement.id === '2') {
    allProducts[productIndex2].timesClicked++;
  }
  else if (event.srcElement.id === '3') {
    allProducts[productIndex3].timesClicked++;
  }
  // Choose random product to display
  var nextProductIndex1 = Math.floor(Math.random() * allProducts.length);
  // To ensure that we don't get an image duplicate on the page, and that we dont see it again on the next rotation. Compare the new first index with the existing first, second, and third product indexes, along with the next second and third product indexes.
  while((nextProductIndex1 === productIndex1) || (nextProductIndex1 === productIndex2) || (nextProductIndex1 === productIndex3)) {
    nextProductIndex1 = Math.floor(Math.random() * allProducts.length);
  }
  var nextProductIndex2 = Math.floor(Math.random() * allProducts.length);
  // Compares the new second index with existing first, second, and third product indexes, along with the next first and third product indexes.
  while((nextProductIndex2 === productIndex1) || (nextProductIndex2 === productIndex2) || (nextProductIndex2 === productIndex3) || (nextProductIndex2 === nextProductIndex1) || (nextProductIndex2 === productIndex3)) {
    nextProductIndex2 = Math.floor(Math.random() * allProducts.length);
  }
  var nextProductIndex3 = Math.floor(Math.random() * allProducts.length);
  // Compare the the new third index with existing first, second, and third product indexes, along with the next first and second product indexes.
  while((nextProductIndex3 === productIndex1) || (nextProductIndex3 === productIndex2) || (nextProductIndex3 === productIndex3) || (nextProductIndex3 === nextProductIndex1) || (nextProductIndex3 === productIndex2)) {
    nextProductIndex3 = Math.floor(Math.random() * allProducts.length);
  }

  productIndex1 = nextProductIndex1;
  allProducts[productIndex1].timesSeen++;
  productIndex2 = nextProductIndex2;
  allProducts[productIndex2].timesSeen++;
  productIndex3 = nextProductIndex3;
  allProducts[productIndex3].timesSeen++;

  // Display the product images
  imageElements[0].src = allProducts[productIndex1].imageUrl;
  imageElements[1].src = allProducts[productIndex2].imageUrl;
  imageElements[2].src = allProducts[productIndex3].imageUrl;

  if(totalClicks >= rounds) {
    // We reached the maximum number of clicks designated by rounds
    var resultsEl = document.getElementsByTagName('aside')[0];
    // Loop through all of the products and 
    if(resultsEl.firstElementChild){
      resultsEl.firstElementChild.remove();
    }
    var createUL = document.createElement('ul');
    for (var i=0; i < allProducts.length; i++){
      var createLI = document.createElement('li');
      createLI.textContent = allProducts[i].name + ' had ' + allProducts[i].timesClicked + ' votes and was shown ' + allProducts[i].timesSeen + 'times.';
      createUL.appendChild(createLI);
    }
    resultsEl.appendChild(createUL);
  }
}
