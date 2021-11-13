export default {
  btn: [
    'my-2',
    'py-2',
    'px-8',
    'text-sm', 
    'rounded',
    ''
  ].join(' '),
  btnGreen: [
    'bg-myGr-light',
    'text-white',
    'focus:bg-myGr-dark',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-2',
    'focus:ring-myGr-dark',
    ''
  ].join(' '),
  btnDisabled: ({disabled}) => [
    disabled ? 
    'bg-myGr-disabled ' 
    : ' '
  ]

}
