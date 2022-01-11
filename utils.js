export const get_all_user_in_account = async (driver) => {
    let users = []
    let eParent = find_by_id(driver, 'layout_container_bottom_sheet')
    eParent = await driver.findElementFromElement(eParent['ELEMENT'], 'class name', 'android.widget.ListView')
    const eChildOfParent = await driver.findElementsFromElement(eParent['ELEMENT'], 'class name', 'android.widget.LinearLayout')
    for (const eChild of eChildOfParent) {
        let eRadioCheck = await driver.findElementsFromElement(eChild['ELEMENT'], 'class name', 'android.widget.ImageView')
        if (eRadioCheck.length > 1) {
            eRadioCheck = await driver.getElementAttribute(eRadioCheck[1]['ELEMENT'], 'resource-id')
            if (eRadioCheck == 'com.instagram.android:id/check') {
                let eName = await driver.findElementsFromElement(eChild['ELEMENT'], 'class name', 'android.widget.TextView')
                users.push({
                    id: eChild['ELEMENT'],
                    name: await driver.getElementAttribute(eName[0]['ELEMENT'], 'text'),
                    isSelected: await driver.isElementSelected(eChild['ELEMENT'])
                })
            }
        }
    }
    return users;
}

export const set_action = async (driver, actions) => {
    await driver.touchPerform(actions);
}

export const find_by_id = async (driver, id) => {
    let element = await driver.findElement('id', `com.instagram.android:id/${id}`)
    if (element != null) return element['ELEMENT']
    return null
}

export const finds_by_id = async (driver, id) => {
    let result = []
    let elements = await driver.findElements('id', `com.instagram.android:id/${id}`)
    if (elements.length > 0) {
        elements.forEach(e => {
            result.push(e['ELEMENT'])
        });
        return result
    }
    return null
}

export const find_by_class = async (driver, className) => {
    let element = await driver.findElement('class name', className)
    if (element != null) return element['ELEMENT']
    return null
}

export const finds_by_class = async (driver, className) => {
    let result = []
    let elements = await driver.findElements('class name', className)
    if (elements.length > 0) {
        elements.forEach(e => {
            result.push(e['ELEMENT'])
        });
        return result
    }
    return null
}

export const find_by_accessibility_id = async (driver, accessibilityId) => {
    let element = await driver.findElement('accessibility id', accessibilityId)
    if (element != null) return element['ELEMENT']
    return null
}

export const finds_by_accessibility_id = async (driver, accessibilityId) => {
    let result = []
    let elements = await driver.findElements('accessibility id', accessibilityId)
    if (elements.length > 0) {
        elements.forEach(e => {
            result.push(e['ELEMENT'])
        });
        return result
    }
    return null
}