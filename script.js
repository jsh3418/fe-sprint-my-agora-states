// 상태
let currentPage = 1;

// 상수
const DISCUSSIONS_RENDER_PER_PAGE = 10;

// DOM
const name = document.querySelector(".form__input--name input");
const title = document.querySelector(".form__input--title input");
const story = document.querySelector("#story");
const ul = document.querySelector("ul.discussions__container");
const form = document.querySelector(".form__container > form");

// 이벤트리스너
function prevButtonAddEventListener() {
  const prevButton = document.querySelector("#prev-button");
  prevButton.addEventListener("click", handlePrevButton);
}

function nextButtonAddEventListener() {
  const nextButton = document.querySelector("#next-button");
  nextButton.addEventListener("click", handleNextButton);
}

function pageButtonsAddEventListener() {
  const buttons = document.querySelectorAll(".page-button");
  buttons.forEach((button) => {
    button.addEventListener("click", handlePageButtons);
  });
}

// 이벤트 핸들러 함수
function handlePrevButton() {
  if (currentPage > 1) {
    const buttons = document.querySelectorAll(".page-button");

    currentPage -= 1;
    clearDiscussions();
    render(ul, currentPage);
    buttons.forEach((button) => {
      removeClassList(button, "current-page");
    });
    addClassList(buttons[currentPage - 1], "current-page");
  }
}

function handlePageButtons(event) {
  const pageNumber = event.target.textContent;
  const buttons = document.querySelectorAll(".page-button");
  const clickbutton = event.target;

  currentPage = Number(pageNumber);
  clearDiscussions();
  render(ul, currentPage);
  buttons.forEach((button) => {
    removeClassList(button, "current-page");
  });
  addClassList(clickbutton, "current-page");
}

function handleNextButton() {
  const pageCount = calculatePageCount();
  if (currentPage !== pageCount) {
    const buttons = document.querySelectorAll(".page-button");

    currentPage += 1;
    clearDiscussions();
    render(ul, currentPage);
    buttons.forEach((button) => {
      removeClassList(button, "current-page");
    });
    addClassList(buttons[currentPage - 1], "current-page");
  }
}

function handleSubmitButton(event) {
  event.preventDefault();
  if (name.value === "" || title.value === "" || story.value === "") return;
  addDiscussion();
  clearInput(name, title, story);
  initCurrentPage();
  clearDiscussions();
  render(ul, currentPage);
  setLocalStorage(agoraStatesDiscussions);
}

// 유틸 함수
function addClassList(element, className) {
  element.classList.add(className);
}

function removeClassList(element, className) {
  element.classList.remove(className);
}

function clearInput(...inputs) {
  inputs.forEach((input) => {
    input.value = "";
  });
}

// 로컬스토리지 함수
function setLocalStorage(data) {
  localStorage.setItem("discussions", JSON.stringify(data));
}

function getLocalStorage(keyName) {
  return JSON.parse(localStorage.getItem(keyName));
}

function isExistLocalStorage(keyName) {
  return Boolean(localStorage.getItem(keyName));
}

const convertToDiscussion = (obj) => {
  if (obj === undefined) return "";

  const li = document.createElement("li");
  li.className = "discussion__container";

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  // 아바타 이미지 요소 만들어 넣는 코드
  const img = document.createElement("img");
  img.className = "discussion__avatar--image";
  img.src = `${obj.avatarUrl}`;
  img.alt = "이미지를 불러오지 못했습니다.";

  avatarWrapper.append(img);

  // 디스커션 제목
  const h2 = document.createElement("h2");
  h2.className = "discussion__title";

  // 디스커션 제목의 a태그
  const a = document.createElement("a");
  a.textContent = obj.title;
  a.href = obj.url;
  h2.append(a);
  discussionContent.append(h2);

  // 디스커션의 information
  const div = document.createElement("div");
  div.className = "discussion__information";
  div.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`;
  discussionContent.append(div);

  // 디스커션의 답변 체크박스
  const p = document.createElement("p");
  p.textContent = "☑";
  discussionAnswered.append(p);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

const render = (element, currentPage) => {
  for (let i = 0 + (currentPage - 1) * DISCUSSIONS_RENDER_PER_PAGE; i < currentPage * DISCUSSIONS_RENDER_PER_PAGE; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
};

function addDiscussion() {
  const time = new Date();

  const newDiscussion = {
    author: name.value,
    createdAt: time,
    title: title.value,
    story: story.value,
    avatarUrl: `http://placeimg.com/64/64/animals/grayscale`,
  };

  agoraStatesDiscussions.unshift(newDiscussion);
}

function pageButtonRender() {
  const pageCount = calculatePageCount();
  renderPageButtons(pageCount);
}

function calculatePageCount() {
  return Math.ceil(agoraStatesDiscussions.length / DISCUSSIONS_RENDER_PER_PAGE);
}

function renderPageButtons(count) {
  const nextButton = document.querySelector("#next-button");
  for (let i = 2; i <= count; i++) {
    const button = document.createElement("button");
    button.className = "page-button";
    button.textContent = i;
    nextButton.before(button);
  }
}

function clearDiscussions() {
  const discussionContainers = document.querySelectorAll(".discussion__container");
  discussionContainers.forEach((element) => {
    element.remove();
  });
}

function initCurrentPage() {
  const buttons = document.querySelectorAll(".page-button");

  currentPage = 1;
  buttons.forEach((button) => {
    removeClassList(button, "current-page");
  });
  addClassList(buttons[currentPage - 1], "current-page");
}

// 앱 시작
const initApp = () => {
  if (isExistLocalStorage("discussions")) {
    agoraStatesDiscussions = getLocalStorage("discussions");
  }
  render(ul, currentPage);
  pageButtonRender();
  pageButtonsAddEventListener();
  prevButtonAddEventListener();
  nextButtonAddEventListener();
  form.addEventListener("submit", handleSubmitButton);
};

initApp();
