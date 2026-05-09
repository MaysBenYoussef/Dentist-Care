const header = document.querySelector(".calendar h3");
const dates = document.querySelector(".dates");
const navs = document.querySelectorAll("#prev, #next");
const clockBox = document.getElementById("clock");
const timeInput = document.getElementById("timeInput");
const confirmBtn = document.getElementById("confirmer");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let date = new Date();
let month = date.getMonth();
let year = date.getFullYear();
let selectedDateGlobal = null;

function renderCalendar() {
  const start = new Date(year, month, 1).getDay();
  const endDate = new Date(year, month + 1, 0).getDate();
  const end = new Date(year, month, endDate).getDay();
  const endDatePrev = new Date(year, month, 0).getDate();

  let datesHtml = "";

  for (let i = start; i > 0; i--) {
    datesHtml += "<li class='inactive'>" + (endDatePrev - i + 1) + "</li>";
  }

  for (let i = 1; i <= endDate; i++) {
    let className =
      i === date.getDate() &&
      month === new Date().getMonth() &&
      year === new Date().getFullYear()
        ? ' class="today"'
        : "";
    datesHtml += "<li" + className + ">" + i + "</li>";
  }

  for (let i = end; i < 6; i++) {
    datesHtml += '<li class="inactive">' + (i - end + 1) + "</li>";
  }

  dates.innerHTML = datesHtml;
  header.textContent = months[month] + " " + year;

  const allDates = dates.querySelectorAll("li:not(.inactive)");
  allDates.forEach((dateEl) => {
    dateEl.addEventListener("click", () => {
      const selectedDay = parseInt(dateEl.textContent.trim(), 10);
      const selectedDate = new Date(year, month, selectedDay);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selectedClean = new Date(selectedDate);
      selectedClean.setHours(0, 0, 0, 0);

      if (selectedClean < today) {
        alert(
          "Erreur : Vous ne pouvez pas sélectionner une date antérieure à aujourd'hui."
        );
        return;
      }
      selectedDateGlobal = selectedDate;
      dates.querySelectorAll("li").forEach((li) => {
        li.classList.remove("selected");
      });
      dateEl.classList.add("selected");
      clockBox.style.display = "block";

      console.log("Date sélectionnée :", selectedDateGlobal);
    });
  });
}

navs.forEach((nav) => {
  nav.addEventListener("click", (e) => {
    const btnId = e.target.id;

    if (btnId === "prev" && month === 0) {
      year--;
      month = 11;
    } else if (btnId === "next" && month === 11) {
      year++;
      month = 0;
    } else {
      month = btnId === "next" ? month + 1 : month - 1;
    }

    date = new Date(year, month, new Date().getDate());
    year = date.getFullYear();
    month = date.getMonth();

    renderCalendar();
  });
});

renderCalendar();
confirmBtn.addEventListener("click", () => {
  if (!selectedDateGlobal) {
    alert("Veuillez choisir une date.");
    return;
  }

  if (!timeInput.value) {
    alert("Veuillez choisir une heure.");
    return;
  }

  const y = selectedDateGlobal.getFullYear();
  const m = String(selectedDateGlobal.getMonth() + 1).padStart(2, "0");
  const d = String(selectedDateGlobal.getDate()).padStart(2, "0");
  const dateStr = `${y}-${m}-${d}`;
  const timeStr = timeInput.value;

  const url = `login2.html?date=${encodeURIComponent(
    dateStr
  )}&time=${encodeURIComponent(timeStr)}`;

  console.log("Redirection vers :", url);
  window.location.href = url;
});
