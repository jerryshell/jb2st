import {useEffect, useState} from 'react'
import './App.css'

const initJavaBeanCode = `public class JavaBean {
    private Boolean deleteFlag;
    private Instant createTime;
    private Instant updateTime;
    private Long id;
    private String name;
    private Integer age;
    private BigDecimal balance;
}`

const camelCase2SnakeCase = (camelCaseStr: string) => {
    let snakeCaseStr = camelCaseStr.replace(/[A-Z]/g, (match) => {
        return '_' + match.toLowerCase()
    })
    if (snakeCaseStr.slice(0, 1) === '_') {
        snakeCaseStr = snakeCaseStr.slice(1)
    }
    return snakeCaseStr
}

interface JavaField {
    type: string
    name: string
}

interface SqlField {
    type: string
    name: string
    primaryKeyFlag: boolean
}

const javaType2SqlType = (javaType: string) => {
    switch (javaType) {
        case 'Integer':
            return 'INT(11)'
        case 'Long':
            return 'BIGINT'
        case 'String':
            return 'VARCHAR(255)'
        case 'Boolean':
            return 'TINYINT(4)'
        case 'Date':
            return 'DATETIME'
        case 'Instant':
            return 'TIMESTAMP'
        case 'LocalDate':
            return 'DATE'
        case 'BigDecimal':
            return 'DECIMAL(19,3)'
        default:
            return 'VARCHAR(255)'
    }
}

function App() {
    const [javaBeanStr, setJavaBeanStr] = useState(initJavaBeanCode)
    const [sqlTableStr, setSqlTableStr] = useState('')
    const [javaClassName, setJavaClassName] = useState('')
    const [javaFieldList, setJavaFieldList] = useState<JavaField[]>([])
    const [sqlTableName, setSqlTableName] = useState('')
    const [sqlFieldList, setSqlFieldList] = useState<SqlField[]>([])

    useEffect(() => {
        const javaClassNameMatchResult = javaBeanStr.match(/public class (\w+)/)
        console.log('javaClassNameMatchResult', javaClassNameMatchResult)
        if (javaClassNameMatchResult) {
            const javaClassName = javaClassNameMatchResult[1]
            setJavaClassName(javaClassName)

            const sqlTableName = camelCase2SnakeCase(javaClassName)
            console.log('sqlTableName', sqlTableName)
            setSqlTableName(sqlTableName)
        }

        const javaFieldLineListMatchResult = javaBeanStr.match(/private (.*);/g)
        console.log('javaFieldLineListMatchResult', javaFieldLineListMatchResult)
        if (javaFieldLineListMatchResult) {
            const newJavaFieldList = javaFieldLineListMatchResult
                .map((javaFieldLine) => {
                    const javaFieldMatchResult = javaFieldLine.match(/private (\w+) (\w+);/)
                    if (javaFieldMatchResult) {
                        return {
                            type: javaFieldMatchResult[1],
                            name: javaFieldMatchResult[2],
                        } as JavaField
                    }
                    return null
                })
                .filter((javaField) => javaField !== null) as JavaField[]
            console.log('newJavaFieldList', newJavaFieldList)
            setJavaFieldList(newJavaFieldList)
        }

    }, [javaBeanStr])

    useEffect(() => {
        const sqlFieldList = javaFieldList.map((javaField) => {
            return {
                type: javaType2SqlType(javaField.type),
                name: camelCase2SnakeCase(javaField.name),
                primaryKeyFlag: javaField.name === 'id',
            } as SqlField
        })
        setSqlFieldList(sqlFieldList)
    }, [javaFieldList])

    useEffect(() => {
        let sqlTableStr = `CREATE TABLE ${sqlTableName} (\n`
        sqlFieldList.forEach((sqlField, index) => {
            sqlTableStr += `\t${sqlField.name} ${sqlField.type}`
            if (sqlField.primaryKeyFlag) {
                sqlTableStr += ' PRIMARY KEY'
            }
            if (index < sqlFieldList.length - 1) {
                sqlTableStr += ',\n'
            }
        })
        sqlTableStr += '\n);'
        setSqlTableStr(sqlTableStr)
    }, [sqlFieldList])

    const copySqlTableStr2Clipboard = () => {
        window.navigator.clipboard.writeText(sqlTableStr).then(r => {
            console.log('copySqlTableStr2Clipboard', r)
        })
    }

    return (
        <div className="App">
            <h1>Java Bean 2 SQL Table</h1>

            <fieldset>
                <legend>Project Info</legend>
                <table>
                    <tr>
                        <td>Author</td>
                        <td>
                            <a
                                href="https://github.com/jerryshell"
                                target="_blank"
                            >
                                github.com/jerryshell
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td>GitHub</td>
                        <td>
                            <a
                                href="https://github.com/jerryshell/jb2st"
                                target="_blank"
                            >
                                github.com/jerryshell/jb2st
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td>License</td>
                        <td>
                            <a
                                href="https://choosealicense.com/licenses/agpl-3.0"
                                target="_blank"
                            >
                                GNU Affero General Public License v3.0
                            </a>
                        </td>
                    </tr>
                </table>
            </fieldset>

            <fieldset>
                <legend>Java Bean Code</legend>
                <textarea
                    style={{height: "200px"}}
                    value={javaBeanStr}
                    onChange={e => setJavaBeanStr(e.target.value)}
                />
            </fieldset>

            <fieldset>
                <legend>Java Class Name</legend>
                <code>{javaClassName}</code>
            </fieldset>

            <fieldset>
                <legend>Java Field List</legend>
                {javaFieldList.map((javaField) => {
                    return (
                        <div key={javaField.name}>
                            <code>{javaField.type} {javaField.name}</code>
                        </div>
                    )
                })}
            </fieldset>

            <fieldset>
                <legend>SQL Table Name</legend>
                <code>{sqlTableName}</code>
            </fieldset>

            <fieldset>
                <legend>SQL Primary Key</legend>
                <code>
                    {sqlFieldList.filter((sqlField) => sqlField.primaryKeyFlag).map((sqlField) => {
                        return sqlField.name
                    }).join(', ')}
                </code>
            </fieldset>

            <fieldset>
                <legend>SQL Field List</legend>
                {sqlFieldList.map((sqlField) => {
                    return (
                        <div key={sqlField.name}>
                            <code>{sqlField.type} {sqlField.name}</code>
                        </div>
                    )
                })}
            </fieldset>

            <fieldset>
                <legend>SQL Table</legend>
                <textarea
                    style={{height: "200px"}}
                    disabled
                    value={sqlTableStr}
                    onChange={e => setSqlTableStr(e.target.value)}
                />
                <button onClick={copySqlTableStr2Clipboard}>Copy To Clipboard</button>
            </fieldset>
        </div>
    )
}

export default App
