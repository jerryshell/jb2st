import { selector } from 'recoil';
import javaBeanCodeAtom from '../atoms/javaBeanCodeAtom';

const javaClassNameSelector = selector({
  key: 'javaClassName',
  get: ({ get }) => {
    const javaClassNameMatchResult = get(javaBeanCodeAtom).match(/public class (\w+)/)
    if (!javaClassNameMatchResult) {
      return ''
    }
    return javaClassNameMatchResult[1]
  }
})

export default javaClassNameSelector
