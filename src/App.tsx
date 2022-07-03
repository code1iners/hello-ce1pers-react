import "./App.css";
import { clazz } from "@ce1pers/use-class";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { paginator } from "@ce1pers/use-page";

interface TestForm {
  number: number;
  take: number;
}

function App() {
  const { register, handleSubmit } = useForm<TestForm>({
    defaultValues: {
      number: 10,
      take: 5,
    },
  });
  const [number, setNumber] = useState(10);
  const [take, setTake] = useState(5);
  const [items, setItems] = useState<number[]>([]);

  // Paginator.
  const {
    next,
    previous,
    getPageList,
    goTo,
    goFirst,
    goLast,
    hasNext,
    hasPrevious,
    getValues,
    getCurrentPage,
    getCurrentPageListRange,
  } = useMemo(
    () =>
      paginator<number>({
        array: [...Array(number).keys()],
        take,
      }),
    [paginator, number, take]
  );

  useEffect(() => setItems(getValues()), [take]);
  const onPrevious = () => setItems(previous());
  const onNext = () => setItems(next());
  const onGo = (page: number) => setItems(goTo(page));
  const onFirst = () => setItems(goFirst());
  const onLast = () => setItems(goLast());

  // Forms.
  const onValid = (form: TestForm) => {
    console.log(form);
    setNumber(+form.number);
    setTake(+form.take);
  };

  return (
    <div className="container">
      <section>
        <form className="form__container" onSubmit={handleSubmit(onValid)}>
          <div className="form-input__wrapper">
            <label htmlFor="form-number">Numbers</label>
            <input id="form-number" type="number" {...register("number")} />
          </div>
          <div className="form-input__wrapper">
            <label htmlFor="form-take">Take</label>
            <input id="form-take" type="number" {...register("take")} />
          </div>
          <button type="submit">Set</button>
        </form>
      </section>

      <section className="items__container">
        <h1>ITEMS</h1>
        <ul className="items__wrapper">
          {items.map((item) => (
            <li className="item" key={item}>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="buttons__container">
        <button onClick={onFirst}>First</button>
        <button
          className={clazz(
            "previous-button",
            hasPrevious() ? "is-visible" : ""
          )}
          onClick={onPrevious}
        >
          Previous
        </button>
        <ul className="pages__container">
          {getCurrentPageListRange().map((page) => (
            <li key={page} onClick={() => onGo(page)}>
              <button
                className={clazz(page === getCurrentPage() ? "selected" : "")}
              >
                {page + 1}
              </button>
            </li>
          ))}
        </ul>
        <button
          className={clazz("next-button", hasNext() ? "is-visible" : "")}
          onClick={onNext}
        >
          Next
        </button>
        <button onClick={onLast}>Last</button>
      </section>
    </div>
  );
}

export default App;
