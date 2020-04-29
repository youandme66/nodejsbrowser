import { By, Key, until, Builder, Capabilities, WebDriver } from 'selenium-webdriver';
import { ServiceBuilder, getDefaultService, Options, setDefaultService } from 'selenium-webdriver/chrome';
import { join } from 'path';
import WebConf from '../conf/web.conf';
import { sleep, hasMove, moveSimulation } from '../utils/commons';
import WebData from '../conf/data.conf';
import { Command } from 'selenium-webdriver/lib/command';

let options = new Options();
options.addArguments("--start-maximized"); // 启动就最大化，而不是像后面再使用 maximize() 那样之后再最大化
options.addArguments("--disable-popup-blocking");
options.addArguments("no-sandbox");
options.addArguments("disable-extensions");
options.excludeSwitches('enable-automation');
// options.addArguments('debuggerAddress','127.0.0.1:9222');
// options.addArguments("no-default-browser-check");
// options.headless();

let service = new ServiceBuilder(join(__dirname, '../chromedriver.exe')).build();
setDefaultService(service);

let builder = new Builder().setChromeOptions(options).withCapabilities(Capabilities.chrome()).forBrowser('chrome');
builder.setProxy({
    httpProxy: 'http://127.0.0.1:3000',
    proxyType: '1'
});
let driver = builder.build();

export async function alimama() {
    try {
        await driver.get(WebConf.alimama);
        // 浏览器可能还没渲染完毕等待3秒
        await driver.sleep(3000);
        let loginFrame = await driver.findElement(By.xpath('//*[@id="mx_n_18"]/div/iframe'));
        await driver.switchTo().frame(loginFrame);
        await driver.executeScript("console.log('执行这段代码')");
        let userNameInput = await driver.findElement(By.xpath('//*[@id="fm-login-id"]'));
        await userNameInput.sendKeys(WebData.userName);
        await sleep(Math.random());
        let passwordInput = await driver.findElement(By.xpath('//*[@id="fm-login-password"]'));
        await passwordInput.sendKeys(WebData.password);
        await sleep(Math.random());
        await moveSimulation(driver, 'nc_1_n1z');
        let submitBtn = await driver.findElement(By.xpath('//*[@id="login-form"]/div[4]/button'));
        await submitBtn.click();
        let cookies = await driver.manage().getCookies();
        console.log(cookies);
    } finally {
        await driver.quit();
    }
}

// https://blog.csdn.net/fengxiaoxiao_1/article/details/77073918
// https://www.cnblogs.com/triangle959/p/12015179.html
// https://blog.csdn.net/dichun9655/article/details/93790652
// chrome.exe --remote-debugging-port=9222