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
let currentIndex = 0;

nextBtn.onclick = () => showSlider("next");
prevBtn.onclick = () => showSlider("prev");

// Reset time animation
function resetTimeAnimation() {
  runningTime.style.animation = "none";
  runningTime.offsetHeight;
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
    goToItem(index);
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

dropdownBtn.addEventListener("click", () => {
  dropdownMenu.classList.toggle("sembunyi");
});

dropdownItems.forEach((item, index) => {
  item.addEventListener("click", (e) => {
    e.stopPropagation();
    goToItem(index)
    dropdownMenu.classList.add("sembunyi");
  });
});


function goToItem(index) {
  const totalSlides = slides.length;
  if (currentIndex === index) return;

  let slidesToMove = index - currentIndex;
  if (slidesToMove > 0) {
    for (let i = 0; i < slidesToMove; i++) {
      list.appendChild(list.firstElementChild);
    }
  } else if (slidesToMove < 0) {
    for (let i = 0; i < Math.abs(slidesToMove); i++) {
      list.prepend(list.lastElementChild);
    }
  }

  currentIndex = index;
  updateActiveNav(currentIndex);
  resetTimeAnimation();
  resetAutoNext();
}
