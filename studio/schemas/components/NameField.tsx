import {useCallback} from 'react'
import {TextInput, Flex} from '@sanity/ui'
import {set, unset} from 'sanity'

export const NameField = (props) => {
  const {elementProps, onChange, value = ''} = props

  const handleChange = useCallback(
    (event) => {
      const nextValue = event.currentTarget.value
      onChange(nextValue ? set(nextValue) : unset())
    },
    [onChange],
  )

  return (
    <Flex>
      <TextInput {...elementProps} onChange={handleChange} value={value}></TextInput>
      <TextInput {...elementProps} onChange={handleChange} value={value}></TextInput>
    </Flex>
  )
}
