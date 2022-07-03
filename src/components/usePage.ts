import { useEffect, useMemo, useState } from "react";
import { paginator } from "@ce1pers/use-page";

interface UsePageProps<T> {
  array: T[];
}

export default function usePage<T>({ array }: UsePageProps<T>) {
  const [items, setItems] = useState<T[]>([]);
  const {
    getValues,
    next,
    previous,
    getPageList,
    goTo,
    hasNext,
    hasPrevious,
    goFirst,
    goLast,
    getCurrentPage,
  } = useMemo(() => paginator<T>({ array, take: 3 }), []);
  useEffect(() => setItems(getValues()), []);

  const onNext = () => setItems(next());
  const onPrevious = () => setItems(previous());
  const onGo = (page: number) => setItems(goTo(page));
  const onFirst = () => setItems(goFirst());
  const onLast = () => setItems(goLast());

  return {
    items,
    setItems,
    onNext,
    onPrevious,
    pages: getPageList(),
    onGo,
    onFirst,
    onLast,
    getCurrentPage,
    hasNext,
    hasPrevious,
  };
}
