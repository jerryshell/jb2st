import './App.css'
import ProjectInfo from './components/ProjectInfo'
import JavaBeanCode from './components/JavaBeanCode'
import JavaClassName from './components/JavaClassName'
import JavaFieldList from './components/JavaFieldList'
import SqlTableName from './components/SqlTableName'
import SqlFieldList from './components/SqlFieldList'
import JavaType2SqlTypeMapConfig from './components/JavaType2SqlTypeMapConfig'
import SqlTableCode from './components/SqlTableCode'

const App = () => {
    return (
        <>
            <h1>Java Bean 2 SQL Table</h1>
            <ProjectInfo/>
            <JavaBeanCode/>
            <JavaClassName/>
            <JavaFieldList/>
            <SqlTableName/>
            <SqlFieldList/>
            <JavaType2SqlTypeMapConfig/>
            <SqlTableCode/>
        </>
    )
}

export default App
