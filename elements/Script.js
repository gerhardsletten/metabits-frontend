import React from 'react'

const Script = ({children}) => (
  <script dangerouslySetInnerHTML={{__html: `(${children.toString()})();`}} />
)

export default Script
