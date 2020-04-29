import { Driver } from "selenium-webdriver/chrome";
import { WebElement } from "selenium-webdriver";

export async function inputContent(driver: Driver, element: WebElement, content: string) {
    await element.sendKeys(content);
}