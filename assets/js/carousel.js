// Carousel Navigation and Animation

var nextBtn = document.querySelector(".next"),
  prevBtn = document.querySelector(".prev"),
  carousel = document.querySelector(".carousel"),
  list = document.querySelector(".list"),
  slides = document.querySelectorAll(".carousel .item"),
  navItems = document.querySelectorAll(".nav-item"),
  runningTime = document.querySelector(".carousel .timeRunning");

let timeRunning = 3000;
let timeAutoNext = 7000;
let currentIndex = 0; // Track active index for updates

// Event handlers for next and previous buttons
nextBtn.onclick = () => showSlider("next");
prevBtn.onclick = () => showSlider("prev");

// Reset time animation
function resetTimeAnimation() {
  runningTime.style.animation = "none";
  runningTime.offsetHeight; // Trigger reflow
  runningTime.style.animation = "runningTime 7s linear 1 forwards";
}

// Show the next or previous slide
function showSlider(type) {
  const totalSlides = slides.length;

  if (type === "next") {
    currentIndex = (currentIndex + 1) % totalSlides;
    list.appendChild(list.firstElementChild);
  } else if (type === "prev") {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    list.prepend(list.lastElementChild);
  }

  updateActiveNav(currentIndex);
  resetTimeAnimation();
  resetAutoNext();
}

// Update active navigation button
function updateActiveNav(index) {
  navItems.forEach((item, i) => {
    item.classList.toggle("active", i === index);
  });
}

// Reset auto-next timeout
function resetAutoNext() {
  clearTimeout(runNextAuto);
  runNextAuto = setTimeout(() => nextBtn.click(), timeAutoNext);
}

// Handle manual navigation by nav-items
navItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    goToItem(index); // Directly navigate to the slide based on index
  });
});

// Start auto-next timer
let runNextAuto = setTimeout(() => nextBtn.click(), timeAutoNext);

// Start the initial animation
resetTimeAnimation();

// Dropdown menu for mobile view
const dropdownBtn = document.getElementById("dropdown-btn");
const dropdownMenu = document.getElementById("dropdown-menu");
const dropdownItems = document.querySelectorAll(".dropdown-item");

// Toggle dropdown visibility
dropdownBtn.addEventListener("click", () => {
  dropdownMenu.classList.toggle("sembunyi");
});

// Handle dropdown item clicks
dropdownItems.forEach((item, index) => {
  item.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent event bubbling
    goToItem(index); // Directly navigate to the selected slide
    dropdownMenu.classList.add("sembunyi"); // Hide the dropdown after selection
  });
});

// Optimized function to go directly to the slide based on index
function goToItem(index) {
  const totalSlides = slides.length;

  // Avoid unnecessary movement if the target is already the current index
  if (currentIndex === index) return;

  // Move slides directly to the target index
  let slidesToMove = index - currentIndex;
  if (slidesToMove > 0) {
    for (let i = 0; i < slidesToMove; i++) {
      list.appendChild(list.firstElementChild); // Move one slide forward
    }
  } else if (slidesToMove < 0) {
    for (let i = 0; i < Math.abs(slidesToMove); i++) {
      list.prepend(list.lastElementChild); // Move one slide backward
    }
  }

  // After moving the target slide to the front, update the current index
  currentIndex = index;
  updateActiveNav(currentIndex); // Update the navigation to reflect the current slide
  resetTimeAnimation(); // Reset the animation to start over
  resetAutoNext(); // Reset auto-next timer to avoid the carousel moving on its own
}
