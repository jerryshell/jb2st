import { selector } from 'recoil';
import atoms from '../atoms';

const javaClassNameSelector = selector({
  key: 'javaClassName',
  get: ({ get }) => {
    const javaClassNameMatchResult = get(atoms.javaBeanCode).match(/public class (\w+)/)
    if (!javaClassNameMatchResult) {
      return ''
    }
    return javaClassNameMatchResult[1]
  }
})

export default javaClassNameSelector
