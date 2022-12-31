# YouTube New Year's Eve Crab Rave Countdown

This script uses Selenium and the ChromeDriver to navigate to a YouTube video, pause the video, and then start playing the video at exactly midnight on New Year's Eve.

## Requirements

- Node.js
- Selenium
- ChromeDriver
- uBlock Origin (optional, but recommended for ad-blocking)

## How to use

1. Download and install Node.js from the official website (https://nodejs.org/).
2. Open a terminal or command prompt and run `npm install selenium-webdriver`.
3. Download the ChromeDriver executable from the official website (https://chromedriver.chromium.org/) and place it in a directory on your system PATH.
4. Optional: download the uBlock Origin extension CRX file from the official website (https://chrome.google.com/webstore/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm) and place it in the same directory as the script.
5. Open the script file in a text editor and replace the `path` variable with the path to the ChromeDriver executable.
6. If you want to use the uBlock Origin extension, update the `chromeOptions.addExtensions` line with the path to the CRX file.
7. Save the script file and run it with `node script.js`.
8. The script will open a new Chrome window, navigate to the YouTube video, and then pause it. It will then check the current time every 100 milliseconds and start playing the video at midnight on New Year's Eve.

## Notes

- The script is set to start the video at midnight in the Berlin timezone (UTC+1). To change the timezone, update the `currentTime.getHours()`, `currentTime.getMinutes()`, and `currentTime.getSeconds()` lines in the interval function.
- The script is set to start playing the video at 00:00:00. To change the start time, update the `currentTime.getHours()`, `currentTime.getMinutes()`, and `currentTime.getSeconds()` lines in the interval function.
- The script is set to use the YouTube video URL `https://www.youtube.com/watch?v=LDU_Txk06tM`. To use a different video, update the `driver.get` line with the desired URL.
