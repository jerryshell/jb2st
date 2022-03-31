const camelCase2SnakeCase = (camelCaseStr: string) => {
    let snakeCaseStr = camelCaseStr.replace(/[A-Z]/g, (match) => '_' + match.toLowerCase())
    if (snakeCaseStr.slice(0, 1) === '_') {
        snakeCaseStr = snakeCaseStr.slice(1)
    }
    return snakeCaseStr
}

export {
    camelCase2SnakeCase,
}
