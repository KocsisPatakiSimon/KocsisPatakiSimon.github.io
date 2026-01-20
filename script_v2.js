const schedule = {
  1: ["Informatika", "CDS biológia", "Matematika", "Filozófia", "Román", "Földrajz"],
  2: ["Angol", "Matematika", "Román", "Magyar", "CDS", "Matematika", "Fizika"],
  3: ["Fizika", "Informatika", "Német", "Matematika", "Kommunista történelem", "Informatika"],
  4: ["Informatika", "Kémia", "Torna", "Angol", "Magyar", "Matematika", "Román"],
  5: ["Magyar", "Biológia", "Fizika", "Történelem", "Matematika", "Református vallás", "Német"]
};

// FIXED lesson slots
const timeSlots = [
  "07:00-07:50",
  "08:00-08:50",
  "09:00-09:50",
  "10:00-10:50",
  "11:10-12:00",
  "12:10-13:00",
  "13:10-14:00"
];

// lesson start minutes
const slotStarts = [
  420, // 7:00
  480, // 8:00
  540, // 9:00
  600, // 10:00
  670, // 11:10
  730, // 12:10
  790  // 13:10
];

function dayStartsAt7(day) {
  return day === 4 || day === 5; // Thursday, Friday
}

function update() {
  const now = new Date();
  let day = now.getDay(); // 1 = Monday
  if (day === 0) day = 1;

  const minsNow = now.getHours() * 60 + now.getMinutes();

  // after school → tomorrow
  if (minsNow >= 840) {
    day++;
    if (day > 5) day = 1;
    showDay(day, 0);
    return;
  }

  const startIndex = dayStartsAt7(day) ? 0 : 1;
  let currentIndex = -1;

  for (let i = startIndex; i < slotStarts.length; i++) {
    if (minsNow >= slotStarts[i] && minsNow < slotStarts[i] + 50) {
      currentIndex = i - startIndex;
      break;
    }
  }

  showDay(day, currentIndex + 1);
}

function showDay(day, lessonIndex) {
  const lessons = schedule[day];
  const startIndex = dayStartsAt7(day) ? 0 : 1;

  const next = lessons[lessonIndex] ?? lessons[0];
  const after = lessons[lessonIndex + 1] ?? "–";

  document.getElementById("nextClass").textContent = next;
  document.getElementById("nextTime").textContent =
    timeSlots[startIndex + lessonIndex] ?? "–";

  document.getElementById("afterClass").textContent = after;
  document.getElementById("afterTime").textContent =
    timeSlots[startIndex + lessonIndex + 1] ?? "–";

  document.getElementById("progress").textContent =
    `${Math.max(lessonIndex, 0)}/${lessons.length} óra kész`;
}

update();
setInterval(update, 60000);
