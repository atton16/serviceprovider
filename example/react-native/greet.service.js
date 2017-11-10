import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export default class GreetService {
  _stateSubject = new BehaviorSubject(null);
  stateEvent = this._stateSubject.asObservable();

  setUser(name) {
    this._stateSubject.next(name);
  }
}
