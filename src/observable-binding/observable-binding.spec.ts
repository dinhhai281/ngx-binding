import { ObservableBinding } from './index';
import { Observable, ReplaySubject } from 'rxjs';

class Foo {
  @ObservableBinding('bar') name$!: ReplaySubject<string>;
}

describe('ObservableBinding', () => {
  let foo: Foo;

  beforeEach(() => {
    foo = new Foo();
  });

  it('should not break class', () => {
    expect(foo).toBeTruthy();
  });

  it('should become observable after decorated', () => {
    expect(foo.name$).toBeInstanceOf(Observable);
  });

  it('should have "bar" as initial value', done => {
    foo.name$.subscribe(value => {
      expect(value).toEqual('bar');
      done();
    });
  });

  it('should propagate the change', done => {
    const result: string[] = [];
    const expected = ['1', '2', '3'];
    foo.name$.subscribe({
      next: value => result.push(value),
      complete: () => {
        expect(result).toEqual(['bar', ...expected]);
        done();
      },
    });
    expected.forEach(foo.name$.next.bind(foo.name$));
    foo.name$.complete();
  });
});
