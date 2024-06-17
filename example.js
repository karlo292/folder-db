const folderDB = require('./folder-db');

folderDB.init('db');

// Create a table called 'users' and check if it exists
if (!folderDB.tableExists('db', 'users')) {
    folderDB.createTable('db', 'users');
    console.log('Creating table: users');
}


// Insert a record in the 'users' table and check if it exists
if (!folderDB.itemExists('db', 'users', 'mark')) {
    folderDB.insert('db', 'users', 'mark', {
        name: 'Mark',
        age: 25,
        someArray: [1, 2, 3]
    });
}
console.log(folderDB.read('db', 'users', 'mark'));

// Read the record from the 'users' table
const record = folderDB.read('db', 'users', 'mark');

// Update the record in the 'users' table. Specifically, change the age to 26
folderDB.update('db', 'users', 'mark', { 
    ...folderDB.read('db', 'users', 'mark'),
    age: 26 
});
console.log(folderDB.read('db', 'users', 'mark'));

// Delete the record from the 'users' table
folderDB.deleteRecord('db', 'users', 'mark');
console.log('Deleted record: mark')
