import React, { Component } from 'react';
import { Container, Content, Button, Text, Item, Label, Input, Icon, Textarea } from 'native-base';
import { View } from 'react-native';

class GenericForm extends Component {
  constructor(props) {
    super(props);
  }

  renderTextField({ input, label, meta: { touched, error }, ...custom }) {
    return (
      <View>
        <Item floatingLabel error={touched && !(!error) ? true : false}>
          <Label>{label}</Label>
          <Input
            {...input}
            {...custom}
          />
        </Item>
        <Label style={{ color: 'red', fontSize: 10 }}>{touched && error}</Label>
      </View>
    );
  }

  renderPasswordField({ input, label, meta: { touched, error }, ...custom }) {
    return (
      <View>
        <Item floatingLabel error={touched && !(!error) ? true : false}>
          <Label>{label}</Label>
          <Input
            secureTextEntry={true}
            {...input}
            {...custom}
          />
        </Item>
        <Label style={{ color: 'red', fontSize: 10 }}>{touched && error}</Label>
      </View>
    );
  }
  renderTextArea({ input, label, meta: { touched, error }, ...custom }) {
    return (
      <View>
        <Item floatingLabel error={touched && !(error) ? true : false}>
        <Label>{label}</Label>
        <Textarea
          multiLine={true}
          rows={4}
          rowsMax={4}
          {...input}
          {...custom}
        />
      </Item>
        <Label style={{ color: 'red', fontSize: 10 }}>{touched && error}</Label>
      </View>
    );
  }



  /**
  * Es una forma de capturar cualquier error en la clase 
  * y que este no crashe el programa, ayuda con la depuracion
  * de errores
  * @method componentDidCatch
  * @const info Es más informacion acerca del error
  * @const error Es el titulo del error
  */
  componentDidCatch(error, info) {
    console.log("Error: " + error);
    console.log("Info: " + info);
  }

  render() {
    return (
      <div>
        Solo para sobreescritura
      </div>
    );
  }
}

export default GenericForm;