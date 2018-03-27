import React, { Component } from 'react';
import { Container, Content, Button, Text, Item, Label, Input, Form } from 'native-base';
import { Actions } from 'react-native-router-flux';
export default class ButtonExample extends Component {
    render() {
        return (
            <Container>
                <Content>
                    <Form>
                        <Item floatingLabel>
                            <Label>Username</Label>
                            <Input />
                        </Item>
                        <Item floatingLabel last>
                            <Label>Password</Label>
                            <Input />
                        </Item>
                        <Button onPress={() => Actions.root()} block >
                            <Text>Click Me! </Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        );
    }
}