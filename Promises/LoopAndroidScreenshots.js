let sharp = require('sharp');
const path = require('path');
const fsExtra = require('fs-extra');
const fs = require('fs');
const when = require('when');
const adb = require('adbkit');
let adbClient = adb.createClient();

//Note that the sampleData file doesn't actully show compression as its already compressed for the sake of putting it in GIT
//Use a file that is in a raw format

const DEVICE_SERIAL = 'emulator-5554';


sharp.cache(false);
const outputDir = path.resolve('..','outputData','pictures');
fsExtra.ensureDirSync(outputDir);
console.time("timetaken");
when.iterate((count) => {
    return count + 1;
}, (count) => {
    return count >= 5;
}, (count) => {
    console.log('here with count:' + count);
    return when.promise((resolve, reject) => {
        let options = {quality: 70, force: true};
        let jpgCompressor =
            sharp()
                .jpeg(options)
                .on('error', function (err) {
                    console.error(err)
                })
                .on('info', function (info) {
                    console.log('image is:' + JSON.stringify(info));
                });

        return adbClient
            .screencap(DEVICE_SERIAL)
            .then((pngBuffer)=> {
                console.log('Doing capture: ' + count + ' for: ' + path.resolve(outputDir, 'coolPic' + count + '.jpg'));
                let wstream = fs.createWriteStream(path.resolve(outputDir, 'coolPic' + count + '.jpg'));
               // let wstreamOrg = fs.createWriteStream(path.resolve(outputDir, 'OrgPic' + count + '.png'));
                pngBuffer.pipe(wstreamOrg);
                pngBuffer.pipe(jpgCompressor).pipe(wstream);
                wstream.on('error', reject);
                pngBuffer.on('error', reject);
                wstream.on("finish", () => {
                    console.log('wstream finished');
                    resolve(true)
                });

            });
    })

}, 0).then(() => {
    console.log('all done');
    console.timeEnd("timetaken");
});
