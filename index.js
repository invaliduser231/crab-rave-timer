const assert = require("assert");
const webdriver = require("selenium-webdriver");
const { By, until } = webdriver;
const chrome = require("selenium-webdriver/chrome");

// Set up the ChromeDriver path and create a new ChromeOptions instance
const path = require("chromedriver").path;
const chromeOptions = new chrome.Options();

// Add the uBlock Origin extension to the ChromeOptions instance
chromeOptions.addExtensions("./uBlock Origin 1.46.0.0.crx");

// Create a new ChromeDriver instance with the ChromeOptions and a new ChromeServiceBuilder instance
const driver = chrome.Driver.createSession(
  chromeOptions,
  new chrome.ServiceBuilder(path).build()
);

async function main() {
  try {
    // Navigate to the YouTube video page
    await driver.get("https://www.youtube.com/watch?v=LDU_Txk06tM");

    // Wait for the cookie banner to be present on the page and then click it
    await driver.wait(
      until.elementLocated(
        By.css(
          "[aria-label='Verwendung von Cookies und anderen Daten zu den beschriebenen Zwecken akzeptieren'] div.yt-spec-touch-feedback-shape__fill"
        )
      ),
      10000
    );
    await driver
      .findElement(
        By.css(
          "[aria-label='Verwendung von Cookies und anderen Daten zu den beschriebenen Zwecken akzeptieren'] div.yt-spec-touch-feedback-shape__fill"
        )
      )
      .click();

    // Wait for the video element to be present on the page and then pause it
    await driver.wait(until.elementLocated(By.css("video")), 10000);
    await driver.executeScript(
      "document.getElementsByTagName('video')[0].pause();"
    );
    // Set an interval to check the current time every 100 milliseconds
    let interval = setInterval(function () {
      // Get the current time
      let currentTime = new Date();

      // Check if the current time is 23:58:45
      console.log(currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds());
      if (
        currentTime.getHours() === 20 &&
        currentTime.getMinutes() === 55 &&
        currentTime.getSeconds() === 00 &&
        currentTime.getMilliseconds() < 400
      ) {
        console.log("Time to start the video!");
        // Set the video to start playing at 0 seconds
        driver.executeScript(
          "document.getElementsByTagName('video')[0].currentTime = 0;"
        );

        // Start the video
        driver.executeScript(
            "document.getElementsByTagName('video')[0].play();"
        );

        // Clear the interval
        clearInterval(interval);
      }
    }, 100);
  } catch (error) {
    // Handle errors in the script
    console.error(error);
  } finally {
    // Close the browser and shut down the ChromeDriver instance
    // await driver.quit();
  }
}

// Run the main function
main();
