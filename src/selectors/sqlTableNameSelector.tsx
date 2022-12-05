import { selector } from 'recoil';
import atoms from '../atoms';
import { camelCase2SnakeCase } from '../util';
import javaClassNameSelector from './javaClassNameSelector';

const sqlTableNameSelector = selector({
  key: 'sqlTableName',
  get: ({ get }) => {
    return get(atoms.sqlTableNamePrefix) + camelCase2SnakeCase(get(javaClassNameSelector))
  },
})

export default sqlTableNameSelector
