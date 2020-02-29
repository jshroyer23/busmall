'use strict';
console.log('We\'re in business');

var productElements = document.getElementsByClassName('prodImg');
var productIndex1 = 0;
var productIndex2 = 1;
var productIndex3 = 2;
var allProducts = [];
var totalClicks = 0;
var rounds = 25;

// Constructor
function Product(name, url) {
  this.name = name;
  this.productUrl = url;
  this.timesClicked = 0;
  this.timesSeen = 0;
  allProducts.push(this);
}

function getProductArray(productProperty) {
  var answer = [];
  for (var i = 0; i < allProducts.length; i++) {
    answer[i] = allProducts[i][productProperty];
  }
  return answer;
}

var savedProducts = localStorage.getItem('savedProduct');
// Check to see if anything in localStorage
if (savedProducts) {
  var productStrObject = JSON.parse(savedProducts);

  // Turn the string obj into a Product obj
  for (var i = 0; i < productStrObject.length; i++) {
    new Product(productStrObject[i].name, productStrObject[i].productUrl, productStrObject[i].timesClicked, productStrObject[i].timesSeen);
  }
}
else {
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
  new Product('Pet Sweeper', 'img/pet-sweep.jpg');
  new Product('Pizza Scissors', 'img/scissors.jpg');
  new Product('Shark Sleeping Bag', 'img/shark.jpg');
  new Product('Baby Sweeper', 'img/sweep.png');
  new Product('Tauntaun Sleeping Bag', 'img/tauntaun.jpg');
  new Product('Unicorn Meat', 'img/unicorn.jpg');
  new Product('Tentacle Thumbdrive', 'img/usb.gif');
  new Product('Watering Can', 'img/water-can.jpg');
  new Product('Wine Glass', 'img/wine-glass.jpg');
}

// Account for first three Products being seen
allProducts[productIndex1].timesSeen++;
allProducts[productIndex2].timesSeen++;
allProducts[productIndex3].timesSeen++;

function productClicked(event) {
  totalClicks++;
  if (event.srcElement.id === '1') {
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
  // To ensure that we don't get an image duplicate on the page, and that we dont see it again on the next rotation. Compare the new first index with the existing first, second, and third product indexes.
  while ((nextProductIndex1 === productIndex1) || (nextProductIndex1 === productIndex2) || (nextProductIndex1 === productIndex3)) {
    nextProductIndex1 = Math.floor(Math.random() * allProducts.length);
  }
  var nextProductIndex2 = Math.floor(Math.random() * allProducts.length);
  // Compares the new second index with existing first, second, and third product indexes, along with the next first index.
  while ((nextProductIndex2 === productIndex1) || (nextProductIndex2 === productIndex2) || (nextProductIndex2 === productIndex3) || (nextProductIndex2 === nextProductIndex1)) {
    nextProductIndex2 = Math.floor(Math.random() * allProducts.length);
  }
  var nextProductIndex3 = Math.floor(Math.random() * allProducts.length);
  // Compare the the new third index with existing first, second, and third product indexes, along with the next first and second product indexes.
  while ((nextProductIndex3 === productIndex1) || (nextProductIndex3 === productIndex2) || (nextProductIndex3 === productIndex3) || (nextProductIndex3 === nextProductIndex1) || (nextProductIndex3 === nextProductIndex2)) {
    nextProductIndex3 = Math.floor(Math.random() * allProducts.length);
  }

  productIndex1 = nextProductIndex1;
  allProducts[productIndex1].timesSeen++;
  productIndex2 = nextProductIndex2;
  allProducts[productIndex2].timesSeen++;
  productIndex3 = nextProductIndex3;
  allProducts[productIndex3].timesSeen++;

  // Display the product images
  productElements[0].src = allProducts[productIndex1].productUrl;
  productElements[1].src = allProducts[productIndex2].productUrl;
  productElements[2].src = allProducts[productIndex3].productUrl;

  if (totalClicks >= rounds) {
    // We reached the maximum number of clicks designated by rounds

    localStorage.setItem('savedProduct', JSON.stringify(allProducts));

    var resultsEl = document.getElementsByTagName('aside')[0];
    if (resultsEl.firstElementChild) {
      resultsEl.firstElementChild.remove();
    }
    var title = document.createElement('h2');
    title.textContent = 'Results';
    resultsEl.appendChild(title);
    var createUL = document.createElement('ul');
    for (var i = 0; i < allProducts.length; i++) {
      var createLI = document.createElement('li');
      createLI.textContent = allProducts[i].name + ' had ' + allProducts[i].timesClicked + ' votes and was shown ' + allProducts[i].timesSeen + ' times.';
      createUL.appendChild(createLI);
    }
    resultsEl.appendChild(createUL);
  }
  if (totalClicks === rounds) {
    for (var j = 0; j < productElements.length; j++) {
      productElements[j].removeEventListener('click', productClicked);
    }
    createChart();
  }
}

// Creates array of colors
function colorSet(colorType) {
  var colorArray = [];
  console.log(allProducts.length);
  for (var i = 0; i < allProducts.length; i++) {
    colorArray.push(randomColor(colorType));
  }
  console.log(colorArray);
  return colorArray;
}

// Random color generator based on if backgound or border color
function randomColor(colorType) {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  if (colorType === 'background') {
    var color = 'rgb(' + r + ',' + g + ',' + b + ', 0.2)';
  }
  else if (colorType === 'border') {
    color = 'rgb(' + r + ',' + g + ',' + b + ', 1)';
  }
  return color;
}


function createChart() {
  // Chart code thanks to https://www.chartjs.org/docs/latest/
  var ctx = document.getElementById('voteChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      // Create labels from array of Products
      labels: getProductArray('name'),
      datasets: [{
        // First key label
        label: '# of Votes',
        // First data set
        data: getProductArray('timesClicked'),
        backgroundColor: colorSet('background'),
        borderColor: colorSet('border'),
        borderWidth: 1
      },
      {
        // Second Key Label
        label: '# of Times Seen',
        // Second Data Set
        data: getProductArray('timesSeen'),
        backgroundColor: colorSet('background'),
        borderColor: colorSet('border'),

        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            stepSize: 1
          }
        }]
      }
    }
  });
}



// Create even listener to run function when a product is clicked
for (var i = 0; i < productElements.length; i++) {
  productElements[i].addEventListener('click', productClicked);
}
