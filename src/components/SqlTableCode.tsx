import { useRecoilState, useRecoilValue } from 'recoil'
import atoms from '../atoms'
import { useEffect } from 'react'
import CopyIcon from '../icons/CopyIcon'
import SqlIcon from '../icons/SqlIcon'
import sqlTableNameSelector from '../selectors/sqlTableNameSelector';

const SqlTableCode = () => {
  const sqlTableName = useRecoilValue(sqlTableNameSelector)
  const sqlFieldList = useRecoilValue(atoms.sqlFieldList)

  const [dropTableIfExists, setDropTableIfExists] = useRecoilState(atoms.dropTableIfExists)
  const [sqlTableCode, setSqlTableCode] = useRecoilState(atoms.sqlTableCode)

  useEffect(() => {
    const hasPrimaryKey = sqlFieldList.some(sqlField => sqlField.primaryKeyFlag)
    console.log('hasPrimaryKey', hasPrimaryKey)

    // DROP TABLE IF EXISTS
    const dropTableIfExistsStatement = dropTableIfExists ? `DROP TABLE IF EXISTS ${sqlTableName};\n\n` : ''
    console.log('dropTableIfExistsStatement', dropTableIfExistsStatement)

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
    const sqlTableCode = `${dropTableIfExistsStatement}${sqlTableHeaderStatement}${sqlTableFieldStatement}${sqlTablePrimaryKeyStatement}${sqlTableFooterStatement}`
    console.log('sqlTableCode', sqlTableCode)

    setSqlTableCode(sqlTableCode)
  }, [dropTableIfExists, sqlFieldList, sqlTableName])

  const copySqlTableCode2Clipboard = () => {
    window.navigator.clipboard.writeText(sqlTableCode).then(r => {
      console.log('copySqlTableCode2Clipboard', r)
    })
  }

  return (
    <fieldset>
      <legend><SqlIcon/> SQL Table Code</legend>
      <label>
        <span>DROP TABLE IF EXISTS</span>
        <input
          type="checkbox"
          checked={dropTableIfExists}
          onChange={(e) => setDropTableIfExists(e.target.checked)}
        />
      </label>
      <textarea
        style={{ height: '220px' }}
        value={sqlTableCode}
        onChange={e => setSqlTableCode(e.target.value)}
      />
      <button onClick={copySqlTableCode2Clipboard}>
        <CopyIcon/> Copy
      </button>
    </fieldset>
  )
}

export default SqlTableCode
