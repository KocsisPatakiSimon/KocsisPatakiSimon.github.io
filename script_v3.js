const days = [
  "VASÁRNAP",
  "HÉTFŐ",
  "KEDD",
  "SZERDA",
  "CSÜTÖRTÖK",
  "PÉNTEK"
];

const schedule = {
  1: ["Informatika", "CDS biológia", "Matematika", "Filozófia", "Román", "Földrajz"],
  2: ["Angol", "Matematika", "Román", "Magyar", "CDS", "Matematika", "Fizika"],
  3: ["Fizika", "Informatika", "Német", "Matematika", "Kommunista történelem", "Informatika"],
  4: ["Informatika", "Kémia", "Torna", "Angol", "Magyar", "Matematika", "Román"],
  5: ["Magyar", "Biológia", "Fizika", "Történelem", "Matematika", "Református vallás", "Német"]
};

const slotStarts = [420, 480, 540, 600, 670, 730, 790];
const slotEnds   = [470, 530, 590, 650, 720, 780, 840];

function startsAt7(day) {
  return day === 4 || day === 5; // csütörtök, péntek
}

function update() {
  const now = new Date();
  let day = now.getDay();
  if (day === 0) day = 1;

  const minutes = now.getHours() * 60 + now.getMinutes();

  // iskola után → holnap
  if (minutes >= 840) {
    day++;
    if (day > 5) day = 1;
  }

  document.getElementById("dayName").textContent = days[day];

  const lessons = schedule[day];
  const offset = startsAt7(day) ? 0 : 1;

  let active = -1;
  let breakNow = false;

  for (let i = offset; i < slotStarts.length; i++) {
    if (minutes >= slotStarts[i] && minutes < slotEnds[i]) {
      active = i - offset;
    }
  }

  // nagyszünet
  if (minutes >= 650 && minutes < 670) breakNow = true;

  const container = document.getElementById("periods");
  container.innerHTML = "";

  lessons.forEach((lesson, i) => {
    const div = document.createElement("div");
    div.classList.add("period");
    div.textContent = lesson;

    if (breakNow) {
      if (i === active + 1) div.classList.add("next");
      else if (i <= active) div.classList.add("done");
      else div.classList.add("future");
    } else {
      if (i < active) div.classList.add("done");
      else if (i === active) div.classList.add("active");
      else if (i === active + 1) div.classList.add("next");
      else div.classList.add("future");
    }

    container.appendChild(div);
  });

  document.getElementById("counter").textContent =
    `${Math.max(active, 0)}/${lessons.length}`;
}

update();
setInterval(update, 60000);
