import {atom} from 'recoil'

const sqlTableNamePrefixAtom = atom({
    key: 'sqlTableNamePrefix',
    default: '',
})

export default sqlTableNamePrefixAtom
