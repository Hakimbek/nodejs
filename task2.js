import csv from 'csvtojson';
import fs from 'fs';
import { pipeline } from 'stream';

const readPath = './csv/csv.csv';
const writePath = './csv/file.txt';

function readAndWriteSimultaneously(readPath, writePath) {
    pipeline(
        fs.createReadStream(readPath),
        csv(),
        fs.createWriteStream(writePath),
        (error) => {
            if (error) { console.error(error.message) }
            else { console.log('Finish!') }
        }
    )
}

readAndWriteSimultaneously(readPath, writePath);
