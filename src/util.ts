const camelCase2SnakeCase = (camelCaseStr: string) => {
    const snakeCaseStr = camelCaseStr.replace(/[A-Z]/g, (match) => '_' + match.toLowerCase())
    if (snakeCaseStr.slice(0, 1) === '_') {
        return snakeCaseStr.slice(1)
    }
    return snakeCaseStr
}

export {
    camelCase2SnakeCase,
}
