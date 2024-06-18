const fs = require('fs');
const path = require('path');


// Chooses the folder where the database will be stored
function init(dbName) {
    if (!fs.existsSync(dbName)) {
        fs.mkdirSync(dbName);
        console.log(`Database ${dbName} created!`)
    }

    return {
        createTable(tableName) {
            const tablePath = path.join(dbName, tableName);
            if (!fs.existsSync(tablePath)) {
                fs.mkdirSync(tablePath);
            }
            return {
                insert(recordName, data) {
                    const recordPath = path.join(dbName, tableName, `${recordName}.json`);
                    const tempRecordPath = recordPath + '.tmp';
                
                    try {
                        fs.writeFileSync(tempRecordPath, JSON.stringify(data, null, 2));
                
                        const writtenData = JSON.parse(fs.readFileSync(tempRecordPath, 'utf-8'));
                        if (JSON.stringify(data) !== JSON.stringify(writtenData)) {
                            throw new Error('Data verification failed after write');
                        }
                
                        fs.renameSync(tempRecordPath, recordPath);
                    } catch (error) {
                        console.error('Failed to insert record:', error);
                        if (fs.existsSync(tempRecordPath)) {
                            fs.unlinkSync(tempRecordPath);
                        }
                        throw error;
                    }
                },
                read(recordName) {
                    const recordPath = path.join(dbName, tableName, `${recordName}.json`);
                    if (fs.existsSync(recordPath)) {
                        const data = fs.readFileSync(recordPath, 'utf-8');
                        return JSON.parse(data);
                    } else {
                        console.error(`Error: Record not found in database: ${dbName}, table: ${tableName}, record: ${recordName}`)
                        return null;
                    }
                },
                update(recordName, data) {
                    const recordPath = path.join(__dirname, dbName, tableName, `${recordName}.json`);
                    if (fs.existsSync(recordPath)) {
                        const existingDataRaw = fs.readFileSync(recordPath, 'utf-8');
                        const existingData = JSON.parse(existingDataRaw);
                
                        const updatedData = { ...existingData, ...data };
                
                        fs.writeFileSync(recordPath, JSON.stringify(updatedData, null, 2));
                    } else {
                        console.log(`Record ${recordName} does not exist.`);
                    }
                },
                delete(recordName) {
                    const recordPath = path.join(dbName, tableName, `${recordName}.json`);
                    if (fs.existsSync(recordPath)) {
                        fs.unlinkSync(recordPath);
                    }
                },
                exists(recordName) {
                    const itemPath = path.join(dbName, tableName, `${recordName}.json`);
                    return fs.existsSync(itemPath);
                },
                list() {
                    const records = fs.readdirSync(path.join(dbName, tableName)).filter(file => file.endsWith('.json'));
                    return records.map(record => record.replace('.json', ''));
                }
            }
        },
        tableExists(tableName) {
            const tablePath = path.join(dbName, tableName);
            return fs.existsSync(tablePath);
        },
        listTables() {
            const tables = fs.readdirSync(dbName).filter(file => fs.statSync(path.join(dbName, file)).isDirectory());
            return tables;
        }
    }
}



module.exports = {
    init
};
