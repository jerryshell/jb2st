import {useRecoilState, useRecoilValue} from 'recoil'
import atoms from '../atoms'
import {useEffect} from 'react'
import SqlField from '../interfaces/SqlField'
import {camelCase2SnakeCase, javaType2SqlType} from '../util'

const SqlFieldList = () => {
    const javaFieldList = useRecoilValue(atoms.javaFieldList)

    const [sqlFieldList, setSqlFieldList] = useRecoilState(atoms.sqlFieldList)

    useEffect(() => {
        const sqlFieldList = javaFieldList.map((javaField) => {
            return {
                type: javaType2SqlType(javaField.type),
                name: camelCase2SnakeCase(javaField.name),
                primaryKeyFlag: javaField.primaryKeyFlag,
            } as SqlField
        })
        console.log('sqlFieldList', sqlFieldList)
        setSqlFieldList(sqlFieldList)
    }, [javaFieldList])

    return (
        <fieldset>
            <legend>SQL Field List</legend>
            {sqlFieldList.map((sqlField) => {
                return (
                    <div key={sqlField.name}>
                        <code>{sqlField.type} {sqlField.name}</code>
                    </div>
                )
            })}
        </fieldset>
    )
}

export default SqlFieldList
