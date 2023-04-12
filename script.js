// Initialize the calendar with the current month and year
const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
displayCalendar(currentMonth, currentYear);

// Add event listeners for the navigation buttons and year select
document.getElementById("prevMonth").addEventListener("click", () => {
  if (currentMonth === 0) {
    currentMonth = 11;
    currentYear--;
  } else {
    currentMonth--;
  }

  displayCalendar(currentMonth, currentYear);
});

document.getElementById("nextMonth").addEventListener("click", () => {
  if (currentMonth === 11) {
    currentMonth = 0;
    currentYear++;
  } else {
    currentMonth++;
  }
  displayCalendar(currentMonth, currentYear);
});

document.getElementById("yearSelect").addEventListener("change", () => {
  currentYear = parseInt(document.getElementById("yearSelect").value);
  displayCalendar(currentMonth, currentYear);
});

function displayCalendar(month, year) {
  // Get a reference to the calendar container
  const calendarContainer = document.getElementById("calendar");

  // Clear the calendar container
  calendarContainer.innerHTML = "";

  // const selectedYear = document.getElementById("selected");
  // selectedYear.innerHTML = year;

  // Create a new date object for the first day of the given month and year
  const firstDayOfMonth = new Date(year, month, 1);

  // Get the day of the week for the first day of the month (0 = Sunday, 1 = Monday, etc.)
  const firstDayOfWeek = firstDayOfMonth.getDay();

  // Create a new table element to display the calendar
  const calendarTable = document.createElement("table");
  calendarTable.classList.add("table", "table-bordered");

  // Create the header row for the table
  const headerRow = document.createElement("tr");

  // Create the table headers for the days of the week
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  daysOfWeek.forEach((day) => {
    const headerCell = document.createElement("th");
    headerCell.classList.add("allDay");
    headerCell.textContent = day;
    headerRow.appendChild(headerCell);
  });

  // Add the header row to the table
  calendarTable.appendChild(headerRow);

  // Create a new row for the calendar dates
  let currentRow = document.createElement("tr");
  currentRow.classList.add("cellDesign");

  // Add blank cells for any days before the first day of the month
  for (let i = 0; i < firstDayOfWeek; i++) {
    const cell = document.createElement("td");
    currentRow.appendChild(cell);
  }

  // Add cells for each day of the month
  for (let i = 1; i <= getDaysInMonth(month, year); i++) {
    const cell = document.createElement("td");
    cell.innerHTML = i;

    const currentMonth = document.getElementById("curMonth");
    const allMonth = [
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

    currentMonth.innerHTML = `${allMonth[month]} - ${year}`;

    const selectedYear = document.getElementById("selected");
    selectedYear.textContent = year;

    // Highlight the cell if it is the current day
    if (
      i === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      cell.classList.add("bg-info");
    }

    // Add a click event listener to the cell to display a message when clicked
    cell.addEventListener("click", () => {
      // alert(`You clicked on ${i}/${month + 1}/${year}`);
      let userEvent = prompt(
        `Add your Event on ${i}/${month + 1}/${year}`,
        "Add here !"
      );
      console.log(userEvent);
      if (userEvent && userEvent !== null) {
        cell.innerHTML = `${i}<br><br><div id="eventList">${userEvent}</div> `;
      } else {
        cell.innerHTML = i;
      }
    });

    // Add the cell to the current row
    currentRow.appendChild(cell);

    // If the current row has 7 cells (i.e. one week), add it to the table and create a new row
    if (currentRow.children.length === 7) {
      calendarTable.appendChild(currentRow);
      currentRow = document.createElement("tr");
      currentRow.classList.add("cellDesign");
    }
  }

  // Add blank cells for any remaining days in the last week of the month
  if (currentRow.children.length > 0) {
    for (let i = currentRow.children.length; i < 7; i++) {
      const cell = document.createElement("td");
      currentRow.appendChild(cell);
    }
    calendarTable.appendChild(currentRow);
  }

  // Add the calendar table to the calendar container
  calendarContainer.appendChild(calendarTable);
}

function getDaysInMonth(month, year) {
  const isLeapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  const daysInMonth = [
    31,
    isLeapYear ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];
  return daysInMonth[month];
}
