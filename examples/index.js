const reshape = require('../src');

const mapping = {
  age: 'Age',
  name: obj => obj.FirstName + ' ' + obj.LastName,
  address: obj => reshape({
    street: 'Address.Street',
    coords: reshape({
      lat: 'Address.Lat',
      lng: 'Address.Long'
    }, obj)
  }, obj),
  someValueThatDoesNotExist: obj => obj.whatever.bro.this.wont.error,
  someOtherValue: (obj, { get }) => get(() => obj.whatever.bro, 'Default to me!')
};

const data = {
  Age: 25,
  FirstName: 'Tom',
  LastName: 'Bingus',
  Address: {
    Street: '1234 Dangus St',
    Lat: 123,
    Long: 10
  }
};

console.log(reshape(mapping, data));
