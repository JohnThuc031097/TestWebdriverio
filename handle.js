import * as utils from './utils.js'

export const switch_user = async (driver, index) => {
    console.log('[Action] Get ID Tab Profile');
    const idTabProfile = await utils.find_by_accessibility_id(driver, 'Profile')
    console.log(`=> ${idTabProfile}`);
    console.log('[Action] Long click Tab Profile');
    await set_action(driver, 'longPress', idTabProfile)
    console.log('[Action] Get all user in account');
    let users = await utils.get_all_user_in_account(driver)
    console.log(users);
    if (!users[index]['isSelected']) {
        console.log(`[Action] Select user [${users[index]['name']}]`);
        await set_action(driver, 'tap', users[index]['id'])
    }
}

export const switch_screen = async (driver, screen) => {
    let nameScreen = screen.trim()
    console.log(`[Action] Screen ${nameScreen}`);
    switch (nameScreen) {
        case 'Profile':
            const eProfile = await utils.find_by_accessibility_id(driver, nameScreen)
            await driver.elementClick(eProfile)
            driver.setTimeouts(2000)
            break
        case 'Options':
            const eOptions = await utils.find_by_accessibility_id(driver, nameScreen)
            await driver.elementClick(eOptions)
            driver.setTimeouts(2000)
            break
        case 'Saved':
            const eSaved = await utils.find_by_accessibility_id(driver, nameScreen)
            await driver.elementClick(eSaved)
            driver.setTimeouts(2000)
            const eSavedCollection = await utils.find_by_id(driver, 'saved_collection_thumbnail')
            await driver.elementClick(eSavedCollection)
            driver.setTimeouts(2000)
            break
        default:
            break
    }
}

export const select_item_saved = async (driver, items, index) => {
    console.log('[Action] Select item saved');
    await driver.elementClick(items[index])
    driver.setTimeouts(2000)
    const eOption = await utils.find_by_id(driver, 'feed_more_button_stub')
    if (eOption != null) {
        await driver.elementClick(eOption)
        driver.setTimeouts(2000)
    }
}

export const get_all_saved_collection = async (driver) => {
    console.log('[Action] Get all saved collection');
    let result = []
    const eListSaved = await utils.find_by_id(driver, 'recycler_view')
    if (eListSaved != null) {
        const eItems = await utils.finds_child_by_id(driver, eListSaved, 'image_button')
        if (eItems.length > 0) {
            console.log(`[Action] Find ${eItems.length} saved collection`);
            result = eItems
        }
    }
    return result
}

export const get_all_user_in_account = async (driver) => {
    let users = []
    let eParent = await utils.find_by_id(driver, 'layout_container_bottom_sheet')
    eParent = await utils.find_child_by_class(driver, eParent, 'android.widget.ListView')
    const eChildOfParent = await utils.finds_child_by_class(driver, eParent, 'android.widget.LinearLayout')
    driver.setTimeouts(timeout * 2)
    for (const eChild of eChildOfParent) {
        let eRadioCheck = await utils.finds_child_by_class(driver, eChild, 'android.widget.ImageView')
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
    return users;
}

export const set_action = async (driver, action, element, timeout = 2000) => {
    await driver.touchPerform([{
        action,
        options: {
            element
        }
    }])
    driver.setTimeouts(timeout)
}