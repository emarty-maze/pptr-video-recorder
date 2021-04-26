const { FsHandler } = require('./handlers');
const { exec } = require('child_process');
const PuppeteerMassScreenshots = require('puppeteer-mass-screenshots');

class PuppeteerVideoRecorder {
    constructor(){
        this.screenshots = new PuppeteerMassScreenshots();
        this.fsHandler = new FsHandler();
    }

    async init(page, outputFolder){
        this.page = page;
        this.outputFolder = outputFolder;
        await this.fsHandler.init(outputFolder);
        const { imagesPath, imagesFilename, appendToFile } = this.fsHandler;
        await this.screenshots.init(page, imagesPath, {
            afterWritingImageFile: (filename) => appendToFile(imagesFilename, `file '${filename}'\n`)
        });
    }

    start(options = {}) {
        return this.screenshots.start(options);
    }

    async stop () {
        const { imagesFilename } = this.fsHandler;
    	await this.screenshots.stop();
    	await this.createVideo();
        return exec(`rm -rf ${imagesFilename}`)
    }

    get defaultFFMpegCommand() {
        const { imagesFilename, videoFilename } = this.fsHandler;
        return [
            'ffmpeg',
            '-f concat',
            '-safe 0',
            `-i ${imagesFilename}`,
            '-framerate 60',
            videoFilename
        ].join(' ');
    }

    createVideo() {
        const _ffmpegCommand = this.defaultFFMpegCommand
        return new Promise((resolve, reject) => {
           exec(_ffmpegCommand, (error, stdout, stderr) => {
             if (error) {
                reject(error);
                return;
            }
            resolve(stdout)
           });
        })
    }

    getFilePath() {
        const { videoFilename } = this.fsHandler;
        return `${videoFilename}`
    }
}

module.exports = PuppeteerVideoRecorder;
