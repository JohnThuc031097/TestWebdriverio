import { remote } from 'webdriverio'

import * as utils from './utils.js';

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

console.log('[Action] Get ID Tab Profile');
const idTabProfile = await utils.find_by_id(driver, 'profile_tab')
console.log(`=> ${idTabProfile}`);

console.log('[Action] Long click Tab Profile');
await utils.set_action(driver, [{
    action: 'longPress',
    options: {
        element: idTabProfile
    }
}])

console.log('[Action] Get all user in account');
let users = await utils.get_all_user_in_account(driver)
console.log(users);