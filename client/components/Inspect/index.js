import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router';
import { Menu, Grid, Header, Sticky } from 'semantic-ui-react';

import { AuthenticatedLayout, MenuItem } from '../share';
import Right from './Right';
import ProductTable from './ProductTable';
import InspectCompany from '../InspectCompany';
import InspectDistributor from '../InspectDistributor';
import InspectCategory from '../InspectCategory';
import InspectUnit from '../InspectUnit';

import './styles.styl';

const propTypes = {

};
const defaultProps = {

};

class Inspect extends React.Component {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  state = {
  }

  render() {
    return (
      <AuthenticatedLayout>
        <Grid padded>
          <Grid.Row>
            <Grid.Column textAlign="left" width="12">
              <Header textAlign="left" as="h2">
                Stock
              </Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign="left" width="12">
              <Menu secondary pointing>
                <MenuItem name="Products" path="/inspect" />
                <MenuItem name="Distributors" path="/inspect/distributor" />
                <MenuItem name="Manufacturers" path="/inspect/manufacturer" />
                <MenuItem name="Categories" path="/inspect/category" />
                <MenuItem name="Units" path="/inspect/unit" />
              </Menu>
              <Switch>
                <Route exact path="/inspect" component={ProductTable} />
                <Route exact path="/inspect/manufacturer" component={InspectCompany} />
                <Route exact path="/inspect/distributor" component={InspectDistributor} />
                <Route exact path="/inspect/category" component={InspectCategory} />
                <Route exact path="/inspect/unit" component={InspectUnit} />
              </Switch>
            </Grid.Column>
            <Grid.Column width="4">
              <Sticky>
                <Right />
              </Sticky>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </AuthenticatedLayout>
    );
  }
}

Inspect.propTypes = propTypes;
Inspect.defaultProps = defaultProps;

export default Inspect;
