import React from 'react';
import {StyleSheet, View, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { Container, Content, Text, Left, Body, Right, Header, Title, Icon, Input, Item, Form, Textarea, Picker } from 'native-base'
import { connect } from 'react-redux';

import { fetchCategory } from '../public/redux/action/categories';
import { editNote } from '../public/redux/action/notes';

console.disableYellowBox=true;

const mapStateToProps = state => {
    return {
        categories: state.categories
    }
}

// map dispatch to trigger actions to this.props
const mapDispatchToProps = dispatch => ({
    fetchCategory: () => dispatch(fetchCategory()),
    editNote: (id, data) => dispatch(editNote(id, data))
})

class EditNote extends React.Component {
  constructor(props) {
    super(props);
  
    let category = (this.props.navigation.state.params.category) ? this.props.navigation.state.params.category._id : this.props.categories.data[0]._id;

    this.state = {
      id: this.props.navigation.state.params._id,
      title: this.props.navigation.state.params.title,
      note: this.props.navigation.state.params.note,
      selectedCategory: category
    };
  }

  static navigationOptions = {
      header: null
  };

  onChangeCategory(value: string) {
    this.setState({
      selectedCategory: value
    });
  }

  async editNote(id, data) {

    if(data.title == '' || data.note == '' || data.category == ''){
      alert('Masih ada yang kosong!');
    }
    else {
      this.props.editNote(id, data);
      this.props.navigation.goBack();
    }
  }

  render() {
    return (
        <Container>
                <Header style={{ backgroundColor: "white", marginBottom: 5 }}>
                    <Left>
                      <Icon name="arrow-back" size={25}
                        style={{ margin: 15 }}
                        onPress={() => this.props.navigation.navigate('Home')}
                      />
                    </Left>
                    <Body>
                        <Title style={{ color: "black", fontWeight: "100", alignSelf: 'center'  }}>
                            EDIT NOTE
                        </Title>
                    </Body>
                    <Right>
                        <TouchableOpacity onPress={() => this.editNote(this.state.id ,{title:this.state.title, note:this.state.note, category:this.state.selectedCategory})}>
                          <Image
                            style={{marginRight: 12, width: 24, height: 24}}
                            source={{ uri: 'https://s3-alpha-sig.figma.com/img/aa0f/f8d9/21c547f72caf258513dcc26eefd22ab6?Expires=1562544000&Signature=Y5VsHL9x1P5pysS-S4~AhNLL4XQgqtX6DdXPiteXl~MGDIbyeUj3v~u3beR-jnvopbd35p42RlExiH1ozmQAemALuvquOgNqhNg~jWJh78ZjfqLAbxXlG~fC1hZDjy4KtYAIm5JzIzyqeZYV35GRxY6csw3JA-w50eWt4LXTVTEwBn8F-g5nHAur2kl5qubTxyBunPGcrFgfDWOC38A9HiBkHmo6GNeeUmPGiSDfPB5f3DRZjSyxr~C1fPQ~qrrs6vBThMyS3CwhO5-7dYMq2IJyl7mXSkixw~VFi9U71oyZANHuER-eQwhQc-mj4p0xzCNBHcPqfxWOEcMib9me4w__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA'}}
                          />
                        </TouchableOpacity>
                    </Right>
                </Header>

                <Content style={{padding: 12, paddingTop: 50}}>

                  

                  <Input 
                    placeholder='EDIT TITLE ...' 
                    style={[styles.input, {paddingLeft: 12}]}
                    value={this.state.title}
                    onChangeText={(title)=>this.setState({title})} 
                  />
                  

                  <Form style={{marginTop: 12}}>
                      <Textarea 
                        rowSpan={6} 
                        placeholder="EDIT DESCRIPTION ..." 
                        style={styles.input}
                        value={this.state.note}
                        onChangeText={(note)=>this.setState({note})}
                      />
                  </Form>

                  <Form style={{paddingHorizontal: 12, marginTop: 12}}>
                    <Text style={{fontSize: 18}}>CATEGORY</Text>
                    <Item picker style={{borderWidth: 0, width: 200, borderBottomColor: '#FFF'}}>

                      {
                        (this.props.categories.isLoading) ? <ActivityIndicator size='large' /> :
                        (this.props.categories.isError) ? <View/> :
                      
                      <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" />}
                        style={{ width: undefined, elevation: 3 }}
                        placeholder="Select your SIM"
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                        selectedValue={this.state.selectedCategory}
                        onValueChange={this.onChangeCategory.bind(this)}
                      >
                        
                        {
                          

                            this.props.categories.data.map(item => (

                                  <Picker.item key={item._id} label={item.name_category} value={item._id} />

                                )
                            )
                        }
                      </Picker>

                    }
                    </Item>
                  </Form>
                </Content>
        </Container>
    );
  }
}


const styles = StyleSheet.create({
  input: {
    fontSize: 20, 
    borderRadius: 5, 
    backgroundColor: 'transparent', 
    color: '#666'
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(EditNote);
