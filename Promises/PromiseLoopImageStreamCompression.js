let sharp = require('sharp');
const path = require('path');
const fsExtra = require('fs-extra');
const fs = require('fs');
const when = require('when');
sharp.cache(false);
fsExtra.ensureDirSync(path.resolve('pictures'));

console.time("timetaken");
when.iterate((count) => {
    return count + 1;
}, (count) => {
    return count >= 5;
}, (count) => {
    console.log('here with count:' + count);
    return when.promise((resolve, reject) => {
        let options = {quality: 60, force: true};
        let jpgCompressor =
            sharp()
                .jpeg(options)
                .on('error', function (err) {
                    console.error(err)
                })
                .on('info', function (info) {
                    console.log('image is:' + JSON.stringify(info));
                });

        let readStream = fs.createReadStream(path.resolve('..', 'sampleData', 'Android_robot.png'));
        // This catches any errors that happen while creating the readable stream (usually invalid names)
        readStream.on('error', function (err) {
            console.error(err)
        });
        readStream.on('open', function () {
            let wstream = fs.createWriteStream(path.resolve('pictures', 'worldLarge' + count + '.jpg'));
            readStream.on('finish', () => {
                console.log('read finsihed')
            });
            readStream.on('close', () => {
                console.log('read close')
            });
            wstream.on('error', (error) => {
                console.error('error here' + error);
                reject('error')

            });
            wstream.on("finish", () => {
                console.log('wstream finished');
                resolve(true)
            });
            wstream.on('close', () => {
                console.log('All writes are now closed.');
            });
            readStream.pipe(jpgCompressor).pipe(wstream);

            readStream.on('end', () => {
                console.log('read stream finished')
            });
        });
    })

}, 0).then(() => {
    console.log('all done');
    console.timeEnd("timetaken");
});
