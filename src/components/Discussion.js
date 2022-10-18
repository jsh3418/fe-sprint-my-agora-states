import { useEffect, useState } from "react";

function Discussion() {
  const [agoraStatesDiscussions, setAgoraStatesDiscussions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/discussions")
      .then((response) => response.json())
      .then((data) => setAgoraStatesDiscussions(data));
  }, []);

  return (
    <ul className="discussions__container">
      {agoraStatesDiscussions.map(({ id, avatarUrl, title, author, createdAt }) => {
        return (
          <li className="discussion__container" id={id} key={id}>
            <div className="discussion__avatar--wrapper">
              <img className="discussion__avatar--image" src={avatarUrl}></img>
            </div>
            <div className="discussion__content">
              <h2 className="discussion__title">
                <a href="https://github.com/codestates-seb/agora-states-fe/discussions/45">{title}</a>
              </h2>
              <div className="discussion__information">
                {author} / {new Date(createdAt).toLocaleString()}
              </div>
            </div>
            <div className="discussion__answered">
              <p>☑</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default Discussion;
