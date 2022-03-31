import {useRecoilState, useRecoilValue} from 'recoil'
import atoms from '../atoms'
import {useEffect} from 'react'

const SqlTableCode = () => {
    const sqlTableName = useRecoilValue(atoms.sqlTableName)
    const sqlFieldList = useRecoilValue(atoms.sqlFieldList)

    const [sqlTableCode, setSqlTableStr] = useRecoilState(atoms.sqlTableCode)

    useEffect(() => {
        let sqlTableCode = `CREATE TABLE ${sqlTableName} (\n`
        let hasPrimaryKey = false
        sqlFieldList.forEach((sqlField, index) => {
            sqlTableCode += `\t${sqlField.name} ${sqlField.type}`
            if (!hasPrimaryKey && sqlField.primaryKeyFlag) {
                hasPrimaryKey = true
            }
            if (index < sqlFieldList.length - 1) {
                sqlTableCode += ',\n'
            }
            if (index === sqlFieldList.length - 1 && hasPrimaryKey) {
                sqlTableCode += ',\n'
            }
        })
        if (hasPrimaryKey) {
            const primaryKeyFieldList = sqlFieldList.filter((sqlField) => sqlField.primaryKeyFlag)
            const primaryKeyFieldListStr = primaryKeyFieldList.map((sqlField) => sqlField.name).join(', ')
            sqlTableCode += `\tPRIMARY KEY (${primaryKeyFieldListStr})`
        }
        sqlTableCode += '\n);'
        console.log('sqlTableCode', sqlTableCode)
        setSqlTableStr(sqlTableCode)
    }, [sqlFieldList])

    const copySqlTableStr2Clipboard = () => {
        window.navigator.clipboard.writeText(sqlTableCode).then(r => {
            console.log('copySqlTableStr2Clipboard', r)
        })
    }

    return (
        <fieldset>
            <legend>SQL Table Code</legend>
            <textarea
                style={{height: "220px"}}
                disabled
                value={sqlTableCode}
                onChange={e => setSqlTableStr(e.target.value)}
            />
            <button onClick={copySqlTableStr2Clipboard}>Copy To Clipboard</button>
        </fieldset>
    )
}

export default SqlTableCode
