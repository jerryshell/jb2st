import { atom } from 'recoil';

const initJavaType2SqlTypeMap = {
  'String': 'VARCHAR(255)',
  'Integer': 'INT(11)',
  'Long': 'BIGINT',
  'Boolean': 'TINYINT(1)',
  'Date': 'DATETIME',
  'Instant': 'DATETIME',
  'LocalDate': 'DATE',
  'LocalDateTime': 'DATETIME',
  'BigDecimal': 'DECIMAL(10,3)',
} as { [key: string]: string }

const javaType2SqlTypeMapAtom = atom({
  key: 'javaType2SqlTypeMap',
  default: initJavaType2SqlTypeMap,
})

export default javaType2SqlTypeMapAtom
