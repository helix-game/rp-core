const vehicleShop = $(".vehicleshop");
const buyCar = $(".vehicleshop .buy-car");
const wallet = $(".vehicleshop .wallet");
const info = $(".vehicleshop .info");
const topStats = $(".vehicleshop .top-stats");
const buyCarFromMainBuyButton = $(".vehicleshop .buy-car button");
const confirmBuyButton = $(".vehicleshop .confirm-buy button.buy");
const cancelBuyButton = $(".vehicleshop .confirm-buy button.cancel");
const confirmBuy = $(".vehicleshop .confirm-buy");
/* <div class="stat" data-stat="consumption"> */
const carStats = $(".top-stats .stat")

let uiState = "slider";
let colors = $(".color-picker .color");
let selectedColor = "rgba(255, 201, 62, 0.25)";

let uiElements = [buyCar, wallet, info, topStats];
let catalogue = $(".cars .catalogue");
let carIndex = null
let animating = false;
let buttonAllCars = $(".cars button");
let carArray = $('.cars .catalogue .car');
let categorysElements = $(".cars .filters .category");
let categorys = [];
let searchInput = $(".cars .filters input");
let carsCatalogue = null;

// Hardcoded data
let myLix = 137000
let hardcodedCars = [
  {
    "name": "acura",
    "model": "nsx",
    "img": "2021-acura-nsx-4wd-coupe.png",
    "categories": ["sports"],
    "stats": {
      "tankCapacity": 87,
      "consumption": "low",
      "trunkCapacity": 27
    },
    "price": 99999
  },
  {
    "name": "stingray",
    "model": "r8 v10 plus",
    "img": "2022-stingray 1.png",
    "categories": ["sports"],
    "stats": {
      "tankCapacity": 43,
      "consumption": "medium",
      "trunkCapacity": 34
    },
    "price": 99999
  },
  {
    "name": "camaro",
    "model": "camaro 1lt",
    "img": "2022-chevrolet-camaro-1lt-convertible.png",
    "categories": ["electric"],
    "stats": {
      "tankCapacity": 55,
      "consumption": "high",
      "trunkCapacity": 29
    },
    "price": 99999
  },
  {
    "name": "dodge",
    "model": "challenger sxt",
    "img": "2022-dodge-challenger-sxt-coupe.png",
    "categories": ["muscle"],
    "stats": {
      "tankCapacity": 77,
      "consumption": "high",
      "trunkCapacity": 22
    },
    "price": 99999
  },
  {
    "name": "porsche",
    "model": "911 carrera s",
    "img": "2022-porsche-911-carrera-s-coupe.png",
    "categories": ["pickup", "muscle"],
    "stats": {
      "tankCapacity": 67,
      "consumption": "medium",
      "trunkCapacity": 33
    },
    "price": 99999
  },
  {
    "name": "corvette",
    "model": "corvette stingray 1lt targa",
    "img": "2023-chevrolet-corvette-stingray-1lt-targa.png",
    "categories": ["muscle", "crossovers"],
    "stats": {
      "tankCapacity": 83,
      "consumption": "low",
      "trunkCapacity": 31
    },
    "price": 99999
  },
  {
    "name": "acura",
    "model": "nsx",
    "img": "2021-acura-nsx-4wd-coupe.png",
    "categories": ["sports"],
    "stats": {
      "tankCapacity": 87,
      "consumption": "low",
      "trunkCapacity": 27
    },
    "price": 99999
  },
  {
    "name": "stingray",
    "model": "r8 v10 plus",
    "img": "2022-stingray 1.png",
    "categories": ["sports"],
    "stats": {
      "tankCapacity": 43,
      "consumption": "medium",
      "trunkCapacity": 34
    },
    "price": 99999
  },
  {
    "name": "camaro",
    "model": "camaro 1lt",
    "img": "2022-chevrolet-camaro-1lt-convertible.png",
    "categories": ["electric"],
    "stats": {
      "tankCapacity": 55,
      "consumption": "high",
      "trunkCapacity": 29
    },
    "price": 99999
  },
  {
    "name": "dodge",
    "model": "challenger sxt",
    "img": "2022-dodge-challenger-sxt-coupe.png",
    "categories": ["muscle"],
    "stats": {
      "tankCapacity": 77,
      "consumption": "high",
      "trunkCapacity": 22
    },
    "price": 99999
  },
  {
    "name": "porsche",
    "model": "911 carrera s",
    "img": "2022-porsche-911-carrera-s-coupe.png",
    "categories": ["pickup", "muscle"],
    "stats": {
      "tankCapacity": 67,
      "consumption": "medium",
      "trunkCapacity": 33
    },
    "price": 99999
  },
  {
    "name": "corvette",
    "model": "corvette stingray 1lt targa",
    "img": "2023-chevrolet-corvette-stingray-1lt-targa.png",
    "categories": ["muscle", "crossovers"],
    "stats": {
      "tankCapacity": 83,
      "consumption": "low",
      "trunkCapacity": 31
    },
    "price": 99999
  },
  {
    "name": "acura",
    "model": "nsx",
    "img": "2021-acura-nsx-4wd-coupe.png",
    "categories": ["sports"],
    "stats": {
      "tankCapacity": 87,
      "consumption": "low",
      "trunkCapacity": 27
    },
    "price": 99999
  },
  {
    "name": "stingray",
    "model": "r8 v10 plus",
    "img": "2022-stingray 1.png",
    "categories": ["sports"],
    "stats": {
      "tankCapacity": 43,
      "consumption": "medium",
      "trunkCapacity": 34
    },
    "price": 99999
  },
  {
    "name": "camaro",
    "model": "camaro 1lt",
    "img": "2022-chevrolet-camaro-1lt-convertible.png",
    "categories": ["electric"],
    "stats": {
      "tankCapacity": 55,
      "consumption": "high",
      "trunkCapacity": 29
    },
    "price": 99999
  },
  {
    "name": "dodge",
    "model": "challenger sxt",
    "img": "2022-dodge-challenger-sxt-coupe.png",
    "categories": ["muscle"],
    "stats": {
      "tankCapacity": 77,
      "consumption": "high",
      "trunkCapacity": 22
    },
    "price": 99999
  },
  {
    "name": "porsche",
    "model": "911 carrera s",
    "img": "2022-porsche-911-carrera-s-coupe.png",
    "categories": ["pickup", "muscle"],
    "stats": {
      "tankCapacity": 67,
      "consumption": "medium",
      "trunkCapacity": 33
    },
    "price": 99999
  },
  {
    "name": "corvette",
    "model": "corvette stingray 1lt targa",
    "img": "2023-chevrolet-corvette-stingray-1lt-targa.png",
    "categories": ["muscle", "crossovers"],
    "stats": {
      "tankCapacity": 83,
      "consumption": "low",
      "trunkCapacity": 31
    },
    "price": 99999
  },
  {
    "name": "acura",
    "model": "nsx",
    "img": "2021-acura-nsx-4wd-coupe.png",
    "categories": ["sports"],
    "stats": {
      "tankCapacity": 87,
      "consumption": "low",
      "trunkCapacity": 27
    },
    "price": 99999
  },
  {
    "name": "stingray",
    "model": "r8 v10 plus",
    "img": "2022-stingray 1.png",
    "categories": ["sports"],
    "stats": {
      "tankCapacity": 43,
      "consumption": "medium",
      "trunkCapacity": 34
    },
    "price": 99999
  },
  {
    "name": "camaro",
    "model": "camaro 1lt",
    "img": "2022-chevrolet-camaro-1lt-convertible.png",
    "categories": ["electric"],
    "stats": {
      "tankCapacity": 55,
      "consumption": "high",
      "trunkCapacity": 29
    },
    "price": 99999
  },
  {
    "name": "dodge",
    "model": "challenger sxt",
    "img": "2022-dodge-challenger-sxt-coupe.png",
    "categories": ["muscle"],
    "stats": {
      "tankCapacity": 77,
      "consumption": "high",
      "trunkCapacity": 22
    },
    "price": 99999
  },
  {
    "name": "porsche",
    "model": "911 carrera s",
    "img": "2022-porsche-911-carrera-s-coupe.png",
    "categories": ["pickup", "muscle"],
    "stats": {
      "tankCapacity": 67,
      "consumption": "medium",
      "trunkCapacity": 33
    },
    "price": 99999
  },
  {
    "name": "corvette",
    "model": "corvette stingray 1lt targa",
    "img": "2023-chevrolet-corvette-stingray-1lt-targa.png",
    "categories": ["muscle", "crossovers"],
    "stats": {
      "tankCapacity": 83,
      "consumption": "low",
      "trunkCapacity": 31
    },
    "price": 99999
  },
  {
    "name": "acura",
    "model": "nsx",
    "img": "2021-acura-nsx-4wd-coupe.png",
    "categories": ["sports"],
    "stats": {
      "tankCapacity": 87,
      "consumption": "low",
      "trunkCapacity": 27
    },
    "price": 99999
  },
  {
    "name": "stingray",
    "model": "r8 v10 plus",
    "img": "2022-stingray 1.png",
    "categories": ["sports"],
    "stats": {
      "tankCapacity": 43,
      "consumption": "medium",
      "trunkCapacity": 34
    },
    "price": 99999
  },
  {
    "name": "camaro",
    "model": "camaro 1lt",
    "img": "2022-chevrolet-camaro-1lt-convertible.png",
    "categories": ["electric"],
    "stats": {
      "tankCapacity": 55,
      "consumption": "high",
      "trunkCapacity": 29
    },
    "price": 99999
  },
  {
    "name": "dodge",
    "model": "challenger sxt",
    "img": "2022-dodge-challenger-sxt-coupe.png",
    "categories": ["muscle"],
    "stats": {
      "tankCapacity": 77,
      "consumption": "high",
      "trunkCapacity": 22
    },
    "price": 99999
  },
  {
    "name": "porsche",
    "model": "911 carrera s",
    "img": "2022-porsche-911-carrera-s-coupe.png",
    "categories": ["pickup", "muscle"],
    "stats": {
      "tankCapacity": 67,
      "consumption": "medium",
      "trunkCapacity": 33
    },
    "price": 99999
  },
  {
    "name": "corvette",
    "model": "corvette stingray 1lt targa",
    "img": "2023-chevrolet-corvette-stingray-1lt-targa.png",
    "categories": ["muscle", "crossovers"],
    "stats": {
      "tankCapacity": 83,
      "consumption": "low",
      "trunkCapacity": 31
    },
    "price": 99999
  },
  {
    "name": "acura",
    "model": "nsx",
    "img": "2021-acura-nsx-4wd-coupe.png",
    "categories": ["sports"],
    "stats": {
      "tankCapacity": 87,
      "consumption": "low",
      "trunkCapacity": 27
    },
    "price": 99999
  },
  {
    "name": "stingray",
    "model": "r8 v10 plus",
    "img": "2022-stingray 1.png",
    "categories": ["sports"],
    "stats": {
      "tankCapacity": 43,
      "consumption": "medium",
      "trunkCapacity": 34
    },
    "price": 99999
  },
  {
    "name": "camaro",
    "model": "camaro 1lt",
    "img": "2022-chevrolet-camaro-1lt-convertible.png",
    "categories": ["electric"],
    "stats": {
      "tankCapacity": 55,
      "consumption": "high",
      "trunkCapacity": 29
    },
    "price": 99999
  },
  {
    "name": "dodge",
    "model": "challenger sxt",
    "img": "2022-dodge-challenger-sxt-coupe.png",
    "categories": ["muscle"],
    "stats": {
      "tankCapacity": 77,
      "consumption": "high",
      "trunkCapacity": 22
    },
    "price": 99999
  },
  {
    "name": "porsche",
    "model": "911 carrera s",
    "img": "2022-porsche-911-carrera-s-coupe.png",
    "categories": ["pickup", "muscle"],
    "stats": {
      "tankCapacity": 67,
      "consumption": "medium",
      "trunkCapacity": 33
    },
    "price": 99999
  },
  {
    "name": "corvette",
    "model": "corvette stingray 1lt targa",
    "img": "2023-chevrolet-corvette-stingray-1lt-targa.png",
    "categories": ["muscle", "crossovers"],
    "stats": {
      "tankCapacity": 83,
      "consumption": "low",
      "trunkCapacity": 31
    },
    "price": 99999
  },
  {
    "name": "acura",
    "model": "nsx",
    "img": "2021-acura-nsx-4wd-coupe.png",
    "categories": ["sports"],
    "stats": {
      "tankCapacity": 87,
      "consumption": "low",
      "trunkCapacity": 27
    },
    "price": 99999
  },
  {
    "name": "stingray",
    "model": "r8 v10 plus",
    "img": "2022-stingray 1.png",
    "categories": ["sports"],
    "stats": {
      "tankCapacity": 43,
      "consumption": "medium",
      "trunkCapacity": 34
    },
    "price": 99999
  },
  {
    "name": "camaro",
    "model": "camaro 1lt",
    "img": "2022-chevrolet-camaro-1lt-convertible.png",
    "categories": ["electric"],
    "stats": {
      "tankCapacity": 55,
      "consumption": "high",
      "trunkCapacity": 29
    },
    "price": 99999
  },
  {
    "name": "dodge",
    "model": "challenger sxt",
    "img": "2022-dodge-challenger-sxt-coupe.png",
    "categories": ["muscle"],
    "stats": {
      "tankCapacity": 77,
      "consumption": "high",
      "trunkCapacity": 22
    },
    "price": 99999
  },
  {
    "name": "porsche",
    "model": "911 carrera s",
    "img": "2022-porsche-911-carrera-s-coupe.png",
    "categories": ["pickup", "muscle"],
    "stats": {
      "tankCapacity": 67,
      "consumption": "medium",
      "trunkCapacity": 33
    },
    "price": 99999
  },
  {
    "name": "corvette",
    "model": "corvette stingray 1lt targa",
    "img": "2023-chevrolet-corvette-stingray-1lt-targa.png",
    "categories": ["muscle", "crossovers"],
    "stats": {
      "tankCapacity": 83,
      "consumption": "low",
      "trunkCapacity": 31
    },
    "price": 99999
  },
  {
    "name": "acura",
    "model": "nsx",
    "img": "2021-acura-nsx-4wd-coupe.png",
    "categories": ["sports"],
    "stats": {
      "tankCapacity": 87,
      "consumption": "low",
      "trunkCapacity": 27
    },
    "price": 99999
  },
  {
    "name": "stingray",
    "model": "r8 v10 plus",
    "img": "2022-stingray 1.png",
    "categories": ["sports"],
    "stats": {
      "tankCapacity": 43,
      "consumption": "medium",
      "trunkCapacity": 34
    },
    "price": 99999
  },
  {
    "name": "camaro",
    "model": "camaro 1lt",
    "img": "2022-chevrolet-camaro-1lt-convertible.png",
    "categories": ["electric"],
    "stats": {
      "tankCapacity": 55,
      "consumption": "high",
      "trunkCapacity": 29
    },
    "price": 99999
  },
  {
    "name": "dodge",
    "model": "challenger sxt",
    "img": "2022-dodge-challenger-sxt-coupe.png",
    "categories": ["muscle"],
    "stats": {
      "tankCapacity": 77,
      "consumption": "high",
      "trunkCapacity": 22
    },
    "price": 99999
  },
  {
    "name": "porsche",
    "model": "911 carrera s",
    "img": "2022-porsche-911-carrera-s-coupe.png",
    "categories": ["pickup", "muscle"],
    "stats": {
      "tankCapacity": 67,
      "consumption": "medium",
      "trunkCapacity": 33
    },
    "price": 99999
  },
  {
    "name": "corvette",
    "model": "corvette stingray 1lt targa",
    "img": "2023-chevrolet-corvette-stingray-1lt-targa.png",
    "categories": ["muscle", "crossovers"],
    "stats": {
      "tankCapacity": 83,
      "consumption": "low",
      "trunkCapacity": 31
    },
    "price": 99999
  },
  {
    "name": "acura",
    "model": "nsx",
    "img": "2021-acura-nsx-4wd-coupe.png",
    "categories": ["sports"],
    "stats": {
      "tankCapacity": 87,
      "consumption": "low",
      "trunkCapacity": 27
    },
    "price": 99999
  },
  {
    "name": "stingray",
    "model": "r8 v10 plus",
    "img": "2022-stingray 1.png",
    "categories": ["sports"],
    "stats": {
      "tankCapacity": 43,
      "consumption": "medium",
      "trunkCapacity": 34
    },
    "price": 99999
  },
  {
    "name": "camaro",
    "model": "camaro 1lt",
    "img": "2022-chevrolet-camaro-1lt-convertible.png",
    "categories": ["electric"],
    "stats": {
      "tankCapacity": 55,
      "consumption": "high",
      "trunkCapacity": 29
    },
    "price": 99999
  },
  {
    "name": "dodge",
    "model": "challenger sxt",
    "img": "2022-dodge-challenger-sxt-coupe.png",
    "categories": ["muscle"],
    "stats": {
      "tankCapacity": 77,
      "consumption": "high",
      "trunkCapacity": 22
    },
    "price": 99999
  },
  {
    "name": "porsche",
    "model": "911 carrera s",
    "img": "2022-porsche-911-carrera-s-coupe.png",
    "categories": ["pickup", "muscle"],
    "stats": {
      "tankCapacity": 67,
      "consumption": "medium",
      "trunkCapacity": 33
    },
    "price": 99999
  },
  {
    "name": "corvette",
    "model": "corvette stingray 1lt targa",
    "img": "2023-chevrolet-corvette-stingray-1lt-targa.png",
    "categories": ["muscle", "crossovers"],
    "stats": {
      "tankCapacity": 83,
      "consumption": "low",
      "trunkCapacity": 31
    },
    "price": 99999
  },
]

updateCarsCatalogue(hardcodedCars);

colors[2].click()




// Color picker
colors.on("click", function () {
  selectedColor = "rgba(" + $(this).data("color") + ")";
  // reset colors
  colors.each(function () {
    $(this).css("background-color", "rgba(" + $(this).data("color") + ")");
    $(this).children().css("background-color", "rgba(" + $(this).data("color") + ")");
  });

  // main div color
  let color = $(this).css("background-color");
  let alpha = color.split(",")[3].split(")")[0];
  alpha = parseFloat(alpha) + 0.2;
  color = color.split(",")[0] + "," + color.split(",")[1] + "," + color.split(",")[2] + "," + alpha + ")";
  $(this).css("background-color", color);

  // child span color
  let child = $(this).children();
  color = child.css("background-color");
  alpha = color.split(",")[3].split(")")[0];
  alpha = parseFloat(alpha) + 0.6;
  color = color.split(",")[0] + "," + color.split(",")[1] + "," + color.split(",")[2] + "," + alpha + ")";
  child.css("background-color", color);

});

// Ui toggler
buttonAllCars.on("click", function () {
  $('.vehicleshop .cars').fadeTo(300, 0);
  $('.vehicleshop .cars').css('pointer-events', 'none');

  $('.vehicleshop .bg').css("filter", uiState === "slider" ? "blur(9px)" : "blur(0px)");

  $('.hotkey.backspace').fadeTo(2000, uiState === "slider" ? 1 : 0).css('display', uiState === "slider" ? 'flex' : 'none')
  $('.hotkey.space').fadeTo(2000, uiState === "slider" ? 0 : 1).css('display', uiState === "slider" ? 'none' : 'flex')

  setTimeout(() => {
    const fadeOpacity = uiState === "slider" ? 0 : 1;
    uiElements.forEach(element => element.stop().fadeTo(300, fadeOpacity));
    $('.vehicleshop .cars').toggleClass("expanded");

    setTimeout(() => {
      $('.vehicleshop .cars').fadeTo(300, 1);
      $('.vehicleshop .cars').css('pointer-events', 'all');
      uiState = uiState === "slider" ? "catalogue" : "slider";
      updateCarsCatalogue(hardcodedCars);
    }, 500);
  }, 400);
});

// Categorys
categorysElements.on("click", function () {
  carArray = $('.cars .catalogue .car')
  if ($(this).hasClass("active")) {
    $(this).removeClass("active");
  } else {
    $(this).addClass("active");
  }

  categorys = [];
  categorysElements.each(function () {
    if ($(this).hasClass("active")) {
      categorys.push($(this).data("category"));
    } else {
      categorys = categorys.filter(function (value, index, arr) {
        return value != $(this).data("category");
      });
    }
  });

  if (categorys.length == 0) {
    carArray.each(function () {
      $(this).css("display", "flex");
    });
  } else {
    let i = 0
    carArray.each(function () {
      let carCategories = $(this).data("categories");
      if (typeof carCategories !== 'undefined' && carCategories !== null) {
        if (String(carCategories).includes(",")) {
          carCategories = carCategories.split(',');
        }
        if (typeof carCategories === 'string') {
          carCategories = [carCategories];
        }
        let found = false;
        for (let i = 0; i < carCategories.length; i++) {
          if (categorys.includes(carCategories[i])) {
            found = true;
          }
        }
        if (found) {
          $(this).css("display", "flex");
        } else {
          $(this).css("display", "none");
        }
      }
    });
    i++;
  }
});

// Confirm buy from main buy button
buyCarFromMainBuyButton.on("click", function () {
  let selectedCar = $(".vehicleshop .cars .catalogue .car.selected");
  let index = selectedCar.data("index");

  let name = carsCatalogue[index].name;
  let model = carsCatalogue[index].model;
  let price = carsCatalogue[index].price;

  confirmBuy.find(".name").html(`${name}<span class="model">${model}</span>`);
  confirmBuy.find(".price").text(String(price).replace(/(.)(?=(\d{3})+$)/g, '$1.'));


  confirmBuy.fadeTo(300, 1).css("display", "flex");
  confirmBuy.css("pointer-events", "all");
});

// Cancel buy
cancelBuyButton.on("click", function () {
  confirmBuy.fadeTo(300, 0);
  confirmBuy.css("pointer-events", "none");
});

// Select car
catalogue.on("click", ".car", function () {
  if (uiState == "catalogue" || !$(this).hasClass("lefted") && !$(this).hasClass("righted") && !$(this).hasClass("selected")) {
    $(".right-click").remove();
    $(".cars .catalogue .car").each(function () {
      $(this).removeClass("selected");
    });
    carIndex = $(this).data("index");

    $(".buy-car .name").empty();
    let eModel = `${carsCatalogue[carIndex].name}<span class="model">${carsCatalogue[carIndex].model.substring(0, 8).trim()}...</span>`
    $('.buy-car .name').append(eModel)

    let eModelForInfo = `${carsCatalogue[carIndex].name}<span class="model">${carsCatalogue[carIndex].model.substring(0, 3).trim()}...</span>`
    $('.info .name').html(eModelForInfo)

    let actualCarStats = carsCatalogue[carIndex].stats;
    
    // Find the carStat with data-stat="tankCapacity" and change the value
    $('.top-stats .stat[data-stat="tank-capacity"] .value').text(actualCarStats["tankCapacity"])
    $('.top-stats .stat[data-stat="consumption"] .value').text(actualCarStats["consumption"])
    $('.top-stats .stat[data-stat="trunk-capacity"] .value').text(actualCarStats["trunkCapacity"])

    console.log($('.top-stats .stat[data-stat="tankCapacity"]').html())

    $(".buy-car .price .value").empty();
    let ePrice = `${carsCatalogue[carIndex].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`
    $('.buy-car .price .value').append(ePrice)


    $(".cars .catalogue .car").each(function () {
      if ($(this).data("index") == carIndex) {
        $(this).addClass("selected");
      }
    });
  }
});

// Remove right click menu
vehicleShop.on("click", function (e) {
  if (!$(e.target).hasClass("car")) {
    $(".right-click").remove();
  }

});

// Right click on car
catalogue.on("contextmenu", ".car", function (e) {
  e.preventDefault();
  if (uiState == "slider") {
    return;
  }
  $(".right-click").remove();
  // click this car
  $(this).click();

  let model = carsCatalogue[carIndex].model.length > 8 ? carsCatalogue[carIndex].model.substring(0, 7).trim() + "..." : carsCatalogue[carIndex].model;

  let element = `<div class="right-click">
    
    <div class="top-side">
      <div class="header">
        <h1>${carsCatalogue[carIndex].name}<span>${model}</span></h1>
        <div class="my-lix">
          <img src="./media/lix-yellow.png" alt="">
          <p>${carsCatalogue[carIndex].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p>
        </div>
      </div>

      <div class="properties">
        <div class="property">
          <span>
            <img src="./media/tank-white.png" alt="">
          </span>
          <p>${carsCatalogue[carIndex].stats.tankCapacity} Liters</p>
        </div>
        <div class="property">
          <span>
            <img src="./media/fire-white.png" alt="">
          </span>
          <p>${carsCatalogue[carIndex].stats.consumption}</p>
        </div>
        <div class="property">
          <span>
            <img src="./media/car-white.png" alt="">
          </span>
          <p>${carsCatalogue[carIndex].stats.trunkCapacity} Cells</p>
        </div>
      </div>
    </div>

    <div class="buttons">
      <button class="buy">
        <img src="./media/card.png" alt="">
        <p>buy</p>
      </button>
      <button class="test-drive">
        <img src="./media/drive-car.png" alt="">
        <p>test drive</p>
      </button>
      <button class="status">
        <img src="./media/status.png" alt="">
        <p>status</p>
      </button>
    </div>
  </div>`

  $(this).append(element);

  $(".vehicleshop .right-click button.buy").on("click", function () {
    confirmBuy.fadeTo(300, 1).css("display", "flex");
    confirmBuy.css("pointer-events", "all");
  });

  let carPositionLeft = $(this).position().left;
  let carPositionTop = $(this).position().top;
  let carWidth = $(this).outerWidth(true);
  let carHeight = $(this).outerHeight(true);
  let catalogueWidth = $(".cars .catalogue").outerWidth(true);
  let catalogueHeight = $(".cars .catalogue").outerHeight(true);

  let translateX = "";
  let translateY = "";
  console.log(carPositionLeft + carWidth, catalogueWidth * 0.75)
  if (carPositionLeft + carWidth > catalogueWidth * 0.75) {
    translateX = "-100%";
  }

  if (carPositionTop + carHeight > catalogueHeight * 0.75) {
    translateY = "-100%";
  }

  if (translateX !== "" || translateY !== "") {
    $(".right-click").css("transform", `translate(${translateX == "" ? 0 : translateX}, ${translateY == "" ? 0 : translateY})`);
  }

});

// Search bar
searchInput.on("input", function () {
  let searchValue = $(this).val().toLowerCase();
  $('.cars .catalogue .car').each(function () {
    if ($(this).data("name").toLowerCase().includes(searchValue)) {
      $(this).css("display", "flex");
      console.log($(this).data("name"))
    } else {
      $(this).css("display", "none");
    }
  });
});

/* // On key press
$(document).on("keypress", function (e) {
  if (e.key == "q" || e.key == "Q") {
    console.log("Q pressed");
    moveCars("left");
  } else if (e.key == "e" || e.key == "E") {
    moveCars("right");
  }
}); */

document.addEventListener("keydown", function(event) {
  if (event.key === "q" || event.key === "Q") {
    moveCars("left");
    console.log('called to left');
  }
  
  if (event.key === "e" || event.key === "E") {
    moveCars("right");
    console.log('called to right');
  }
})

// Cars slider
function moveCars(direction) {

  if (animating) {
    return;
  }
  animating = true;

  const carOutherWidth = $(".cars .catalogue .car").outerWidth(true);

  if (direction === 'left') {
    let rightedCarIndex = $(".cars .catalogue .car").eq(8).data("index");
    let nextCarIndex = (rightedCarIndex + 1) % carsCatalogue.length;
    let nextCar = carsCatalogue[nextCarIndex];
    let element = `<div data-index="${nextCarIndex}" data-name="${nextCar.name}" class="car ${nextCarIndex == carIndex ? "selected" : ""}">
      <img src="./media/cars/${nextCar.img}" alt="">
    </div>`;

    $(".cars .catalogue .car").css("transition", "all 0.3s ease-in-out");
    $(".cars .catalogue .car").children().css("transition", "all 0.3s ease-in-out");

    $(".cars .catalogue .car").first().css("opacity", 0);
    $(".cars .catalogue .car").first().children().css("opacity", 0);

    $(".cars .catalogue .car").css("transform", `translateX(-${carOutherWidth}px)`);

    setTimeout(() => {
      $(".cars .catalogue .car").css("transition", "none");
      $(".cars .catalogue .car").first().remove();
      $(".cars .catalogue").append(element);
      $(".cars .catalogue .car").css("transform", `translateX(0px)`);
      $(".cars .catalogue .car").last().css("opacity", 0);

      setTimeout(() => {
        $(".cars .catalogue .car").css("transition", "all 0.2s ease-in-out");
        $(".cars .catalogue .car").css("opacity", 1);
        setTimeout(() => {
          animating = false;
        }, 500);
      }, 10);
    }, 300);
  } else if (direction === 'right') {
    let leftedCarIndex = $(".cars .catalogue .car").first().data("index");
    let prevCarIndex = (leftedCarIndex - 1 + carsCatalogue.length) % carsCatalogue.length;
    let prevCar = carsCatalogue[prevCarIndex];
    let element = `<div data-index="${prevCarIndex}" data-name="${prevCar.name}" class="car ${prevCarIndex == carIndex ? "selected" : ""}">
      <img src="./media/cars/${prevCar.img}" alt="">
    </div>`;

    $(".cars .catalogue .car").css("transition", "all 0.3s ease-in-out");
    $(".cars .catalogue .car").children().css("transition", "all 0.3s ease-in-out");

    let rightedCarIndex = (leftedCarIndex + 6) % carsCatalogue.length;


    $(".cars .catalogue .car").css("transform", `translateX(${carOutherWidth}px)`);

    setTimeout(() => {
      $(".cars .catalogue .car").css("transition", "none");
      $(".cars .catalogue .car").last().remove();
      $(".cars .catalogue").prepend(element);
      $(".cars .catalogue .car").css("transform", `translateX(0px)`);
      $(".cars .catalogue .car").first().css("opacity", 0);

      setTimeout(() => {
        $(".cars .catalogue .car").css("transition", "all 0.2s ease-in-out");
        $(".cars .catalogue .car").css("opacity", 1);
        setTimeout(() => {
          animating = false;
        }, 500);
      }, 10);
    }, 300);
  }
}

// Update cars catalogue
function updateCarsCatalogue(cars) {
  carsCatalogue = cars;
  catalogue.children().not(".hotkey").remove();

  carIndex = 4;
  let totalCars = carsCatalogue.length;

  for (let i = 0; i < totalCars; i++) {
    let element = `<div data-index="${i}" data-name="${carsCatalogue[i].name}" data-categories="${carsCatalogue[i].categories}" class="car ${i == 4 ? "selected" : ""}">
    <img src="./media/cars/${carsCatalogue[i].img}" alt="">
    </div>`;
    catalogue.append(element);
  }

  if (uiState == "slider" && totalCars < 9) {
    let remainingSpaces = 9 - totalCars;
    let insertedCount = totalCars;
    for (let i = 0; i < remainingSpaces; i++) {
      let nextCarIndex = (totalCars + i) % totalCars;
      let elementClasses = "";
      if (insertedCount === 4) {
        elementClasses = "selected";
      } else if (insertedCount === 8) {
        elementClasses = "";
      }
      let element = `<div data-index="${nextCarIndex}" data-name="${carsCatalogue[nextCarIndex].name}" class="car ${elementClasses}">
      <img src="./media/cars/${carsCatalogue[nextCarIndex].img}" alt="">
      </div>`;

      catalogue.append(element);
      insertedCount++;
    }
  }
}

function updateWallet(value){
  myLix = value;
  $(".wallet .value").text(value);
}

function ShowUI(){
  $('.wrapper').css('opacity', '1');
}

function CloseUI(){
  $('.wrapper').css('opacity', '0');
}



// Cuando el documento este listo, si mide mas de 2450px de width, modificar el placeholder de .search input
$(document).ready(function () {
  if ($(window).width() > 2450) {
    $("input.search").attr("placeholder", "Search car");
  }
});

Events.Subscribe("ShowUI", function() {
  ShowUI();
});

Events.Subscribe("CloseUI", function() {
  CloseUI();
});

Events.Subscribe("MoveLeft", function() {
  moveCars("left");
});

Events.Subscribe("MoveRight", function() {
  moveCars("right");
});

Events.Subscribe("PressedTab", function() {

});

