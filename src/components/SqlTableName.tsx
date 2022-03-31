import {useRecoilState, useRecoilValue} from 'recoil'
import atoms from '../atoms'
import {useEffect} from 'react'
import {camelCase2SnakeCase} from '../util'

const SqlTableName = () => {
    const javaClassName = useRecoilValue(atoms.javaClassName)

    const [sqlTableName, setSqlTableName] = useRecoilState(atoms.sqlTableName)

    useEffect(() => {
        const sqlTableName = camelCase2SnakeCase(javaClassName)
        console.log('sqlTableName', sqlTableName)
        setSqlTableName(sqlTableName)
    }, [javaClassName])

    return (
        <fieldset>
            <legend>SQL Table Name</legend>
            <code>{sqlTableName}</code>
        </fieldset>
    )
}

export default SqlTableName
