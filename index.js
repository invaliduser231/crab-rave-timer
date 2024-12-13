const assert = require("assert");
const webdriver = require("selenium-webdriver");
const { By, until } = webdriver;
const chrome = require("selenium-webdriver/chrome");

// Set up the ChromeDriver path and create a new ChromeOptions instance
const path = require("chromedriver").path;
const chromeOptions = new chrome.Options();

// Add the uBlock Origin extension to the ChromeOptions instance
chromeOptions.addExtensions("./uBlock-Origin-Chrome-Web-Store.crx");

// Create a new ChromeDriver instance with the ChromeOptions and a new ChromeServiceBuilder instance
const driver = chrome.Driver.createSession(
  chromeOptions,
  new chrome.ServiceBuilder(path).build()
);

// Time in seconds needed in the video to get to the drop
const dropTimeInSeconds = 75;

async function main() {
  try {
    // Navigate to the YouTube video page
    await driver.get("https://www.youtube.com/watch?v=LDU_Txk06tM");

    // Wait for the cookie banner to be present on the page and then click it
    const cookieBannerSelector = "[aria-label='Verwendung von Cookies und anderen Daten zu den beschriebenen Zwecken akzeptieren'] div.yt-spec-touch-feedback-shape__fill";
    await driver.wait(until.elementLocated(By.css(cookieBannerSelector)), 10000);
    await driver.findElement(By.css(cookieBannerSelector)).click();

    // Wait for the video element to be present on the page and then pause it
    await driver.wait(until.elementLocated(By.css("video")), 10000);
    await driver.executeScript("document.getElementsByTagName('video')[0].pause();");

    // Set an interval to check the current time every 100 milliseconds
    let interval = setInterval(async function () {
      // Get the current time
      let currentTime = new Date();

      // Calculate the start time to get the drop right
      let targetTime = new Date();
      targetTime.setHours(0, 0, 0, 0); // Target time is midnight
      let startTime = new Date(targetTime.getTime() - dropTimeInSeconds * 1000);

      // Check if the current time matches the calculated start time
      console.log(currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds());
      if (currentTime >= startTime && currentTime <= targetTime) {
        console.log("Time to start the video!");

        // Calculate the lost time
        let lostTime = (currentTime - startTime) / 1000;

        // Set the video to start playing at the correct time
        await driver.executeScript(`document.getElementsByTagName('video')[0].currentTime = ${lostTime};`);

        // Start the video
        await driver.executeScript("document.getElementsByTagName('video')[0].play();");

        // Clear the interval
        clearInterval(interval);
      }
    }, 100);
  } catch (error) {
    // Handle errors in the script
    console.error("An error occurred:", error);
  } finally {
    // Close the browser and shut down the ChromeDriver instance
    // await driver.quit();
  }
}

// Run the main function
main();
