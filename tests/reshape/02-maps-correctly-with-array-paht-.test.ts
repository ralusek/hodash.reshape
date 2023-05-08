import 'mocha';
import { expect } from 'chai';

import reshape from '../../lib';


type Input = {
  Age: number;
  FirstName: string;
  LastName: string;
  Address: {
    Street: string;
    Lat: number;
    Long: number;
  };
};

type Output = {
  age: number;
  name: string;
  address: {
    street: string;
    coords: {
      lat: number;
      lng: number;
    };
  };
};

describe('Invocation', () => {
  it('should remap as expected', () => {
    const shapeUser = reshape<Input, Output>({
      age: 'Age',
      name: obj => obj.FirstName + ' ' + obj.LastName,
      address: obj => reshape<Input, Output['address']>({
        street: ['Address', 'Street'],
        coords: obj => reshape<Input, Output['address']['coords']>({
          lat: ['Address', 'Lat'],
          lng: ['Address', 'Long']
        })(obj)
      })(obj)
    });
    
    const result = shapeUser({
      Age: 25,
      FirstName: 'Tom',
      LastName: 'Bingus',
      Address: {
        Street: '1234 Dangus St',
        Lat: 123,
        Long: 10,
      }
    });

    expect(result).to.nested.include({
      age: 25,
      name: 'Tom Bingus',
    });

    expect(result.address).to.not.be.undefined;
    expect(result.address).to.nested.include({
      street: '1234 Dangus St',
    });

    expect(result.address.coords).to.not.be.undefined;
    expect(result.address.coords).to.nested.include({
      lat: 123,
      lng: 10,
    });
  });
});
