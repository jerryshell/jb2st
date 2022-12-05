import { useRecoilState, useRecoilValue } from 'recoil'
import sqlTableNameSelector from '../selectors/sqlTableNameSelector';
import sqlTableNamePrefixAtom from '../atoms/sqlTableNamePrefixAtom';

const SqlTableName = () => {
  const sqlTableName = useRecoilValue(sqlTableNameSelector)

  const [sqlTableNamePrefix, setSqlTableNamePrefix] = useRecoilState(sqlTableNamePrefixAtom)

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
