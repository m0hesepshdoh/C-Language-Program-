const MINIMUM_STOCK_ALERT = 10;
let inventory = {
  strawberryCake: 100,
  chocolateCake: 100,
  pineappleCake: 100,
  vanillaCake: 100
};
window.onload = function() {
  document.getElementById('juiceSelect').value = 'appleJuice';
};

const prices = {
  coffee: 15,
  tea: 10,
  cake: 20,
  appleJuice: 10,
  orangeJuice: 12,
  bananaJuice: 15,
  grapeJuice: 10,
  pineappleCake: 25,
  vanillaCake: 22
};

function incrementValue(id) {
  const input = document.getElementById(id);
  if (id === 'juice' && !document.getElementById('juiceSelect').value) {
    alert('Please select a juice first!');
    return;
  }
  if (id.includes('Cake')) {
    if (inventory[id] <= 0) {
      alert('No more cake in stock!');
      return;
    }
    inventory[id]--;
    updateStockDisplay();
  }
  input.value = (parseInt(input.value) || 0) + 1;
  calculateBill();
}

function decrementValue(id) {
  const input = document.getElementById(id);
  const value = parseInt(input.value) || 0;
  if (value > 0) {
    if (id.includes('Cake')) {
      inventory[id]++;
      updateStockDisplay();
    }
    input.value = value - 1;
    calculateBill();
  }
}

function updateStockDisplay() {
  const strawberryStock = document.getElementById('strawberryStock');
  const chocolateStock = document.getElementById('chocolateStock');
  const pineappleStock = document.getElementById('pineappleStock');
  const vanillaStock = document.getElementById('vanillaStock');

  strawberryStock.textContent = `(${inventory.strawberryCake} left)`;
  chocolateStock.textContent = `(${inventory.chocolateCake} left)`;
  pineappleStock.textContent = `(${inventory.pineappleCake} left)`;
  vanillaStock.textContent = `(${inventory.vanillaCake} left)`;

  strawberryStock.className = inventory.strawberryCake < 10 ? 'low-stock' : '';
  chocolateStock.className = inventory.chocolateCake < 10 ? 'low-stock' : '';
  pineappleStock.className = inventory.pineappleCake < 10 ? 'low-stock' : '';
  vanillaStock.className = inventory.vanillaCake < 10 ? 'low-stock' : '';
}

function calculateBill() {
  const coffee = parseInt(document.getElementById('coffee').value) || 0;
  const tea = parseInt(document.getElementById('tea').value) || 0;
  const strawberryCake = parseInt(document.getElementById('strawberryCake').value) || 0;
  const chocolateCake = parseInt(document.getElementById('chocolateCake').value) || 0;

  let billDetails = '';
  if (coffee > 0) billDetails += `Coffee (${coffee}): ${coffee * prices.coffee} THB<br>`;
  if (tea > 0) billDetails += `Tea (${tea}): ${tea * prices.tea} THB<br>`;
  if (strawberryCake > 0) billDetails += `Strawberry Cake (${strawberryCake}): ${strawberryCake * prices.cake} THB<br>`;
  if (chocolateCake > 0) billDetails += `Chocolate Cake (${chocolateCake}): ${chocolateCake * prices.cake} THB<br>`;
  if (document.getElementById('pineappleCake').value > 0) billDetails += `Pineapple Cake (${document.getElementById('pineappleCake').value}): ${document.getElementById('pineappleCake').value * prices.pineappleCake} THB<br>`;
  if (document.getElementById('vanillaCake').value > 0) billDetails += `Vanilla Cake (${document.getElementById('vanillaCake').value}): ${document.getElementById('vanillaCake').value * prices.vanillaCake} THB<br>`;
  const appleJuice = parseInt(document.getElementById('appleJuice').value) || 0;
  const orangeJuice = parseInt(document.getElementById('orangeJuice').value) || 0;
  const bananaJuice = parseInt(document.getElementById('bananaJuice').value) || 0;
  const grapeJuice = parseInt(document.getElementById('grapeJuice').value) || 0;

  if (appleJuice > 0) billDetails += `Apple Juice (${appleJuice}): ${appleJuice * prices.appleJuice} THB<br>`;
  if (orangeJuice > 0) billDetails += `Orange Juice (${orangeJuice}): ${orangeJuice * prices.orangeJuice} THB<br>`;
  if (bananaJuice > 0) billDetails += `Banana Juice (${bananaJuice}): ${bananaJuice * prices.bananaJuice} THB<br>`;
  if (grapeJuice > 0) billDetails += `Grape Juice (${grapeJuice}): ${grapeJuice * prices.grapeJuice} THB<br>`;

  const pineappleCake = parseInt(document.getElementById('pineappleCake').value) || 0;
  const vanillaCake = parseInt(document.getElementById('vanillaCake').value) || 0;

  const total = (coffee * prices.coffee) +
    (tea * prices.tea) +
    (strawberryCake * prices.cake) +
    (chocolateCake * prices.cake) +
    (pineappleCake * prices.pineappleCake) +
    (vanillaCake * prices.vanillaCake) +
    (appleJuice * prices.appleJuice) +
    (orangeJuice * prices.orangeJuice) +
    (bananaJuice * prices.bananaJuice) +
    (grapeJuice * prices.grapeJuice);

  document.getElementById('billDetails').innerHTML = billDetails || 'No items selected';
  document.getElementById('totalAmount').textContent = total;
}

function resetOrder() {
  if (!confirm('Are you sure you want to reset your order?')) return;
  const inputs = document.querySelectorAll('input[type="number"]');
  inputs.forEach(input => input.value = 0);
  document.getElementById('billDetails').innerHTML = '';
  document.getElementById('totalAmount').textContent = '0';
}

document.getElementById('newOrder').addEventListener('click', resetOrder);