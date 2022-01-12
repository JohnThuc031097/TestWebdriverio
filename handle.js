import * as utils from './utils.js'

export const switch_user = async (driver, index) => {
    console.log('[Switch User] Begin');
    console.log('[Switch User] Get ID Tab Profile');
    const idTabProfile = await utils.find_by_accessibility_id(driver, 'Profile')
    console.log(`=> ${idTabProfile}`);

    console.log('[Switch User] Long click Tab Profile');
    await utils.set_action(driver, 'longPress', idTabProfile)

    console.log('[Switch User] Get all user in account');
    let users = await utils.get_all_user_in_account(driver)
    console.log(users);
    if (!users[index]['isSelected']) {
        console.log(`[Action] Select user [${users[index]['name']}]`);
        await utils.set_action(driver, 'tap', users[index]['id'])
    }
    console.log('[Switch User] End');
}

export const switch_screen = async (driver, screen) => {
    console.log('[Switch Screen] Begin');
    console.log(`[Switch Screen] Screen ${screen}`);
    switch (screen) {
        case 'profile':
            const idProfile = await utils.find_by_accessibility_id(driver, 'Profile')
            await driver.elementClick(idProfile)
            break;
        case 'option':
            const idOption = await utils.find_by_accessibility_id(driver, 'Options')
            await driver.elementClick(idOption)
            break;
        default:
            break;
    }
    console.log('[Switch Screen] End');
}

export const get_all_user_in_account = async (driver) => {
    let users = []
    let eParent = await utils.find_by_id(driver, 'layout_container_bottom_sheet')
    eParent = await utils.find_child_by_class(driver, eParent, 'android.widget.ListView')
    const eChildOfParent = await utils.finds_child_by_class(driver, eParent, 'android.widget.LinearLayout')
    for (const eChild of eChildOfParent) {
        let eRadioCheck = await utils.finds_child_by_class(driver, eChild, 'android.widget.ImageView')
        if (eRadioCheck != null) {
            if (eRadioCheck.length > 1) {
                eRadioCheck = await driver.getElementAttribute(eRadioCheck[1], 'resource-id')
                if (eRadioCheck == 'com.instagram.android:id/check') {
                    let eName = await utils.finds_child_by_class(driver, eChild, 'android.widget.TextView')
                    users.push({
                        id: eChild,
                        name: await driver.getElementAttribute(eName[0], 'text'),
                        isSelected: await driver.isElementSelected(eChild)
                    })
                }
            }
        }
    }
    return users;
}

export const set_action = async (driver, action, element) => {
    await driver.touchPerform([{
        action,
        options: {
            element
        }
    }])
}