[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ralusek/hodash.reshape/blob/master/LICENSE)
[![npm version](https://img.shields.io/npm/v/hodash.reshape.svg?style=flat)](https://www.npmjs.com/package/hodash.reshape)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/ralusek/hodash.reshape/blob/master/LICENSE)

### Map from one object shape to another.

The objective of this utility is to map objects from one shape to another. The most common use case for this would be if you are getting data from an external service and need to map it to your own schema.

`$ npm install --save hodash.reshape`


##### Include the package.
``` typescript
import reshape from 'hodash.reshape';
```

Now, let's say our goal is to transform data from inputs that look like this:
```typescript
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
```

into outputs that look like this:
```typescript
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
```

Let's see what that mapping would look like:

##### Define Reshaper
``` typescript

// We define the mapping here.
const shapeUser = reshape({
  age: 'Age',
  name: obj => obj.FirstName + ' ' + obj.LastName,
  address: obj => reshape({
    street: 'Address.Street',
    coords: reshape({
      lat: 'Address.Lat',
      lng: 'Address.Long',
    }, obj),
  }, obj),
});
```

The properties of the `mapping` object are in the shape that our output will take on. By having a property on the mapping object, such as `age` or `name`, you are defining what you would like a property keyed as in your output. The value of the mapping function can be one of three types: `function`, `string`, or `other`.

- `function`: If the value on the mapping is a function, such as with `name`, the whole object we are mapping from will be passed in. The function is executed in a `try` `catch` block, so you can be very aggressive with reaching for properties. `obj => Math.floor(obj.age.median)` is fine to do even if you don't know if `obj.age` or `obj.age.median` are defined, let alone whether or not `Math.floor` will throw an error. If it throws an error, it will be caught, and the value will be undefined.
- `string`: A dot-delimited path to the value you're looking for. `'address.street'` will safely attempt to return `obj.address.street`, and return undefined if there is anything undefined along the way.
- `other`: Just places the value encountered in the output at that property. (See `mapping.address.coords` for reference)


##### Let's remap!
``` typescript
const result = shapeUser({
  Age: 25,
  FirstName: 'Tom',
  LastName: 'Bingus',
  Address: {
    Street: '1234 Dangus St',
    Lat: 123,
    Long: 10
  }
});
```

##### The output.
``` json
{
  "age": 25,
  "name": "Tom Bingus",
  "address": {
    "street": "1234 Dangus St",
    "coords": {
      "lat": 123,
      "lng": 10
    }
  }
}
```
