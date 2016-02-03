// app/mirage/factories/user.js
import Mirage, { faker } from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  username(i) { return `User ${i+1}`; },
  country: faker.list.random(1, 2, 3, 4, 5, 6)
});
