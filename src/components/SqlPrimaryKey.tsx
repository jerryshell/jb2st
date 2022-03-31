import {useRecoilValue} from 'recoil'
import atoms from '../atoms'

const SqlPrimaryKey = () => {
    const sqlFieldList = useRecoilValue(atoms.sqlFieldList)

    return (
        <fieldset>
            <legend>SQL Primary Key</legend>
            <code>
                {
                    sqlFieldList.filter((sqlField) => sqlField.primaryKeyFlag)
                        .map((sqlField) => sqlField.name)
                        .join(', ')
                }
            </code>
        </fieldset>
    )
}

export default SqlPrimaryKey
