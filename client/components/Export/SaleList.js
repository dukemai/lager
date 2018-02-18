import React from 'react';
import { List, Icon, Button, Segment } from 'semantic-ui-react';

const SaleList = () => (
  <List relaxed>
    <List.Item>
      <Segment>
        <div>
          But Bi Thien Long
        </div>
        <div>
          Quantity: 2
        </div>
        <div>
          Price: 2,000
        </div>
        <div>
          Total: 4,000
        </div>
        <div>
          <Button icon>
            <Icon name="edit" />
          </Button>
          <Button icon>
            <Icon name="remove" />
          </Button>
        </div>
      </Segment>
    </List.Item>
    <List.Item>
      <Segment>
        <div>
          But Xoa Thien Long
        </div>
        <div>
          Quantity: 2
        </div>
        <div>
          Price: 2,000
        </div>
        <div>
          Total: 4,000
        </div>
        <div>
          <Button icon>
            <Icon name="edit" />
          </Button>
          <Button icon>
            <Icon name="remove" />
          </Button>
        </div>
      </Segment>
    </List.Item>
  </List>
);

export default SaleList
