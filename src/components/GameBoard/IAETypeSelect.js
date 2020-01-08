import React from 'react'
import PropTypes from 'prop-types'
import { Container, Dropdown, Image } from 'semantic-ui-react'
import mapLegend from '../../config/mapLegend'

const IAETypeSelect = (props) => {
  const { iaeGroupSelected, iaeTypeSelected, onIAETypeChange } = props

  const iaeSelected = mapLegend[iaeGroupSelected].iaeList[iaeTypeSelected]

  return (
    <Container>
      <Dropdown
        fluid
        button
        scrolling
        trigger={
          <span>
            <Image
              src={iaeSelected.iaeLegend}
              verticalAlign='middle'
              spaced='right'
            />
            {iaeSelected.iaeName}
          </span>
        }
      >
        <Dropdown.Menu>
          {
            mapLegend.map((group, groupIndex) => ([

              <Dropdown.Header key={groupIndex} icon='pencil' content={group.iaeGroup} />,

              group.iaeList.map((iae, iaeIndex) => (
                <Dropdown.Item
                  key={groupIndex + '' + iaeIndex}
                  value={groupIndex + '' + iaeIndex}
                  image={{ src: iae.iaeLegend, size: 'mini' }}
                  text={iae.iaeName}
                  active={iaeGroupSelected === groupIndex && iaeTypeSelected === iaeIndex}
                  selected={iaeGroupSelected === groupIndex && iaeTypeSelected === iaeIndex}
                  onClick={() => onIAETypeChange(groupIndex, iaeIndex)}
                />
              )
              ),
              groupIndex !== mapLegend.length - 1 && <Dropdown.Divider />
            ])
            )
          }
        </Dropdown.Menu>
      </Dropdown>
    </Container>
  )
}

IAETypeSelect.propTypes = {
  iaeGroupSelected: PropTypes.number.isRequired,
  iaeTypeSelected: PropTypes.number.isRequired,
  onIAETypeChange: PropTypes.func.isRequired
}

IAETypeSelect.defaultProps = {
  iaeGroupSelected: 0,
  iaeTypeSelected: 0
}

export default IAETypeSelect
