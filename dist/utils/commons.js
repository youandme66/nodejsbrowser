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
/**
 * 让进程睡眠time时间
 * 如果time<10,则认为是秒*1000
 * time>10时认为是毫秒
 * @param time
 */
function sleep(time) {
    if (time < 10) {
        time *= 1000;
    }
    return new Promise((reslove) => {
        setTimeout(() => {
            reslove();
        }, time);
    });
}
exports.sleep = sleep;
/**
 * 是否有滑动
 * @param driver
 */
function hasMove(driver) {
    return __awaiter(this, void 0, void 0, function* () {
        let captchaElement = yield driver.findElement(selenium_webdriver_1.By.id('nocaptcha-password'));
        return captchaElement.isDisplayed();
    });
}
exports.hasMove = hasMove;
/**
 * 模拟滑动
 * @param driver
 */
function moveSimulation(driver, id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (hasMove(driver)) {
            let actions = driver.actions();
            let element = yield driver.findElement(selenium_webdriver_1.By.id(id));
            let dragEleContainer = yield driver.findElement(selenium_webdriver_1.By.id('nc_1_n1t'));
            let containerSize = yield dragEleContainer.getSize();
            actions.dragAndDrop(element, { x: containerSize.width });
            yield actions.perform();
        }
    });
}
exports.moveSimulation = moveSimulation;
