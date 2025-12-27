const fs = require('fs');
const fd = fs.openSync('/Users/ydmacm1/gipkon/natroSon.sql', 'r');
const buffer = Buffer.alloc(1000);
fs.readSync(fd, buffer, 0, 1000, 2660976);
console.log(buffer.toString());
fs.closeSync(fd);
