import React,{Component} from 'react';
import {Container,Icon, Button,Header,Content,Item,Input, Form} from 'native-base';
export default class FormLogin extends Component{
    render() {
      return (
          <Container>
              <Header/>
              <Content>
              <Form>
             

                    <Item>
                        <Input placeholder="Username"/>
                    </Item>
                    <Item last>
                        <Input placeholder="Password"/>
                    </Item>
                    </Form>
              </Content>
          </Container>
      )
    }
}