

import './index.css'

// type Bbutton = { children:String, type:any, variant:String, className:string, onClick:any, href:any }

const Button = ({ children, type, variant, className, onClick, href }) => {
  const classButton = ['btn']


  if (variant !== 'primary') {
    classButton.push(`btn--${variant}`)
  }

  if (className !== '') {
    classButton.push(className)
  }

  if (href) {
    classButton.push('btn--link')

    return (
      <a href={href} className={classButton.join(' ')}>{children}</a>
    )
  }

  return (
    <button type={type} className={classButton.join(' ')} onClick={onClick}>{children}</button>
  )
}

export default Button;