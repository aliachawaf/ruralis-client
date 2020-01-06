import React from 'react'
import PropTypes from 'prop-types'
import { Container, Dropdown, Image } from 'semantic-ui-react'
import mapLegend from '../../config/mapLegend'

const IAETypeSelect = (props) => {
  const { iaeTypeSelected, onIAETypeChange } = props

  const indexGroupSelected = iaeTypeSelected.charAt(0)
  const indexIaeSelected = iaeTypeSelected.charAt(1)

  const iaeSelectedLegend = mapLegend[indexGroupSelected].iaeList[indexIaeSelected]

  return (
    <Container>
      <Dropdown
        text='IAE'
        fluid
        button
        scrolling
        selection
        trigger={
          <span>
            <Image
              src={iaeSelectedLegend.iaeLegend}
              verticalAlign='middle'
              spaced='right'
            />
            {iaeSelectedLegend.iaeName}
          </span>
        }
      >
        <Dropdown.Menu>
          {
            mapLegend.map((group, groupIndex) => ([

              <Dropdown.Header key={groupIndex} icon='pencil' content={group.iaeGroup} />,

              group.iaeList.map((iae, iaeIndex) =>
                <Dropdown.Item
                  key={groupIndex + '' + iaeIndex}
                  value={groupIndex + '' + iaeIndex}
                  image={{ src: iae.iaeLegend, size: 'mini' }}
                  text={iae.iaeName}
                  active={iaeTypeSelected === groupIndex + '' + iaeIndex}
                  selected={iaeTypeSelected === groupIndex + '' + iaeIndex}
                  onClick={onIAETypeChange}
                />
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
  iaeTypeSelected: PropTypes.string.isRequired,
  onIAETypeChange: PropTypes.func.isRequired
}

IAETypeSelect.defaultProps = {
  iaeTypeSelected: '00'
}

export default IAETypeSelect
