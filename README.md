This is a simple database which uses folders as tables and json files as records


# How to add
```
npm i @karlito1501/folder-db
```

# Usage examples

Insert it into your application
```js
const folderDB = require('@karlito1501/folder-db');
```

Create a new database
```js
folderDB.init('db');
```

Create a new table
```js
folderDB.createTable('db', 'users');
```

Insert a new record into the database table
```js
const data = {
    "name": "John",
    "age": 30,
    "city": "New York",
    "Past Jobs": [
        "Waiter",
        "Bartender",
        "Manager"
    ]
}
folderDB.insertRecord('db', 'users', 'John', data)
```

Read JSON from the record
```js
console.log(folderDB.readRecord('db', 'users', 'John'));
```

Update record
```js
const newData = {
    ...folderDB.readRecord('db', 'users', 'John'),
    "Mother": "Jane",
    "Father": "Mark",
}

folderDB.updateRecord('db', 'users', 'John', newData)
```

Delete record
```js
folderDB.deleteRecord('db', 'users', 'John')
```

Check if record exists (returns true or false)
```js
folderDB.deleteRecord('db', 'users', 'John')
```

Check if table exists (returns true or false)
```js
folderDB.tableExists('db', 'users')
```

List all tables in a database
```js
folderDB.listTables('db')
```

List all records in a table
```js
folderDB.listRecords('db', 'users')
```


That's it!
If you like this project make sure to give me a star! Would mean a lot.
Additionally, if you'd like to contribute you can do so by forking it or 
suggesting new functions that I haven't added so far





