const schedule = {
  1: [ // Hétfő
    "Informatika",
    "CDS biosz",
    "Matematika",
    "Filozófia",
    "Román",
    "Földrajz"
  ],
  2: [ // Kedd
    "Angol",
    "Matematika",
    "Román",
    "Magyar",
    "CDS",
    "Matematika",
    "Fizika"
  ],
  3: [ // Szerda
    "Fizika",
    "Informatika",
    "Német",
    "Matematika",
    "Kommunista történelem",
    "Informatika"
  ],
  4: [ // Csütörtök
    "Informatika",
    "Kémia",
    "Torna",
    "Angol",
    "Magyar",
    "Matematika",
    "Román"
  ],
  5: [ // Péntek
    "Magyar",
    "Biológia",
    "Fizika",
    "Történelem",
    "Matematika",
    "Református vallás",
    "Német"
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
