import fs from 'fs';
import path from 'path';

export default function getFileContents(filePath: string): string {
    return fs.readFileSync(path.resolve(`${__dirname}/../../${filePath}`), 'utf8');
}
