import { useEffect, useState } from "react";

function Discussions() {
  const [agoraStatesDiscussions, setAgoraStatesDiscussions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/discussions")
      .then((response) => response.json())
      .then((data) => setAgoraStatesDiscussions(data));
  }, []);

  return (
    <section className="discussion__wrapper">
      <ul className="discussions__container">
        {agoraStatesDiscussions.map((discussion) => {
          return (
            <li className="discussion__container" id={discussion.id} key={discussion.id}>
              <div className="discussion__avatar--wrapper">
                <img className="discussion__avatar--image" src={discussion.avatarUrl}></img>
              </div>
              <div className="discussion__content">
                <h2 className="discussion__title">
                  <a href="https://github.com/codestates-seb/agora-states-fe/discussions/45">{discussion.title}</a>
                </h2>
                <div className="discussion__information">
                  {discussion.author} / {new Date(discussion.createdAt).toLocaleString()}
                </div>
              </div>
              <div className="discussion__answered">
                <p>☑</p>
              </div>
            </li>
          );
        })}
      </ul>
      <div id="page-button-wrapper">
        <button id="prev-button">⬅️</button>
        <button className="page-button current-page">1</button>
        <button id="next-button">➡️</button>
      </div>
    </section>
  );
}

export default Discussions;
