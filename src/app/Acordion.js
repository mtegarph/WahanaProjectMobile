import React, { Component } from "react";
import { Icon,Root,Container, Header, Content, Accordion,Button,Text, ActionSheet } from "native-base";

const dataArray = [
    { title: "First Element", content: "Lorem ipsum dolor sit amet" },
    { title: "Second Element", content: "Lorem ipsum dolor sit amet" },
    { title: "Third Element", content: "Lorem ipsum dolor sit amet" }
]

export default class Acordion extends Component {

  render() {
    return (
        <Container>
            <Header/>
            <Content padder>
                <Accordion
                    dataArray={dataArray}
                    icon = "add"
                    expandedIcon="remove"
                    iconStyle={{color: 'green'}}
                    expandedIconStyle={{color: 'red'}}
                />
            </Content>
        </Container>
    )
  }
}
