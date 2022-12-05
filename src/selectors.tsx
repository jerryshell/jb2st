import { selector } from 'recoil';
import atoms from './atoms';

export default {
  javaClassName: selector({
    key: 'javaClassName',
    get: ({ get }) => {
      const javaClassNameMatchResult = get(atoms.javaBeanCode).match(/public class (\w+)/)
      console.log('javaClassNameMatchResult', javaClassNameMatchResult)
      if (javaClassNameMatchResult) {
        const javaClassName = javaClassNameMatchResult[1]
        console.log('javaClassName', javaClassName)
        return javaClassName
      }
      return ''
    }
  }),
}
