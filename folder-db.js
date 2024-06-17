const fs = require('fs');
const path = require('path');

// Chooses the folder where the database will be stored
function init(dbName) {
    if (!fs.existsSync(dbName)) {
        fs.mkdirSync(dbName);
    }
}

// Creates a table in the database
function createTable(dbName, tableName) {
    const tablePath = path.join(dbName, tableName);
    if (!fs.existsSync(tablePath)) {
        fs.mkdirSync(tablePath);
    }
}

// Inserts a record in the table
function insert(dbName, tableName, recordName, data) {
    const recordPath = path.join(dbName, tableName, `${recordName}.json`);
    fs.writeFileSync(recordPath, JSON.stringify(data, null, 2));
}

// Reads a record from the table
function read(dbName, tableName, recordName) {
    const recordPath = path.join(dbName, tableName, `${recordName}.json`);
    if (fs.existsSync(recordPath)) {
        const data = fs.readFileSync(recordPath, 'utf-8');
        return JSON.parse(data);
    }
    return null;
}

// Updates a record in the table
function update(dbName, tableName, recordName, data) {
    const recordPath = path.join(dbName, tableName, `${recordName}.json`);
    if (fs.existsSync(recordPath)) {
        fs.writeFileSync(recordPath, JSON.stringify(data, null, 2));
    }
}

// Deletes a record from the table
function deleteRecord(dbName, tableName, recordName) {
    const recordPath = path.join(dbName, tableName, `${recordName}.json`);
    if (fs.existsSync(recordPath)) {
        fs.unlinkSync(recordPath);
    }
}

// Checks if a record exists in the table
function itemExists(dbName, tableName, itemName) {
    const itemPath = path.join(dbName, tableName, `${itemName}.json`);
    return fs.existsSync(itemPath);
}

// Checks if a table exists in the database
function tableExists(dbName, tableName) {
    const tablePath = path.join(dbName, tableName);
    return fs.existsSync(tablePath);
}

// List all tables in the database
function listTables(dbName) {
    const tables = fs.readdirSync(dbName).filter(file => fs.statSync(path.join(dbName, file)).isDirectory());
    return tables;
}

// List all records in a table
function listRecords(dbName, tableName) {
    const records = fs.readdirSync(path.join(dbName, tableName)).filter(file => file.endsWith('.json'));
    return records.map(record => record.replace('.json', ''));
}


module.exports = {
    init,
    createTable,
    insert,
    read,
    update,
    deleteRecord,
    itemExists,
    tableExists,
    listTables,
    listRecords
};
