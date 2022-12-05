import { useRecoilState } from 'recoil'
import atoms from '../atoms'
import { useState } from 'react'
import AddIcon from '../icons/AddIcon'
import RemoveIcon from '../icons/RemoveIcon'

const JavaType2SqlTypeMapConfig = () => {
  const [javaType2SqlTypeMap, setJavaType2SqlTypeMap] = useRecoilState(atoms.javaType2SqlTypeMap)
  const [newJavaType, setNewJavaType] = useState('')
  const [newSqlType, setNewSqlType] = useState('')

  const updateJavaType2SqlTypeMap = (javaType: string, sqlType: string) => {
    setJavaType2SqlTypeMap({
      ...javaType2SqlTypeMap,
      [javaType]: sqlType
    })
  }

  const removeJavaType2SqlTypeMap = (javaType: string) => {
    const newJavaType2SqlTypeMap = { ...javaType2SqlTypeMap }
    delete newJavaType2SqlTypeMap[javaType]
    setJavaType2SqlTypeMap(newJavaType2SqlTypeMap)
  }

  return (
    <fieldset>
      <legend>Java Type 2 SQL Type Map Config</legend>
      <table>
        <thead>
        <tr>
          <th>Java Type</th>
          <th>SQL Type</th>
          <th>Action</th>
        </tr>
        </thead>

        <tr>
          <td>
            <input
              type="text"
              value={newJavaType}
              placeholder="New Java Type"
              onChange={(e) => setNewJavaType(e.target.value)}
            />
          </td>
          <td>
            <input
              type="text"
              value={newSqlType}
              placeholder="New SQL Type"
              onChange={(e) => setNewSqlType(e.target.value)}
            />
          </td>
          <td>
            <button
              onClick={() => {
                updateJavaType2SqlTypeMap(newJavaType, newSqlType)
                setNewJavaType('')
                setNewSqlType('')
              }}
            >
              <AddIcon/> Add
            </button>
          </td>
        </tr>

        {Object.keys(javaType2SqlTypeMap).map((javaType) => {
          return (
            <tr key={javaType}>
              <td>
                <code>{javaType}</code>
              </td>
              <td>
                <input
                  type="text"
                  value={javaType2SqlTypeMap[javaType]}
                  onChange={(e) => updateJavaType2SqlTypeMap(javaType, e.target.value)}
                />
              </td>
              <td>
                <button
                  onClick={() => removeJavaType2SqlTypeMap(javaType)}
                >
                  <RemoveIcon/> Remove
                </button>
              </td>
            </tr>
          )
        })}

      </table>
    </fieldset>
  )
}

export default JavaType2SqlTypeMapConfig
