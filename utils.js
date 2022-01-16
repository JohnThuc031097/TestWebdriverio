
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
    }
    return result
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
    }
    return result
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
    }
    return result
}

export const find_child_by_id = async (driver, eParent, id) => {
    let elementChild = await driver.findElementFromElement(eParent, 'id', `com.instagram.android:id/${id}`)
    if (elementChild != null) return elementChild['ELEMENT']
    return null
}

export const finds_child_by_id = async (driver, eParent, id) => {
    let result = []
    let elementsChild = await driver.findElementsFromElement(eParent, 'id', `com.instagram.android:id/${id}`)
    if (elementsChild.length > 0) {
        elementsChild.forEach(e => {
            result.push(e['ELEMENT'])
        });
    }
    return result
}

export const find_child_by_class = async (driver, eParent, className) => {
    let elementChild = await driver.findElementFromElement(eParent, 'class name', className)
    if (elementChild != null) return elementChild['ELEMENT']
    return null
}

export const finds_child_by_class = async (driver, eParent, className) => {
    let result = []
    let elementsChild = await driver.findElementsFromElement(eParent, 'class name', className)
    if (elementsChild.length > 0) {
        elementsChild.forEach(e => {
            result.push(e['ELEMENT'])
        });
    }
    return result
}

export const find_child_by_accessibility_id = async (driver, eParent, accessibilityId) => {
    let elementChild = await driver.findElementFromElement(eParent, 'accessibility id', accessibilityId)
    if (elementChild != null) return elementChild['ELEMENT']
    return null
}

export const finds_child_by_accessibility_id = async (driver, eParent, accessibilityId) => {
    let result = []
    let elementsChild = await driver.findElementsFromElement(eParent, 'accessibility id', accessibilityId)
    if (elementsChild.length > 0) {
        elementsChild.forEach(e => {
            result.push(e['ELEMENT'])
        });
    }
    return result
}