let week = [
  {
    dayName: "monday",
    data: [],
  },
  {
    dayName: "tuesday",
    data: [],
  },
  {
    dayName: "wednesday",
    data: [],
  },
  {
    dayName: "thursday",
    data: [],
  },
  {
    dayName: "friday",
    data: [],
  },
  {
    dayName: "saturday",
    data: [],
  },
  {
    dayName: "sunday",
    data: [],
  },
];

if (localStorage.getItem("weekInfo") !== null) {
  showContent();
} else {
  localStorage.setItem("weekInfo", JSON.stringify(week));
}

const openBtn = document.querySelectorAll(".open-btn");
openInput(openBtn);

const addBtn = document.querySelector(".add-btn");
addBtn.onclick = addTask;

function showContent() {
  const dayList = document.querySelectorAll(".day-list");
  const data = JSON.parse(localStorage.getItem("weekInfo"));

  dayList.forEach((item, index) => {
    const day = data[index].data;
    let list = "";

    for (let i = 0; i < day.length; i++) {
      let status = "";
      if (day[i].status === "done") {
        status = "checked";
      }

      list += `<li class="day__item ${day[i].priority} ${day[i].status}" id=${i}>${day[i].content}
                    <label>
                    <input class="checkbox" type="checkbox" ${status} onchange="changeCheckbox(this, ${index}, ${i})">
                        <span class="check-style"></span>
                    </label>
                    <span class="list-span" onclick="deleteTask(${index}, ${i})"></span>
                </li>`;
    }

    item.innerHTML += list;
  });
}

function openInput(btn) {
  btn.forEach((item) => {
    item.onclick = () => {
      const listWrapper = document.querySelector(".list__wrapper");
      const daysWrapper = document.querySelector(".wrapper__inner");
      listWrapper.classList.toggle("show");
      daysWrapper.classList.toggle("disabled");

      const parentElementOfBtn = item.parentElement;
      const parentElementOfLi = parentElementOfBtn.parentElement;
      parentElementOfLi.classList.add("current-day");

      let dayName;
      dayName = parentElementOfLi.id;
      listWrapper.firstElementChild.textContent = dayName;
    };
  });

  const priorityBtn = document.querySelector(".priority");
  priorityBtn.onclick = () => {
    priorityBtn.classList.toggle("important");
    if (priorityBtn.textContent === "Default") {
      priorityBtn.textContent = "Important";
    } else {
      priorityBtn.textContent = "Default";
    }
  };

  const listHide = document.querySelector(".list__hide");
  listHide.onclick = closeInput;
}

function closeInput() {
  const listWrapper = document.querySelector(".list__wrapper");
  const daysWrapper = document.querySelector(".wrapper__inner");
  listWrapper.classList.toggle("show");
  daysWrapper.classList.toggle("disabled");

  const day = document.querySelectorAll(".day");
  day.forEach((item) => {
    item.classList.remove("current-day");
  });

  const priorityBtn = document.querySelector(".priority");
  priorityBtn.classList.remove("important");
  priorityBtn.textContent = "Default";

  const listBtn = document.querySelector(".list__btn");
  listBtn.classList.remove("click");

  const input = document.querySelector(".list__input");
  input.value = "";
}

function addTask() {
  const data = JSON.parse(localStorage.getItem("weekInfo"));
  if (data !== null) {
    week = data;
  }

  const dayItems = document.querySelectorAll(".day");
  let index;
  dayItems.forEach((item, indexOfEL) => {
    if (item.classList.contains("current-day")) {
      index = indexOfEL;
    }
  });

  const priorityBtn = document.querySelector(".priority");
  let priority;
  if (priorityBtn.classList.contains("important")) {
    priority = "high";
  } else {
    priority = "default";
  }

  const input = document.querySelector(".list__input");
  checkInput(input);
  week[index].data.push({
    id: week[index].data.length,
    status: "not-done",
    priority: priority,
    content: `${input.value}`,
  });
  input.value = "";

  localStorage.setItem("weekInfo", JSON.stringify(week));
  showTasksOfDay(index);
}

function showTasksOfDay(indexOfDay) {
  const dayList = document.querySelectorAll(".day-list");
  const data = JSON.parse(localStorage.getItem("weekInfo"));
  const day = data[indexOfDay].data;
  dayList[indexOfDay].innerHTML = "";
  let list = "";

  for (let i = 0; i < day.length; i++) {
    let status = "";
    if (day[i].status === "done") {
      status = "checked";
    }

    list += `<li class="day__item ${day[i].priority} ${day[i].status}" id=${i}>${day[i].content}
            <label>
                <input class="checkbox" type="checkbox" ${status} onchange="changeCheckbox(this, ${indexOfDay}, ${i})">
                    <span class="check-style"></span>
            </label>
            <span class="list-span" onclick="deleteTask(${indexOfDay}, ${i})"></span>
         </li>`;

    dayList[indexOfDay].innerHTML += list;
  }
  dayList[indexOfDay].innerHTML = list;
}

function deleteTask(indexOfDay, indexOfTask) {
  let data = JSON.parse(localStorage.getItem("weekInfo"));

  if (data !== null) {
    week = data;
  }

  week[indexOfDay].data.splice(indexOfTask, 1);
  localStorage.setItem("weekInfo", JSON.stringify(week));

  showTasksOfDay(indexOfDay);
}

function checkInput(input) {
  if (input.value.trim() === "") {
    const listWarning = document.querySelector(".list__warning");
    listWarning.classList.add("show");

    function removeShow() {
      listWarning.classList.remove("show");
    }
    setTimeout(removeShow, 3500);
    input.preventDefault();
  }
}

function changeCheckbox(checkbox, indexOfDay, indexOfTask) {
  const data = JSON.parse(localStorage.getItem("weekInfo"));
  if (data !== null) {
    week = data;
  }

  if (week[indexOfDay].data[indexOfTask].status === "not-done") {
    week[indexOfDay].data[indexOfTask].status = "done";
  } else {
    week[indexOfDay].data[indexOfTask].status = "not-done";
  }

  localStorage.setItem("weekInfo", JSON.stringify(week));
  showTasksOfDay(indexOfDay);
}

function cleanCurrentDay(trash, indexOfDay) {
  let data = JSON.parse(localStorage.getItem("weekInfo"));

  if (data !== null) {
    week = data;
  }

  while (week[indexOfDay].data.length > 0) {
    week[indexOfDay].data.pop();
  }

  localStorage.setItem("weekInfo", JSON.stringify(week));

  showTasksOfDay(indexOfDay);
}
