import { useRecoilState, useRecoilValue } from 'recoil'
import atoms from '../atoms'
import sqlTableNameSelector from '../selectors/sqlTableNameSelector';

const SqlTableName = () => {
  const sqlTableName = useRecoilValue(sqlTableNameSelector)

  const [sqlTableNamePrefix, setSqlTableNamePrefix] = useRecoilState(atoms.sqlTableNamePrefix)

  return (
    <>
      <fieldset>
        <legend>SQL Table Name Prefix</legend>
        <input
          type="text"
          value={sqlTableNamePrefix}
          onChange={(e) => setSqlTableNamePrefix(e.target.value)}
        />
      </fieldset>
      <fieldset>
        <legend>SQL Table Name</legend>
        <code>{sqlTableName}</code>
      </fieldset>
    </>
  )
}

export default SqlTableName
