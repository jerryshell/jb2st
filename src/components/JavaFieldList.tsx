import { useRecoilValue } from 'recoil'
import selectors from '../selectors'

const JavaFieldList = () => {
  const javaFieldList = useRecoilValue(selectors.javaFieldList)

  return (
    <fieldset>
      <legend>Java Field List</legend>
      <table>
        <thead>
        <tr>
          <th>Type</th>
          <th>Name</th>
        </tr>
        </thead>
        <tbody>
        {javaFieldList.map((javaField) => (
          <tr key={javaField.name}>
            <td>
              <code>{javaField.type}</code>
            </td>
            <td>
              <code>{javaField.name}</code>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </fieldset>
  )
}

export default JavaFieldList
