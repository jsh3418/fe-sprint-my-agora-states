// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

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
  div.textContent = `${obj.author} / ${obj.createdAt}`;
  discussionContent.append(div);

  // 디스커션의 답변 체크박스
  const p = document.createElement("p");
  p.textContent = "☑";
  discussionAnswered.append(p);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }

  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
