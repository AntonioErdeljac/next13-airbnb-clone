// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// Select the database to use.
use('mongodbVSCodePlaygroundDB');

// The drop() command destroys all data from a collection.
// Make sure you run it against the correct database and collection.
db.sales.drop();

// Insert a few documents into the sales collection.
db.sales.insertMany([
  { '_id': 1, 'item': 'abc', 'price': 10, 'quantity': 2, 'date': new Date('2014-03-01T08:00:00Z') },
  { '_id': 2, 'item': 'jkl', 'price': 20, 'quantity': 1, 'date': new Date('2014-03-01T09:00:00Z') },
  { '_id': 3, 'item': 'xyz', 'price': 5, 'quantity': 10, 'date': new Date('2014-03-15T09:00:00Z') },
  { '_id': 4, 'item': 'xyz', 'price': 5, 'quantity':  20, 'date': new Date('2014-04-04T11:21:39.736Z') },
  { '_id': 5, 'item': 'abc', 'price': 10, 'quantity': 10, 'date': new Date('2014-04-04T21:23:13.331Z') },
  { '_id': 6, 'item': 'def', 'price': 7.5, 'quantity': 5, 'date': new Date('2015-06-04T05:08:13Z') },
  { '_id': 7, 'item': 'def', 'price': 7.5, 'quantity': 10, 'date': new Date('2015-09-10T08:43:00Z') },
  { '_id': 8, 'item': 'abc', 'price': 10, 'quantity': 5, 'date': new Date('2016-02-06T20:20:13Z') },
]);

// Run a find command to view items sold on April 4th, 2014.
db.sales.find({ date: { $gte: new Date('2014-04-04'), $lt: new Date('2014-04-05') } });

// Build an aggregation to view total sales for each product in 2014.
const aggregation = [
  { $match: { date: { $gte: new Date('2014-01-01'), $lt: new Date('2015-01-01') } } },
  { $group: { _id: '$item', totalSaleAmount: { $sum: { $multiply: [ '$price', '$quantity' ] } } } }
];

// Run the aggregation and open a cursor to the results.
// Use toArray() to exhaust the cursor to return the whole result set.
// You can use hasNext()/next() to iterate through the cursor page by page.
db.sales.aggregate(aggregation);
