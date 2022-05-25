import { useRecoilState, useRecoilValue } from 'recoil'
import atoms from '../atoms'
import { useEffect } from 'react'
import { camelCase2SnakeCase } from '../util'

const SqlTableName = () => {
    const javaClassName = useRecoilValue(atoms.javaClassName)

    const [sqlTableNamePrefix, setSqlTableNamePrefix] = useRecoilState(atoms.sqlTableNamePrefix)
    const [sqlTableName, setSqlTableName] = useRecoilState(atoms.sqlTableName)

    useEffect(() => {
        const sqlTableName = sqlTableNamePrefix + camelCase2SnakeCase(javaClassName)
        console.log('sqlTableName', sqlTableName)
        setSqlTableName(sqlTableName)
    }, [javaClassName, sqlTableNamePrefix])

    return (
        <>
            <fieldset>
                <legend>SQL Table Name Prefix</legend>
                <input
                    type="text"
                    value={ sqlTableNamePrefix }
                    onChange={ (e) => setSqlTableNamePrefix(e.target.value) }
                />
            </fieldset>
            <fieldset>
                <legend>SQL Table Name</legend>
                <code>{ sqlTableName }</code>
            </fieldset>
        </>
    )
}

export default SqlTableName
