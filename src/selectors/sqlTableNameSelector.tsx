import {selector} from 'recoil'
import {camelCase2SnakeCase} from '../util'
import javaClassNameSelector from './javaClassNameSelector'
import sqlTableNamePrefixAtom from '../atoms/sqlTableNamePrefixAtom'

const sqlTableNameSelector = selector({
    key: 'sqlTableName',
    get: ({get}) => {
        return get(sqlTableNamePrefixAtom) + camelCase2SnakeCase(get(javaClassNameSelector))
    },
})

export default sqlTableNameSelector
