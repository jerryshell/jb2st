import { selector } from 'recoil';
import atoms from './atoms';
import JavaField from './interfaces/JavaField';

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
  javaFieldList: selector({
    key: 'javaFieldList',
    get: ({ get }) => {
      const javaFieldLineListMatchResult = get(atoms.javaBeanCode).match(/private (.*);/g)
      console.log('javaFieldLineListMatchResult', javaFieldLineListMatchResult)
      if (!javaFieldLineListMatchResult) {
        return [] as JavaField[]
      }
      return javaFieldLineListMatchResult
        .map((javaFieldLine) => {
          const javaFieldMatchResult = javaFieldLine.match(/private (\w+) (\w+);/)
          if (javaFieldMatchResult) {
            const javaFieldType = javaFieldMatchResult[1]
            const javaFieldName = javaFieldMatchResult[2]
            return {
              type: javaFieldType,
              name: javaFieldName,
            } as JavaField
          }
          return null
        })
        .filter((javaField) => javaField !== null) as JavaField[]
    },
  })
}
