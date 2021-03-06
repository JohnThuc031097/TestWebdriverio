import { remote } from 'webdriverio'

import * as utils from './utils.js';
import * as handle from "./handle.js";

const capabilities = {
    platformName: 'Android',
    automationName: 'UiAutomator2',
    appPackage: 'com.instagram.android',
    appActivity: 'com.instagram.mainactivity.MainActivity',
    noReset: true,
    dontStopAppOnReset: true
}
const serverConfig = {
    host: 'localhost',
    port: 4723,
    path: '/wd/hub',
    logLevel: 'silent'
}

const driver = await remote({ capabilities, ...serverConfig });

await handle.switch_screen(driver, 'Profile')
await handle.switch_screen(driver, 'Options')
await handle.switch_screen(driver, 'Saved')
const items = await handle.get_all_saved_collection(driver)
await handle.select_item_saved(driver, items, 1)

