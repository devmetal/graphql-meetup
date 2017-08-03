const mongoose = require('mongoose');

const Project = mongoose.model('project');
const Employee = mongoose.model('employee');
const Technology = mongoose.model('technology');

const seed = () => {
  const p1 = new Project({ name: 'XY Calendar App' });
  const p2 = new Project({ name: 'XY Todo App' });
  const p3 = new Project({ name: 'XY Wishlist App' });

  const e1 = new Employee({ name: 'Jon Snow' });
  const e2 = new Employee({ name: 'Cersei Lannister' });
  const e3 = new Employee({ name: 'Theon Greyjoy' });

  const t1 = new Technology({ name: 'GraphQL', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/GraphQL_Logo.svg/1024px-GraphQL_Logo.svg.png' });
  const t2 = new Technology({ name: 'Angular', logo: 'https://angular.io/assets/images/logos/angular/angular.png' });
  const t3 = new Technology({ name: 'React', logo: 'https://www.gitbook.com/cover/book/mongkuen/react.jpg?build=1470682429235' });
  const t4 = new Technology({ name: 'Redux', logo: 'https://raw.githubusercontent.com/reactjs/redux/master/logo/logo.png' });
  const t5 = new Technology({ name: 'TypeScript', logo: 'https://camo.githubusercontent.com/364fcc20318b28180fbea3e335792e45caf3d4b2/687474703a2f2f7777772e747970657363726970746c616e672e6f72672f6173736574732f696d616765732f69636f6e732f616e64726f69642d6368726f6d652d313932783139322e706e67' });
  const t6 = new Technology({ name: 'NodeJs', logo: 'http://www.hexacta.com/wp-content/uploads/2015/12/node.png' });

  return Promise.all(
    [p1, p2, p3, e1, e2, e3, t1, t2, t3, t4, t5, t6].map(i => i.save())
  )
    .then(() => Promise.all([
      p1.addRequirements(t1, t3, t6),
      p2.addRequirements(t1, t2, t5),
      p3.addRequirements(t1, t6, t5),
    ]))
    .then(() => Promise.all([
      p1.addEmployees(e2, e3),
      p2.addEmployees(e1, e2, e3),
      p3.addEmployees(e1),
    ]))
    .then(() => Promise.all([
      e1.addTechnologies(t1),
      e2.addTechnologies(t2),
      e3.addTechnologies(t3),
    ]));
};

module.exports = () =>
  Project.count().then((count) => {
    if (!count) {
      return seed();
    }
    return Promise.resolve();
  });
