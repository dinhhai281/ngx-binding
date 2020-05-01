import { ReplaySubject } from 'rxjs';

/**
 * @param {T} [initial] optional initial value for binded observable
 * @description Binding component Input to a Observable
 */
export function ObservableBinding<T>(initial?: T) {
  const subjectSymbol = Symbol();

  return (target: Record<string | number | symbol, any>, key: PropertyKey) => {
    Object.defineProperty(target, key, {
      set(value: T) {
        if (!this[subjectSymbol]) {
          this[subjectSymbol] = new ReplaySubject<T>(1);
        }
        this[subjectSymbol].next(value);
      },
      get() {
        if (!this[subjectSymbol]) {
          this[subjectSymbol] = new ReplaySubject<T>(1);
          if (initial) {
            this[subjectSymbol].next(initial);
          }
        }

        return this[subjectSymbol];
      },
    });
  };
}
