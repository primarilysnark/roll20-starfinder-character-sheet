/* global getAttrs: false, on: false, setAttrs: false */
export const addEventListener = (name, listener) => on(name, listener)

export const getAttributes = (names, callback) => getAttrs(names, callback)

export const setAttributes = (attributeMap, options) => setAttrs(attributeMap, options)
