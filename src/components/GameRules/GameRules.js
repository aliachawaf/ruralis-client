import React from 'react'
import { PDFReader } from 'reactjs-pdf-reader'
import rules from '../../assets/gameRules.pdf'
import RuralisHeader from '../common/RuralisHeader'

const GameRules = () => (
  <div>
    <RuralisHeader title='Règles du jeu' />
    <PDFReader
      url={rules}
      showAllPage
      scale={1.5}
    />
  </div>
)

export default GameRules
