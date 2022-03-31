const camelCase2SnakeCase = (camelCaseStr: string) => {
    let snakeCaseStr = camelCaseStr.replace(/[A-Z]/g, (match) => '_' + match.toLowerCase())
    if (snakeCaseStr.slice(0, 1) === '_') {
        snakeCaseStr = snakeCaseStr.slice(1)
    }
    return snakeCaseStr
}

const javaType2SqlType = (javaType: string) => {
    switch (javaType) {
        case 'Integer':
            return 'INT(11)'
        case 'Long':
            return 'BIGINT'
        case 'String':
            return 'VARCHAR(255)'
        case 'Boolean':
            return 'TINYINT(4)'
        case 'Date':
            return 'DATETIME'
        case 'Instant':
            return 'TIMESTAMP'
        case 'LocalDate':
            return 'DATE'
        case 'BigDecimal':
            return 'DECIMAL(19,3)'
        default:
            return 'VARCHAR(255)'
    }
}

export {
    camelCase2SnakeCase,
    javaType2SqlType
}
