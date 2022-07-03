import "./App.css";
import usePage from "./components/usePage";
import { clazz } from "@ce1pers/use-class";

function App() {
  const {
    items,
    onNext,
    onPrevious,
    pages,
    onGo,
    onFirst,
    onLast,
    hasNext,
    hasPrevious,
  } = usePage({
    array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  });

  return (
    <div className="container">
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <div className="buttons__container">
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
          {pages.map((page) => (
            <li key={page} onClick={() => onGo(page)}>
              <button>{page}</button>
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
      </div>
    </div>
  );
}

export default App;
