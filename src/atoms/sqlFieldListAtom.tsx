import {atom} from 'recoil'
import SqlField from '../interfaces/SqlField'

const sqlFieldListAtom = atom({
    key: 'sqlFieldList',
    default: [] as SqlField[],
})

export default sqlFieldListAtom
