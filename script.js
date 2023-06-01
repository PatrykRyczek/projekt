var stars = [];
var constellations = [];
var constellationsDescriptions = {};

function addStar() {
  var starName = document.getElementById("starName").value;
  var constellation = document.getElementById("constellation").value;
  var brightness = document.getElementById("brightness").value;
  var shines = document.getElementById("shines").value;

  if (/\d/.test(starName)) {
    alert("Pole 'Nazwa' nie może zawierać cyfr.");
    return;
  }

  if (/[a-zA-Z]/.test(brightness)) {
    alert("Pole 'Jasność' nie może zawierać liter.");
    return;
  }

  if (shines !== "Tak" && shines !== "Nie") {
    alert("Pole 'shines' może przyjmować tylko wartości 'Tak' lub 'Nie'.");
    return;
  }

  if (
    starName.trim() === "" ||
    brightness.trim() === "" ||
    shines.trim() === ""
  ) {
    alert("Wszystkie pola są wymagane.");
    return;
  }

  var star = {
    name: starName,
    constellation: constellation,
    brightness: brightness,
    shines: shines,
  };

  stars.push(star);

  resetStarForm();
  updateStarList();
}

function addStarToConstellation() {
  var starName = document.getElementById("starName").value;
  var constellation = document.getElementById("constellation").value;

  if (starName && constellation) {
    var star = {
      name: starName,
      constellation: constellation,
      shines: document.querySelector('input[name="shines"]:checked').value,
      brightness: document.getElementById("brightness").value,
    };

    stars.push(star);

    var constellationStars = stars.filter(function (star) {
      return star.constellation === constellation;
    });

    updateStarFormConstellations();
    updateStarList();
    updateConstellationList();

    if (constellationStars.length > 1) {
      var starListItem = document.querySelector(
        "#constellationList li:last-child"
      );
      var removeStarButton = document.createElement("button");
      removeStarButton.textContent = "Usuń gwiazdę";
      removeStarButton.addEventListener("click", function () {
        removeStarFromConstellation(star);
      });
      starListItem.appendChild(removeStarButton);
    }
  }
}

function addConstellation() {
  var constellationName = document.getElementById("constellationName").value;
  var constellationDescription = document.getElementById(
    "constellationDescription"
  ).value;

  constellations.push(constellationName);
  constellationsDescriptions[constellationName] = constellationDescription;

  resetConstellationForm();
  updateStarFormConstellations();
  updateConstellationList();
}

function resetStarForm() {
  document.getElementById("starName").value = "";
  document.getElementById("constellation").selectedIndex = 0;
  document.getElementById("brightness").value = "";
  document.getElementById("shines").value = "";
}

function resetConstellationForm() {
  document.getElementById("constellationName").value = "";
  document.getElementById("constellationDescription").value = "";
}

function updateStarList() {
  var starList = document.getElementById("starList");
  starList.innerHTML = "";

  stars.forEach(function (star, index) {
    var listItem = document.createElement("li");
    var starInfo = document.createElement("span");
    starInfo.textContent =
      star.name +
      " (Konstelacja: " +
      star.constellation +
      ", Świeci: " +
      (star.shines === "Tak" ? "Tak" : "Nie") +
      ", Jasność: " +
      star.brightness +
      ")";
    listItem.appendChild(starInfo);

    var toggleShinesButton = document.createElement("button");
    toggleShinesButton.textContent = "Zaświeć";
    toggleShinesButton.addEventListener("click", function () {
      toggleShines(index);
    });
    listItem.appendChild(toggleShinesButton);

    starList.appendChild(listItem);
  });
}

function toggleShines(index) {
  stars[index].shines = stars[index].shines === "Tak" ? "Nie" : "Tak";
  updateStarList();
}

function updateStarFormConstellations() {
  var selectElement = document.getElementById("constellation");

  selectElement.innerHTML = "";

  constellations.forEach(function (constellation) {
    var option = document.createElement("option");
    option.value = constellation;
    option.textContent = constellation;
    selectElement.appendChild(option);
  });
}

function removeConstellation(constellation) {
  constellations = constellations.filter(function (item) {
    return item !== constellation;
  });

  // Usuwanie gwiazd z usuniętej konstelacji
  stars = stars.filter(function (star) {
    return star.constellation !== constellation;
  });

  updateStarFormConstellations();
  updateStarList();
  updateConstellationList();
}

function updateConstellationList() {
  var constellationList = document.getElementById("constellationList");
  constellationList.innerHTML = "";

  constellations.forEach(function (constellation) {
    var listItem = document.createElement("li");
    listItem.textContent = constellation;

    var expandButton = document.createElement("button");
    expandButton.textContent = "Rozwiń";
    expandButton.addEventListener("click", function () {
      expandConstellation(constellation);
    });
    listItem.appendChild(expandButton);

    var removeConstellationButton = document.createElement("button");
    removeConstellationButton.textContent = "Usuń konstelację";
    removeConstellationButton.addEventListener("click", function () {
      removeConstellation(constellation);
    });
    listItem.appendChild(removeConstellationButton);

    var constellationStars = stars.filter(function (star) {
      return star.constellation === constellation;
    });

    constellationStars.forEach(function (star) {
      var removeStarButton = document.createElement("button");
      removeStarButton.textContent = "Usuń gwiazdę";
      removeStarButton.addEventListener("click", function () {
        removeStarFromConstellation(star);
      });
      listItem.appendChild(removeStarButton);
    });

    constellationList.appendChild(listItem);
  });
}

function editStar(index) {
  var star = stars[index];
  document.getElementById("starName").value = star.name;
  document.getElementById("constellation").value = star.constellation;
  document.getElementById("brightness").value = star.brightness;
  document.getElementById("shines").value = star.shines;

  stars.splice(index, 1);
  updateStarList();
}

function removeStar(index) {
  stars.splice(index, 1);
  updateStarList();
}

function expandConstellation(constellation) {
  var constellationList = document.getElementById("constellationList");
  var constellationItems = constellationList.getElementsByTagName("li");

  for (var i = 0; i < constellationItems.length; i++) {
    var item = constellationItems[i];

    if (item.textContent === constellation) {
      var starList = document.createElement("ul");
      starList.classList.add("star-list");

      var constellationStars = stars.filter(function (star) {
        return star.constellation === constellation;
      });

      constellationStars.forEach(function (star) {
        var starItem = document.createElement("li");
        starItem.textContent = star.name;

        var removeStarButton = document.createElement("button");
        removeStarButton.textContent = "Usuń gwiazdę";
        removeStarButton.addEventListener("click", function () {
          removeStarFromConstellation(star);
        });
        starItem.appendChild(removeStarButton);

        starList.appendChild(starItem);
      });

      item.appendChild(starList);
    }
  }
}

function generateSky() {
  var cloudiness = document.getElementById("cloudiness").value;
  var moonPhase = document.getElementById("moonPhase").value;
  var precipitation = document.getElementById("precipitation").value;
  var fogDensity = document.getElementById("fogDensity").value;

  if (
    cloudiness.trim() === "" ||
    moonPhase.trim() === "" ||
    precipitation.trim() === "" ||
    fogDensity.trim() === ""
  ) {
    alert("Wszystkie pola są wymagane.");
    return;
  }
  // Sprawdzenie czy poziom zachmurzenia jest równy 0, jeśli tak, ustawiamy rodzaj opadów na "Brak"
  if (cloudiness == 0 && precipitation !== "Brak") {
    alert(
      "Nie można wybrać rodzaju opadów innego niż 'Brak', jeśli poziom zachmurzenia wynosi 0."
    );
    return;
  }

  var resultText =
    "Dzisiaj " +
    new Date().toLocaleDateString() +
    " " +
    (cloudiness == 0
      ? "brak zachmurzenia. "
      : "zachmurzenie wynosi " + cloudiness + ". ") +
    (precipitation === "Brak"
      ? "W dniu dzisiejszym nie występują żadne opady atmosferyczne. "
      : "Występują " + precipitation + " opady. ") +
    (fogDensity == 0
      ? "W dniu dzisiejszym nie występuje mgła. "
      : "Gęstość mgły wynosi " + fogDensity + ". ") +
    "Wybrana faza Księżyca to " +
    moonPhase +
    ". ";

  var starsWithShines = stars.filter(function (star) {
    return star.shines === "Tak";
  });

  if (starsWithShines.length > 0) {
    resultText += "Wszystkie gwiazdy, które świecą to: ";

    for (var i = 0; i < starsWithShines.length; i++) {
      resultText += starsWithShines[i].name;
      if (i !== starsWithShines.length - 1) {
        resultText += ", ";
      }
    }
  } else {
    resultText += "Żadna gwiazda nie świeci w dzisiejszym dniu.";
  }

  document.getElementById("result").innerText = resultText;
}

window.onload = function () {
  updateStarFormConstellations();
  updateConstellationList();
};
