const fs = require('fs');
const path = require('path');
const homedir = require('os').homedir();

var directoryPath = path.join(homedir, 'Desktop', 'Summoners War Exporter Files');
const params = process.argv.slice(2);
if (params && params.length > 0) {
    const directoryPathParam = params[0];
    directoryPath = directoryPathParam;
}

console.log('Scanning directory: ' + directoryPath);
fs.readdir(directoryPath, function(err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }

    const jsons = files.filter(m => m.endsWith('.json'));
    jsons.forEach(function(json) {
        const jsonPath = path.join(directoryPath, json);
        const data = require(jsonPath);
        if (!!data.unit_list) {
            for (let i = 0; i < data.unit_list.length; i++) {
                const unit = data.unit_list[i];
                unit.artifacts = [];
            }
        }

        fs.writeFile(json, JSON.stringify(data), err => {
            if (err) throw err;

            console.log(json + ' done.');
        });
    });
});
