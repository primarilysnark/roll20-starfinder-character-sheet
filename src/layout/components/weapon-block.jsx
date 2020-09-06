const React = require('react')

const Grid = require('./grid')

function WeaponBlock() {
  return (
    <React.Fragment>
      <Grid>
        <Grid.Header>
          <Grid.Spacer size="80px" />
          <Grid.Label align="left" size="8fr">
            Name
          </Grid.Label>
          <Grid.Label size="2fr">Attack</Grid.Label>
          <Grid.Label size="4fr">Damage</Grid.Label>
          <Grid.Label size="3fr">Capacity</Grid.Label>
        </Grid.Header>

        <Grid.Row>
          <Grid.BlockLabel>Ranged</Grid.BlockLabel>
          <Grid.Label>Rotolaser, Tactical</Grid.Label>
          <Grid.Label align="center">+5</Grid.Label>
          <Grid.Label align="center">1d8+3 fire</Grid.Label>
          <Grid.Label align="center">19 / 20</Grid.Label>
        </Grid.Row>
      </Grid>
      <Grid>
        <Grid.Header>
          <Grid.Spacer size="80px" />
          <Grid.Spacer size="1fr" />
        </Grid.Header>

        <Grid.FullWidth>
          <div>
            <Grid.BlockLabel floating>Single</Grid.BlockLabel>
            <Grid.BlockLabel floating>Full</Grid.BlockLabel>
            <Grid.BlockLabel floating>Automatic</Grid.BlockLabel>
            <Grid.Toggle floating>Plasma Sheath</Grid.Toggle>
            <Grid.Toggle floating isActive>
              Bipod
            </Grid.Toggle>
          </div>
        </Grid.FullWidth>
      </Grid>
    </React.Fragment>
  )
}

module.exports = WeaponBlock
