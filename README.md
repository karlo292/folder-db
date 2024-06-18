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
const db = folderDB.init('db');
```

Create a new table
```js
const users = db.createTable('users');
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
users.insert('John', data)
```

Read JSON from the record
```js
console.log(users.read('John'));
```

Update record, in this case it will add new data to it
```js
const newData = {
    "Mother": "Jane",
    "Father": "Mark",
}

users.update('John', newData)
```

Delete record
```js
users.delete('John')
```

Check if record exists (returns true or false)
```js
users.exists('John')
```

Check if table exists (returns true or false)
```js
db.tableExists('users')
```

List all tables in a database
```js
db.listTables('db')
```

List all records in a table
```js
folderDB.listRecords('db', 'users')
```


That's it!
If you like this project make sure to give me a star! Would mean a lot.
Additionally, if you'd like to contribute you can do so by forking it or 
suggesting new functions that I haven't added so far





