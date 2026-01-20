const schedule = {
  1: ["Informatika", "CDS biológia", "Matematika", "Filozófia", "Román", "Földrajz"],
  2: ["Angol", "Matematika", "Román", "Magyar", "CDS", "Matematika", "Fizika"],
  3: ["Fizika", "Informatika", "Német", "Matematika", "Kommunista történelem", "Informatika"],
  4: ["Informatika", "Kémia", "Torna", "Angol", "Magyar", "Matematika", "Román"],
  5: ["Magyar", "Biológia", "Fizika", "Történelem", "Matematika", "Református vallás", "Német"]
};

function getStartHour(day) {
  return (day === 4 || day === 5) ? 7 : 8;
}

function buildTimes(startHour, count) {
  let times = [];
  let h = startHour;
  let m = 0;

  for (let i = 0; i < count; i++) {
    let start = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;

    m += 50;
    if (m >= 60) {
      h++;
      m -= 60;
    }

    // nagyszünet
    if (h === 10 && m === 50) {
      m = 10;
      h = 11;
    }

    let end = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
    times.push(`${start}-${end}`);
  }
  return times;
}

function update() {
  const now = new Date();
  let day = now.getDay();
  let hour = now.getHours();
  let min = now.getMinutes();

  if (day === 0) day = 1;

  // 14:00 után -> holnap
  if (hour >= 14) {
    day++;
    if (day > 5) day = 1;

    const startHour = getStartHour(day);
    const lessons = schedule[day];
    const times = buildTimes(startHour, lessons.length);

    document.getElementById("nextClass").textContent = lessons[0];
    document.getElementById("nextTime").textContent = times[0];
    document.getElementById("afterClass").textContent = lessons[1] ?? "–";
    document.getElementById("afterTime").textContent = times[1] ?? "–";
    document.getElementById("progress").textContent = `0/${lessons.length} óra kész`;
    return;
  }

  const startHour = getStartHour(day);
  const lessons = schedule[day];
  const times = buildTimes(startHour, lessons.length);

  const minutesNow = hour * 60 + min;
  let currentIndex = -1;
  let cursor = startHour * 60;

  for (let i = 0; i < lessons.length; i++) {
    let start = cursor;
    let end = cursor + 50;

    if (cursor === 650) cursor = 670;

    if (minutesNow >= start && minutesNow < end) {
      currentIndex = i;
      break;
    }
    cursor = end;
  }

  document.getElementById("nextClass").textContent =
    lessons[currentIndex + 1] ?? lessons[0];
  document.getElementById("nextTime").textContent =
    times[currentIndex + 1] ?? times[0];

  document.getElementById("afterClass").textContent =
    lessons[currentIndex + 2] ?? "–";
  document.getElementById("afterTime").textContent =
    times[currentIndex + 2] ?? "–";

  document.getElementById("progress").textContent =
    `${currentIndex + 1}/${lessons.length} óra kész`;
}

update();
setInterval(update, 60000);
