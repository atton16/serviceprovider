import Provider from 'serviceprovider';
import GreetService from './greet.service';

export default class NameAlternator {
  constructor() {
    const greetService = Provider.resolve(GreetService);
    let i = 0;
    greetService.setUser('Pikachu');
    setInterval(() => {
      if (i === 0) {
        greetService.setUser('Raichu');
        i = 1;
      } else {
        greetService.setUser('Pikachu');
        i = 0;
      }
    }, 500);
  }
}
