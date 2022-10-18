import Discussion from "./components/Discussion";

function Discussions() {
  return (
    <section className="discussion__wrapper">
      <Discussion />
      <div id="page-button-wrapper">
        <button id="prev-button">⬅️</button>
        <button className="page-button current-page">1</button>
        <button id="next-button">➡️</button>
      </div>
    </section>
  );
}

export default Discussions;
