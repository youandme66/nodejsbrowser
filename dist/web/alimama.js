"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const selenium_webdriver_1 = require("selenium-webdriver");
const chrome_1 = require("selenium-webdriver/chrome");
const path_1 = require("path");
const web_conf_1 = require("../conf/web.conf");
const commons_1 = require("../utils/commons");
const data_conf_1 = require("../conf/data.conf");
let options = new chrome_1.Options();
options.addArguments("--start-maximized"); // 启动就最大化，而不是像后面再使用 maximize() 那样之后再最大化
options.addArguments("--disable-popup-blocking");
options.addArguments("no-sandbox");
options.addArguments("disable-extensions");
// options.addArguments("no-default-browser-check");
// options.headless();
let service = new chrome_1.ServiceBuilder(path_1.join(__dirname, '../chromedriver.exe')).build();
chrome_1.setDefaultService(service);
let builder = new selenium_webdriver_1.Builder().setChromeOptions(options).withCapabilities(selenium_webdriver_1.Capabilities.chrome()).forBrowser('chrome');
let driver = builder.build();
function alimama() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield driver.get(web_conf_1.default.alimama);
            // 浏览器可能还没渲染完毕等待3秒
            yield driver.sleep(3000);
            let loginFrame = yield driver.findElement(selenium_webdriver_1.By.xpath('//*[@id="mx_n_18"]/div/iframe'));
            yield driver.switchTo().frame(loginFrame);
            let userNameInput = yield driver.findElement(selenium_webdriver_1.By.xpath('//*[@id="fm-login-id"]'));
            yield userNameInput.sendKeys(data_conf_1.default.userName);
            yield commons_1.sleep(Math.random());
            let passwordInput = yield driver.findElement(selenium_webdriver_1.By.xpath('//*[@id="fm-login-password"]'));
            yield passwordInput.sendKeys(data_conf_1.default.password);
            yield commons_1.sleep(Math.random());
            yield commons_1.moveSimulation(driver, 'nc_1_n1z');
            let submitBtn = yield driver.findElement(selenium_webdriver_1.By.xpath('//*[@id="login-form"]/div[4]/button'));
            yield submitBtn.click();
            let cookies = yield driver.manage().getCookies();
            console.log(cookies);
        }
        finally {
            yield driver.quit();
        }
    });
}
exports.alimama = alimama;
// https://blog.csdn.net/fengxiaoxiao_1/article/details/77073918
