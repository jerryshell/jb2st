import { selector } from 'recoil';
import atoms from '../atoms';
import JavaField from '../interfaces/JavaField';

const javaFieldListSelector = selector({
  key: 'javaFieldList',
  get: ({ get }) => {
    const javaFieldLineListMatchResult = get(atoms.javaBeanCode).match(/private (.*);/g)
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

export default javaFieldListSelector
