function FormContainer() {
  return (
    <section className="form__container">
      <form action="" method="get" className="form">
        <div className="form__input--wrapper">
          <div className="form__input--name">
            <label htmlFor="name">이름</label>
            <input className="input" type="text" name="name" id="name" required />
          </div>
          <div className="form__input--title">
            <label htmlFor="name">제목</label>
            <input className="input" type="text" name="name" id="name" required />
          </div>
          <div className="form__textbox">
            <label htmlFor="story">질문 내용</label>
            <textarea id="story" className="input" name="story" placeholder="질문을 작성하세요" required></textarea>
          </div>
        </div>
        <div className="form__submit">
          <input id="submit-button" type="submit" value="질문하기" />
        </div>
      </form>
    </section>
  );
}

export default FormContainer;
