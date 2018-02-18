import React from 'react';

import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { Layout } from '../share';

import './styles.styl';

const Register = () => (
  <Layout>
    <div className="registerForm">
      <Grid
        textAlign="center"
        className="registerForm__grid"
        verticalAlign="middle"
      >
        <Grid.Column>
          <Header className="registerForm__title" as="h2" textAlign="center">
            <Image src="https://react.semantic-ui.com/logo.png" />
            &nbsp;Register new account
					</Header>
          <Form size="large" className="registerForm__content">
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
              />
              <Form.Input
                fluid
                icon="phone"
                iconPosition="left"
                placeholder="Phone number"
                type="text"
              />

              <Button className="registerForm__button--register" fluid size="large">SignUp</Button>
            </Segment>
          </Form>
          <Message>
            Already have account? <a href="/login">Login</a>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  </Layout>
);

export default Register;
