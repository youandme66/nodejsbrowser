import { Driver } from "selenium-webdriver/chrome";
import { By } from "selenium-webdriver";

/**
 * 让进程睡眠time时间
 * 如果time<10,则认为是秒*1000
 * time>10时认为是毫秒
 * @param time 
 */
export function sleep(time: number): Promise<void> {
    if (time < 10) {
        time *= 1000
    }
    return new Promise((reslove) => {
        setTimeout(() => {
            reslove();
        }, time);
    });
}

/**
 * 是否有滑动
 * @param driver 
 */
export async function hasMove(driver: Driver): Promise<boolean> {
    let captchaElement = await driver.findElement(By.id('nocaptcha-password'));
    return captchaElement.isDisplayed();
}

/**
 * 模拟滑动
 * @param driver 
 */
export async function moveSimulation(driver: Driver, id: string): Promise<void> {
    if (hasMove(driver)) {
        let actions = driver.actions();
        let element = await driver.findElement(By.id(id));
        let dragEleContainer = await driver.findElement(By.id('nc_1_n1t'));
        let containerRect = await dragEleContainer.getRect();
        actions.dragAndDrop(element, { x: containerRect.width, y: 0 });
        await actions.perform();
    }
}