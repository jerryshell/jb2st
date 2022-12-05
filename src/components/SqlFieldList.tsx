import { useRecoilState, useRecoilValue } from 'recoil'
import atoms from '../atoms'
import { useEffect } from 'react'
import SqlField from '../interfaces/SqlField'
import { camelCase2SnakeCase } from '../util'

const SqlFieldList = () => {
  const javaFieldList = useRecoilValue(atoms.javaFieldList)
  const javaType2SqlTypeMap = useRecoilValue(atoms.javaType2SqlTypeMap)

  const [sqlFieldList, setSqlFieldList] = useRecoilState(atoms.sqlFieldList)

  useEffect(() => {
    const sqlFieldList = javaFieldList.map((javaField) => {
      const sqlType = javaType2SqlTypeMap[javaField.type] ?
        javaType2SqlTypeMap[javaField.type] : 'VARCHAR(255)'
      return {
        type: sqlType,
        name: camelCase2SnakeCase(javaField.name),
        primaryKeyFlag: javaField.name === 'id',
      } as SqlField
    })
    console.log('sqlFieldList', sqlFieldList)
    setSqlFieldList(sqlFieldList)
  }, [javaFieldList, javaType2SqlTypeMap])

  const updateSqlFieldPrimaryKeyFlag = (sqlFieldName: string, primaryKeyFlag: boolean) => {
    const newSqlFieldList = sqlFieldList.map((sqlField) => {
      if (sqlField.name === sqlFieldName) {
        return {
          ...sqlField,
          primaryKeyFlag: primaryKeyFlag,
        }
      }
      return sqlField
    })
    console.log('newSqlFieldList', newSqlFieldList)
    setSqlFieldList(newSqlFieldList)
  }

  return (
    <fieldset>
      <legend>SQL Field List</legend>
      <table>
        <thead>
        <tr>
          <th>Type</th>
          <th>Name</th>
          <th>Primary Key</th>
        </tr>
        </thead>
        <tbody>
        {sqlFieldList.map((sqlField) => {
          return (
            <tr key={sqlField.name}>
              <td>
                <code>{sqlField.type}</code>
              </td>
              <td>
                <code>{sqlField.name}</code>
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={sqlField.primaryKeyFlag}
                  onChange={e => {
                    updateSqlFieldPrimaryKeyFlag(sqlField.name, e.target.checked)
                  }}
                />
              </td>
            </tr>
          )
        })}
        </tbody>
      </table>
    </fieldset>
  )
}

export default SqlFieldList
