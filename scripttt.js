const ingredientsData = [
  { name: "Lettuce", image: "images/Lettuce.jpeg", price: 20 },
  { name: "Tomato", image: "images/Tomato.jpeg", price: 20 },
  { name: "Cheese", image: "images/Cheese.jpeg", price: 10 },
  { name: "Onion", image: "images/onion.jpeg", price: 20 },
  { name: "Patty", image: "images/patty.jpeg", price: 30 }
];

const burgerStack = [];
const ingredientCount = {};
let ingredientButtons = [];

const ingredientsContainer = document.getElementById("ingredients");
const burgerStackContainer = document.getElementById("burgerStack");
const totalPriceDisplay = document.getElementById("totalPrice");
const resetBtn = document.getElementById("resetBtn");
const removeLastBtn = document.getElementById("removeLast");
const checklistContainer = document.getElementById("checklist");

// Render Ingredient Buttons
function renderIngredientButtons() {
  ingredientsContainer.innerHTML = "";
  ingredientButtons = [];

  ingredientsData.forEach((ingredient, index) => {
    const btn = document.createElement("button");
    btn.className = `bg-yellow-300 text-black font-semibold px-4 py-2 rounded hover:bg-yellow-400 transition`;
    btn.onclick = () => addIngredient(index);
    ingredientButtons.push({ element: btn, ingredient });
    ingredientsContainer.appendChild(btn);
  });

  updateIngredientButtons();
}

// Add Ingredient
function addIngredient(index) {
  const ingredient = ingredientsData[index];
  burgerStack.push(ingredient);
  ingredientCount[ingredient.name] = (ingredientCount[ingredient.name] || 0) + 1;
  renderBurger();
  updateIngredientButtons();
  updateChecklist();
}

// Render Burger Stack with Images
function renderBurger() {
  burgerStackContainer.innerHTML = "";

  burgerStack.forEach((ingredient) => {
    const img = document.createElement("img");
    img.src = ingredient.image;
    img.alt = ingredient.name;

    // ✅ Add this to catch image load errors
    img.onerror = () => {
      img.alt = "Image not found";
      img.src = ""; // hide broken image icon
      img.style.border = "2px solid red"; // optional: helps you see it's broken
      img.style.padding = "5px";
    };

    img.className = "w-32 h-auto object-contain";
    burgerStackContainer.appendChild(img);
  });

  const total = burgerStack.reduce((sum, ing) => sum + ing.price, 0);
  totalPriceDisplay.textContent = `Total Price: ₹${total}`;
}


// Update Buttons with Count
function updateIngredientButtons() {
  ingredientButtons.forEach(({ element, ingredient }) => {
    const count = ingredientCount[ingredient.name] || 0;
    element.textContent = `Add ${ingredient.name} (${count})`;
  });
}

// Remove Last Ingredient
removeLastBtn.addEventListener("click", () => {
  const removed = burgerStack.pop();
  if (removed) {
    ingredientCount[removed.name]--;
    if (ingredientCount[removed.name] < 0) ingredientCount[removed.name] = 0;
  }
  renderBurger();
  updateIngredientButtons();
  updateChecklist();
});

// Reset
resetBtn.addEventListener("click", () => {
  burgerStack.length = 0;
  Object.keys(ingredientCount).forEach((key) => (ingredientCount[key] = 0));
  renderBurger();
  updateIngredientButtons();
  updateChecklist();
});

// Update Ingredient Checklist
function updateChecklist() {
  checklistContainer.innerHTML = "";
  Object.entries(ingredientCount).forEach(([name, count]) => {
    if (count > 0) {
      const li = document.createElement("li");
      li.textContent = `${name}`;
      checklistContainer.appendChild(li);
    }
  });
}

// Initialize
renderIngredientButtons();
