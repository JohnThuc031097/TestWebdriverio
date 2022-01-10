import { remote } from 'webdriverio'

const capabilities = {
    platformName: 'Android',
    automationName: 'UiAutomator2',
    appPackage: 'com.instagram.android',
    appActivity: 'com.instagram.mainactivity.MainActivity',
    noReset: true,
    dontStopAppOnReset: true
};
const serverConfig = {
    path: '/wd/hub',
    host: 'localhost',
    port: 4723,
    logLevel: 'info'
};

const client = await remote({ capabilities, ...serverConfig })
console.log(client)

const eProfile = await client.findElement('id', 'com.instagram.android:id/profile_tab')
console.log(eProfile['ELEMENT'])

const boundsProfile = await client.getElementAttribute(eProfile['ELEMENT'], 'bounds')
console.log(boundsProfile)

client.touchPerform([{
    actions:'press',
    options:{
        x: boundsProfile[0]
    }
}])