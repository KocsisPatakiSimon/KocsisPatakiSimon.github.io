// ====== DAY NAMES (HU) ======
const dayNames = {
  1: "Hétfő",
  2: "Kedd",
  3: "Szerda",
  4: "Csütörtök",
  5: "Péntek"
};

// ====== DAILY SCHEDULE ======
const schedule = {
  1: [
    { subject: "Matematika", start: 420, end: 470 },
    { subject: "Fizika", start: 480, end: 530 },
    { subject: "Informatika", start: 540, end: 590 },
    { subject: "Történelem", start: 600, end: 650 },
    { subject: "Torna", start: 670, end: 720 },
    { subject: "Angol", start: 730, end: 780 },
    { subject: "Biológia", start: 790, end: 840 }
  ],
  2: [
    { subject: "Magyar", start: 420, end: 470 },
    { subject: "Matematika", start: 480, end: 530 },
    { subject: "Fizika", start: 540, end: 590 },
    { subject: "Angol", start: 600, end: 650 },
    { subject: "Torna", start: 670, end: 720 },
    { subject: "Kémia", start: 730, end: 780 }
  ],
  3: [
    { subject: "Biológia", start: 420, end: 470 },
    { subject: "Magyar", start: 480, end: 530 },
    { subject: "Matematika", start: 540, end: 590 },
    { subject: "Informatika", start: 600, end: 650 },
    { subject: "Angol", start: 670, end: 720 },
    { subject: "Történelem", start: 730, end: 780 }
  ],
  4: [
    { subject: "Matematika", start: 420, end: 470 },
    { subject: "Fizika", start: 480, end: 530 },
    { subject: "Kémia", start: 540, end: 590 },
    { subject: "Magyar", start: 600, end: 650 },
    { subject: "Torna", start: 670, end: 720 },
    { subject: "Angol", start: 730, end: 780 },
    { subject: "Informatika", start: 790, end: 840 }
  ],
  5: [
    { subject: "Magyar", start: 420, end: 470 },
    { subject: "Történelem", start: 480, end: 530 },
    { subject: "Matematika", start: 540, end: 590 },
    { subject: "Angol", start: 600, end: 650 },
    { subject: "Torna", start: 670, end: 720 },
    { subject: "Osztályfőnöki", start: 730, end: 780 }
  ]
};

// ====== HELPERS ======
function minutesNow() {
  const d = new Date();
  return d.getHours() * 60 + d.getMinutes();
}

function getNextSchoolDay(day) {
  let next = day + 1;
  if (next === 6 || next === 7) return 1;
  return next;
}

function isDayFinished(periods, now) {
  return now > periods[periods.length - 1].end;
}

// ====== MAIN ======
function render() {
  const now = minutesNow();
  let day = new Date().getDay(); // 0–6

  // weekend → Monday
  if (day === 0 || day === 6) day = 1;

  let periods = schedule[day];

  // after last class → next day
  if (isDayFinished(periods, now)) {
    day = getNextSchoolDay(day);
    periods = schedule[day];
  }

  // Title
  document.getElementById("day").innerText = dayNames[day];

  const container = document.getElementById("periods");
  container.innerHTML = "";

  let done = 0;
  let activeFound = false;

  periods.forEach((p) => {
    const div = document.createElement("div");
    div.classList.add("period");

    if (now >= p.start && now <= p.end) {
      div.classList.add("active"); // green, bigger
      activeFound = true;
    } else if (!activeFound && now < p.start) {
      div.classList.add("next"); // yellow
      activeFound = true;
    } else if (now > p.end) {
      div.classList.add("done"); // grey
      done++;
    } else {
      div.classList.add("future"); // red
    }

    div.innerText = p.subject;
    container.appendChild(div);
  });

  document.getElementById("counter").innerText =
    `${done}/${periods.length}`;
}

// update every 30s
render();
setInterval(render, 30000);
