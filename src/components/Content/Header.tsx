import React from 'react'

export const generateId = (text: string = '') => {
  return text
    .trim()
    .split(/\s/g)
    .map(s => s.replace(/[^\w\s]/g, ''))
    .join('-')
    .toLowerCase()
}

export const Anchor = ({
  id,
  children
}: {
  id: string
  children: React.ReactNode
}) => {
  return <a href={`#${generateId(id)}`}>{id || children}</a>
}

const Header = Component => ({ children }) => {
  return <Component id={generateId(children)}>{children}</Component>
}

export default Header
