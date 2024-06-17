This is a simple database which uses folders as tables and json files as records


# How to add
```
npm i @karlito1501/folder-db
```

# Usage examples

Insert it into your application
```
const folderDB = require('@karlito1501/folder-db');
```

Create a new database
```
folderDB.init('db');
```

Create a new table
```
folderDB.createTable('db', 'users');
```

Insert a new record into the database table
```
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
```
console.log(folderDB.readRecord('db', 'users', 'John'));
```

Update record
```
const newData = {
    ...folderDB.readRecord('db', 'users', 'John'),
    "Mother": "Jane",
    "Father": "Mark",
}

folderDB.updateRecord('db', 'users', 'John', newData)
```

Delete record
```
folderDB.deleteRecord('db', 'users', 'John')
```

Check if record exists (returns true or false)
```
folderDB.deleteRecord('db', 'users', 'John')
```

Check if table exists (returns true or false)
```
folderDB.tableExists('db', 'users')
```

List all tables in a database
```
folderDB.listTables('db')
```

List all records in a table
```
folderDB.listRecords('db', 'users')
```


That's it!
If you like this project make sure to give me a star! Would mean a lot.
Additionally, if you'd like to contribute you can do so by forking it or 
suggesting new functions that I haven't added so far





