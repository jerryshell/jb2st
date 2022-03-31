import {useRecoilState, useRecoilValue} from 'recoil'
import atoms from '../atoms'
import {useEffect} from 'react'
import CopyIcon from '../icons/CopyIcon'
import SqlIcon from '../icons/SqlIcon'

const SqlTableCode = () => {
    const sqlTableName = useRecoilValue(atoms.sqlTableName)
    const sqlFieldList = useRecoilValue(atoms.sqlFieldList)

    const [sqlTableCode, setSqlTableStr] = useRecoilState(atoms.sqlTableCode)

    useEffect(() => {
        const hasPrimaryKey = sqlFieldList.some(sqlField => sqlField.primaryKeyFlag)
        console.log('hasPrimaryKey', hasPrimaryKey)

        // sql header
        const sqlTableHeaderStatement = `CREATE TABLE ${sqlTableName} (\n`
        console.log('sqlTableHeaderStatement', sqlTableHeaderStatement)

        // sql field
        let sqlTableFieldStatement = ''
        sqlFieldList.forEach((sqlField, index) => {
            sqlTableFieldStatement += `\t${sqlField.name} ${sqlField.type}`
            if (hasPrimaryKey || index < sqlFieldList.length - 1) {
                sqlTableFieldStatement += ',\n'
            }
        })
        console.log('sqlTableFieldStatement', sqlTableFieldStatement)

        // sql primary key
        let sqlTablePrimaryKeyStatement = ''
        if (hasPrimaryKey) {
            const primaryKeyFieldList = sqlFieldList.filter((sqlField) => sqlField.primaryKeyFlag)
            const primaryKeyFieldListStr = primaryKeyFieldList.map((sqlField) => sqlField.name).join(', ')
            sqlTablePrimaryKeyStatement = `\tPRIMARY KEY (${primaryKeyFieldListStr})`
        }
        console.log('sqlTablePrimaryKeyStatement', sqlTablePrimaryKeyStatement)

        // sql footer
        const sqlTableFooterStatement = '\n);'
        console.log('sqlTableFooterStatement', sqlTableFooterStatement)

        // combination
        const sqlTableCode = `${sqlTableHeaderStatement}${sqlTableFieldStatement}${sqlTablePrimaryKeyStatement}${sqlTableFooterStatement}`
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
            <legend><SqlIcon/> SQL Table Code</legend>
            <textarea
                style={{height: '220px'}}
                disabled
                value={sqlTableCode}
                onChange={e => setSqlTableStr(e.target.value)}
            />
            <button onClick={copySqlTableStr2Clipboard}>
                <CopyIcon/> Copy
            </button>
        </fieldset>
    )
}

export default SqlTableCode
