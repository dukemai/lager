import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Segment, Progress, Button, Sticky, Label, List } from 'semantic-ui-react';

const propTypes = {
  companyName: PropTypes.string,
  distributorName: PropTypes.string,
  categoryName: PropTypes.string,
};
const defaultProps = {
  companyName: '',
  distributorName: '',
  categoryName: '',
};

const RightPanel = ({ companyName, distributorName, categoryName }) => (
  <Sticky>
    <Segment color="olive">
      <Button loading positive>
        Save Product
      </Button>
    </Segment>
    <Segment color="olive">
      <List color="blue" divided selection>
        <List.Item>
          <div className="manufacturerForm__rightPanel__label">
            Company
          </div>
          <Label content={companyName} onRemove={()=>{}} color="blue" removeIcon="delete" />
        </List.Item>
        <List.Item>
          <div className="manufacturerForm__rightPanel__label">
            Distributor
          </div>
          <Label content={distributorName} onRemove={()=>{}} color="blue" removeIcon="delete" />
        </List.Item>
        <List.Item>
          <div className="manufacturerForm__rightPanel__label">
            Category
          </div>
          <Label content={categoryName} color="blue" onRemove={()=>{}} removeIcon="delete" />
        </List.Item>
      </List>
    </Segment>
    <Segment>
      <Progress color="blue" size="small" percent={33.3} active>
        Creating product
      </Progress>
    </Segment>
  </Sticky>
);

RightPanel.propTypes = propTypes;
RightPanel.defaultProps = defaultProps;

const mapStateToProps = state => ({
  companyName: state.addProductToStock.companyName,
  distributorName: state.addProductToStock.distributorName,
  categoryName: state.addProductToStock.categoryName,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(RightPanel);
