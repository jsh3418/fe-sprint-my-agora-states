import Discussion from "./components/Discussion";

function Discussions({ discussions }) {
  return (
    <section className="discussion__wrapper">
      {discussions.map((discussion) => (
        <Discussion discussion={discussion} key={discussion.id} />
      ))}
      <div id="page-button-wrapper">
        <button id="prev-button">⬅️</button>
        <button className="page-button current-page">1</button>
        <button id="next-button">➡️</button>
      </div>
    </section>
  );
}

export default Discussions;
