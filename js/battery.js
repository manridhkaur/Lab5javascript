/* Variables
-------------------------------------------------- */
// STEP 1a: Grab the first <dd> element for displaying the battery charging status
const chargeStatus = document.querySelector("#battery dd:nth-of-type(1)");
// STEP 1b: Grab the <output> element inside the second <dd> element for displaying the battery charge level
const chargeLevel = document.querySelector("#battery dd:nth-of-type(2) output");
// STEP 1c: Grab the <progress> element inside the second <dd> element for a more graphical representation of the battery's state of charge (SOC)
const chargeMeter = document.querySelector(
  "#battery dd:nth-of-type(2) progress"
);

/* Functions
-------------------------------------------------- */
// STEP 3a: Create the updateBatteryStatus() function
function updateBatteryStatus(battery) {
  console.log(battery);
  // STEP 3b: Update the charging status
  if (battery.charging) {
    chargeStatus.textContent = "Charger Plugged In";
  } else {
    chargeStatus.textContent = "Charger Plugged Out";
  }
  // STEP 3c: Update the charge level
  const batteryPercentage = Math.round(battery.level * 100);
  chargeLevel.textContent = batteryPercentage + "%";
  chargeMeter.value = batteryPercentage;

  // New Step: Fetch and display image from Robohash
  const imageUrl = `https://robohash.org/${batteryPercentage}.png`;
  fetchAndDisplayImage(imageUrl);
}

// New Function: Fetch an image from the URL and display it on the page
function fetchAndDisplayImage(imageUrl) {
  const imageContainer = document.getElementById("image-container");
  const image = new Image();
  image.src = imageUrl;
  image.alt = `Robohash Image for Battery Percentage: ${imageUrl}`;
  image.onload = () => {
    imageContainer.innerHTML = "";
    imageContainer.appendChild(image);
  };
}

// STEP 2a: Using the getBattery() method of the navigator object,
//create a promise to retrieve the battery information
navigator.getBattery().then((battery) => {
  // STEP 2b: See what the battery object contains
  console.log(battery);
  // STEP 3d: Update the battery information when the promise resolves
  updateBatteryStatus(battery);
  // STEP 4a: Event listener for changes to the charging status
  battery.addEventListener("chargingchange", () => {
    updateBatteryStatus(battery);
  });
  // STEP 4b: Event listener for changes to the charge level
  battery.addEventListener("levelchange", () => {
    updateBatteryStatus(battery);
  });
});

/* This script adapted from the excellent code examples found at https://www.w3.org/TR/battery-status/#examples and https://developer.mozilla.org/en-US/docs/Web/API/Battery_Status_API */
