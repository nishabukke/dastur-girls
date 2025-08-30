let tl = gsap.timeline();

tl.from(".banner-heading h1", {
    y: 60,
    opacity: 0,
    duration: 1.5,
    ease: "powe2.out"
},"-=0.4");


const holidays = [
    {
      hdate: "01-01-2025",
      holiday: "New Year Day",
    },
    {
      hdate: "15-01-2025",
      holiday: "Pongal",
    },
    {
      hdate: "16-01-2025",
      holiday: "Thiruvalluvar Day",
    },
    {
      hdate: "17-01-2025",
      holiday: "Uzhavar Thirunal",
    },
    {
      hdate: "26-01-2025",
      holiday: "Republic Day",
    },
    {
      hdate: "05-02-2025",
      holiday: "Thai Poosam",
    },
    {
      hdate: "22-03-2025",
      holiday: "Telugu New Year Day",
    },
    {
      hdate: "01-04-2025",
      holiday: "Annual closing of Accounts for Commercial Banks and Co-operative Banks",
    },
    {
      hdate: "04-04-2025",
      holiday: "Mahaveer Jayanthi",
    },
    {
      hdate: "07-04-2025",
      holiday: "Good Friday",
    },
    {
      hdate: "14-04-2025",
      holiday: "Tamil New Years Day and Dr.B.R.Ambedkars Birthday",
    },
    {
      hdate: "22-04-2025",
      holiday: "Ramzan (Idul Fitr)",
    },
    {
      hdate: "01-05-2025",
      holiday: "May Day",
    },
    {
      hdate: "29-06-2025",
      holiday: "Bakrid(Idul Azha)",
    },
    {
      hdate: "06-07-2025",
      holiday: "Muharram",
    },
    {
      hdate: "15-08-2025",
      holiday: "Independence Day",
    },
    {
      hdate: "06-09-2025",
      holiday: "Krishna Jayanthi",
    },
    {
      hdate: "17-09-2025",
      holiday: "Vinayakar Chathurthi",
    },
    {
      hdate: "28-09-2025",
      holiday: "Milad-un-Nabi",
    },
    {
      hdate: "02-10-2025",
      holiday: "Gandhi Jayanthi",
    },
    {
      hdate: "23-10-2025",
      holiday: "Ayutha Pooja",
    },
    {
      hdate: "24-10-2025",
      holiday: "Vijaya Dasami",
    },
    {
      hdate: "12-11-2025",
      holiday: "Deepavali",
    },
    {
      hdate: "25-12-2025",
      holiday: "Christmas",
    },
  ];
  const calendar = document.querySelector("#calendar");
  const monthBanner = document.querySelector("#month");
  let navigation = 0;
  let clicked = null;
  let events = localStorage.getItem("events") ? JSON.parse(localStorage.getItem("events")) : [];
  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  function loadCalendar() {
    const dt = new Date();
  
    if (navigation != 0) {
      dt.setMonth(new Date().getMonth() + navigation);
    }
    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();
    monthBanner.innerText = `${dt.toLocaleDateString("en-us", {
      month: "long",
    })} ${year}`;
    calendar.innerHTML = "";
    const dayInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayofMonth = new Date(year, month, 1);
    const dateText = firstDayofMonth.toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  
    const dayString = dateText.split(", ")[0];
    const emptyDays = weekdays.indexOf(dayString);
  
    for (let i = 1; i <= dayInMonth + emptyDays; i++) {
      const dayBox = document.createElement("div");
      dayBox.classList.add("day");
      const monthVal = month + 1 < 10 ? "0" + (month + 1) : month + 1;
      const dateVal = i - emptyDays < 10 ? "0" + (i - emptyDays) : i - emptyDays;
      const dateText = `${dateVal}-${monthVal}-${year}`;
      if (i > emptyDays) {
        dayBox.innerText = i - emptyDays;
        //Event Day
        const eventOfTheDay = events.find((e) => e.date == dateText);
        //Holiday
        const holidayOfTheDay = holidays.find((e) => e.hdate == dateText);
  
        if (i - emptyDays === day && navigation == 0) {
          dayBox.id = "currentDay";
        }
  
        if (eventOfTheDay) {
          const eventDiv = document.createElement("div");
          eventDiv.classList.add("event");
          eventDiv.innerText = eventOfTheDay.title;
          dayBox.appendChild(eventDiv);
        }
        if (holidayOfTheDay) {
          const eventDiv = document.createElement("div");
          eventDiv.classList.add("event");
          eventDiv.classList.add("holiday");
          eventDiv.innerText = holidayOfTheDay.holiday;
          dayBox.appendChild(eventDiv);
        }
  
        dayBox.addEventListener("click", () => {
          showModal(dateText);
        });
      } else {
        dayBox.classList.add("plain");
      }
      calendar.append(dayBox);
    }
  }
  function buttons() {
    const btnBack = document.querySelector("#btnBack");
    const btnNext = document.querySelector("#btnNext");
    const btnDelete = document.querySelector("#btnDelete");
    const btnSave = document.querySelector("#btnSave");
    const closeButtons = document.querySelectorAll(".btnClose");
    const txtTitle = document.querySelector("#txtTitle");
  
    btnBack.addEventListener("click", () => {
      navigation--;
      loadCalendar();
    });
    btnNext.addEventListener("click", () => {
      navigation++;
      loadCalendar();
    });
    modal.addEventListener("click", closeModal);
    closeButtons.forEach((btn) => {
      btn.addEventListener("click", closeModal);
    });
    btnDelete.addEventListener("click", function () {
      events = events.filter((e) => e.date !== clicked);
      localStorage.setItem("events", JSON.stringify(events));
      closeModal();
    });
  
    btnSave.addEventListener("click", function () {
      if (txtTitle.value) {
        txtTitle.classList.remove("error");
        events.push({
          date: clicked,
          title: txtTitle.value.trim(),
        });
        txtTitle.value = "";
        localStorage.setItem("events", JSON.stringify(events));
        closeModal();
      } else {
        txtTitle.classList.add("error");
      }
    });
  }
  
  const modal = document.querySelector("#modal");
  const viewEventForm = document.querySelector("#viewEvent");
  const addEventForm = document.querySelector("#addEvent");
  
function showModal(dateText) {
  clicked = dateText;
  const eventOfTheDay = events.find((e) => e.date == dateText);
  const holidayOfTheDay = holidays.find((e) => e.hdate == dateText); // ✅ Check holiday

  // Update the event list
  const eventList = document.querySelector("#eventList");
  eventList.innerHTML = ""; // Clear previous list items

  const listItem = document.createElement("li");

  if (eventOfTheDay) {
    // Show view modal
    document.querySelector("#eventText").innerText = eventOfTheDay.title;
    viewEventForm.style.display = "block";

    // Show event in sidebar
    listItem.innerHTML = `<span>${dateText}</span> ${eventOfTheDay.title}`;
  } else if (holidayOfTheDay) {
    // No view modal needed, just show in sidebar
    addEventForm.style.display = "none";
    viewEventForm.style.display = "none";

    listItem.innerHTML = `<span>${dateText}</span> ${holidayOfTheDay.holiday}`;
  } else {
    // Show add modal if no event/holiday
    addEventForm.style.display = "block";

    // Still show the date in sidebar, but no event
    listItem.innerHTML = `<span>${dateText}</span> No events`;
  }

  eventList.appendChild(listItem);
  modal.style.display = "block";
}
  
  //Close Modal
 function closeModal() {
  viewEventForm.style.display = "none";
  addEventForm.style.display = "none";
  modal.style.display = "none";
  clicked = null;
  loadCalendar();

  // Optional: Clear the event list if nothing selected
  const eventList = document.querySelector("#eventList");
  eventList.innerHTML = `<li><span>Date</span> No events</li>`;
}

  buttons();
  loadCalendar();





  // Lightbox modalGallery
const body = document.body;
const items = document.querySelectorAll(".gallery__item");
const modalGallery = document.createElement("section");
const modalImg = document.createElement("img");
const modalPrev = createButton(prevItem);
const modalNext = createButton(nextItem);
const modalClose = createButton(closeModal);
let currentItem = 0;

modalGallery.classList.add("gallery__modal");
modalPrev.classList.add("gallery__navigation--prev");
modalNext.classList.add("gallery__navigation--next");
modalClose.classList.add("gallery__navigation--close");

function createButton(action) {
    const button = document.createElement("button");
    button.addEventListener("click", action);
    return button;
}

function prevItem() {
    currentItem = (currentItem - 1 + items.length) % items.length;
    showModal();
}

function nextItem() {
    currentItem = (currentItem + 1) % items.length;
    showModal();
}

function closeModal() {
    modalGallery.remove();
    body.classList.remove('noscroll'); // Ensure scrolling is enabled
}

function showModal() {
    const clickedImage = items[currentItem].querySelector("img");
    modalImg.src = clickedImage.src;
    modalImg.alt = clickedImage.alt;
    modalGallery.innerHTML = ''; // Clear the modalGallery content
    modalGallery.append(modalImg, modalPrev, modalNext, modalClose);
    body.appendChild(modalGallery);
}

// Attach click event to each gallery item
items.forEach((item, index) => {
    item.addEventListener('click', function () {
        currentItem = index; // Set the clicked image index
        showModal();
        body.classList.add('noscroll'); // Disable scrolling when modalGallery is open
    });
});

// Close modalGallery with Escape key
document.body.addEventListener('keyup', (ev) => {
    if (ev.key === "Escape" && body.contains(modalGallery)) {
        closeModal();
    }
});

// Hover functionality for image captions
items.forEach((item) => {
    const img = item.querySelector("img");
    const caption = item.querySelector(".gallery__image__caption");

    item.addEventListener("mouseenter", () => {
        caption.style.opacity = "1";
    });

    item.addEventListener("mouseleave", () => {
        caption.style.opacity = "0";
    });
});
