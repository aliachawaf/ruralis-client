import React from 'react'
import { PDFReader } from 'reactjs-pdf-reader'
import rules from '../../assets/gameRules.pdf'

const GameRules = () => (

  <PDFReader
    url={rules}
    showAllPage
    scale={1.5}
  />
)

export default GameRules
