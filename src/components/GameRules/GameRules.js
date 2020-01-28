import React from 'react'
import { PDFReader } from 'reactjs-pdf-reader'
import rules from '../../assets/gameRules.pdf'
import RuralisHeader from '../common/RuralisHeader'

const breadcrumbSections = [
  { key: 'rules', content: 'Règles du jeu', active: true, as: 'h3' }
]

const GameRules = () => (
  <div>
    <RuralisHeader breadcrumbSections={breadcrumbSections} />
    <PDFReader
      url={rules}
      showAllPage
      scale={1.5}
    />
  </div>
)

export default GameRules
