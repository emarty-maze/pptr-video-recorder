# puppeteer-video-recorder
[Prerequisites](#markdown-header-prerequisites) | [Installation](#markdown-header-installation) | [Manual](#markdown-header-manual) | [InitOptions](#markdown-header-inito-ptions.md) | [Starting Recorder](#markdown-header-starting-recorder) | [FAQ](#markdown-header-faq)

Puppeteer video recorder is a simple Puppeteer plugin to auto-create videos for every new frame appears in the browser.

## Why

It's based on the [Puppeteer mass screenshots](https://www.npmjs.com/package/puppeteer-mass-screenshots) plugin
and therefore doesn't affect Puppeteer's run time.

So basically, it's fast, and it won't slow your run time

## Prerequisites
In order to use this plugin:

- Puppeteer must be installed.
- Pupepteers' page object must be created.
- FFMpeg must be installed and set in PATH (or change the ffmpeg command to where it's accessible from)

## Installation
To install the plugin to your project please use:

```javascript
npm install puppeteer-video-recorder
```

You'll probably prefer to add it to your package.json file so you can use:</p>

```bash
npm install --save-prod puppeteer-video-recorder
```

## Manual

Once Puppeteer video recorder is installed, you can require it in your project:

```javascript
const PuppeteerVideoRecorder = require('puppeteer-video-recorder');
```

In your constructor create:

```javascript
const recorder = new PuppeteerVideoRecorder();
```

After you have page object

## Init Options

- **page** - Puppeteer page object (related to the browser).</li>
- **videosPath** - where to save the created videos, images file and temporary images</li>

```javascript
await recorder.init(page, videosPath);
```

## Starting Recorder

To start the automatic video recording:

```javascript
await recorder.start();
```

To stop the automatic video recording:

```javascript
await recorder.stop();
```

**! Important** - call `recorder.stop` before browser is closed.

## FAQ

### Does it support Chrome in headless mode?

Yes, it does. it supports Chrome in headless / "headfull" mode.

It records full length video, of every Chrome browser's frame, even though Chrome is in headless mode.

### Does it support page redirects?

Yes, it does.

This plugin is based on the [Puppeteer mass screenshots](https://www.npmjs.com/package/puppeteer-mass-screenshots) plugin, which supports redirection.

### Does it use the window object?

No, it doesn't use the window object.

### Can I run this plugin with my own page/browser objects?

Yes.

### Will it change my browser/page/window objects?

No, it won't.

Feel free to set browser/page/window as you like, it won't be affected by this plugin.</p>

### Creating videos is slow why?

It is because current FFMPEG command is slow.
We should in the future upload a solution for faster conversion of FFMPEG
Feel free to send us one if you've found something faster and better, we always love to improve.

### I get errors related to FFMPEG, why?</h3>

Please ensure that you have FFMPEG installed on your PC
run from your cmd / terminal (in linux) the command: `ffmpeg --help`
If you see results, and don't see "command not found" errors, this plugin should work with your FFMPEG