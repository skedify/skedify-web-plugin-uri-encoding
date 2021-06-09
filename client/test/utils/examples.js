const main_examples = [
  {
    decoded: {},
    encoded: 'e30f',
  },
  {
    decoded: {
      aKey: 'aValue',
    },
    encoded: 'eyJhS2V5IjoiYVZhbHVlIn0f',
  },
  {
    decoded: {
      state: 'some-state',
      office: 'some-office',
      subject: 'some-subject',
    },
    encoded:
      'eyJvZmZpY2UiOiJzb21lLW9mZmljZSIsInN0YXRlIjoic29tZS1zdGF0ZSIsInN1YmplY3QiOiJzb21lLXN1YmplY3QifQg',
  },
];

module.exports = {
  main: main_examples,
};
