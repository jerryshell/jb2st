import { atom } from 'recoil';

const dropTableIfExistsAtom = atom({
  key: 'dropTableIfExists',
  default: false,
})

export default dropTableIfExistsAtom
