import React from 'react';
import {StyleSheet, View, ActivityIndicator, TouchableOpacity, Alert, Image, Modal, Button, TextInput, FlatList } from 'react-native';
import { Container, Content, Text, Title, Icon, Card } from 'native-base'
import { connect } from 'react-redux';

import { addCategory, removeCategory } from '../public/redux/action/categories';
import { fetchByCategory, fetchByCategoryMore } from '../public/redux/action/notes';

const mapStateToProps = state => {
    return {
        categories: state.categories
    }
}

// map dispatch to trigger actions to this.props
const mapDispatchToProps = dispatch => ({
    addCategory: (data) => dispatch(addCategory(data)),
    removeCategory: (id) => dispatch(removeCategory(id)),
    fetchByCategory: (page, sort, search, id) => dispatch(fetchByCategory(page, sort, search, id)),
})

class Drawer extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      modalVisible: false,
      name_category: '',
      image: '',
    };
  }

  // remove title bar
  static navigationOptions = {
      header: null
  };

  deleteCategory = (id) => {
        this.props.removeCategory(id);
  }

  closeDrawer() {
    this.drawer._root.close()
  };

  async addCategory(data) {
    this.props.addCategory(data);
    
    this.setModalVisible(false);
    
  }

  setModalVisible(visible) {
      this.setState({modalVisible: visible});
  };

  render() {
    return (
        <Content style={{backgroundColor: '#FFFFFF'}}>
            <View 
              style={{
                height:180, 
                backgroundColor: '#FFFFFF', 
                justifyContent: 'center', 
                alignItems: 'center',
                marginBottom: 20  
              }}
            >

              <Image
                style={{marginBottom: 20, width: 100, height: 100, borderRadius: 50, justifyContent: 'center', alignItems: 'center'}}
                source={{ uri: 'https://s3-alpha-sig.figma.com/img/0427/a6f4/226406684c14631fcbc9e0ced34a8096?Expires=1562544000&Signature=hV1ELPfxrPZUr0GYi4db3LUiI7dMUWIG0v-AG7MUqyJ-vgVJpnwOuAUoOSi3IM2b2edXdyRASLKxHSTCUnrPJzMutf~2fkNM1CijtV~eSUpKyFbMJ~9QpwTMOUdDtOouq4CBbVTXbghzodCKeZ4wOZDlJa8SIdl3z5b2k~jFtCOToCorU9M2GI58G-R796UiQKgfCu1yTtEXsUnm0aK1-iqVlPZdHimEfM7dpNcywzVWnIwQEUoRAIP2Djsw2VVCh3L9stIC8dMbdRc7AzrWeeOP4ovz539eBrOe1Od3Byog6VlRgkHuEdGYG6xyXlSnk56AcUE7uctZLmKnbTtRkg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA'}}
              />

              <Text numberOfLines={1} style={{fontSize: 18}}>Dimas Febri P</Text>
            
            </View>


            { 

  
            (this.props.categories.isLoading) ? 
              <ActivityIndicator size="large" color="#333333" /> : 

              <FlatList
                  data={this.props.categories.data}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item}) => {
                    return(
                        
                      <TouchableOpacity
                          onPress={() => this.props.fetchByCategory(1, 'desc', '', item._id)}
                          style={{width: '100%', flexDirection: 'row', marginHorizontal: 20, textAlignVertical: 'center', height: 36, marginTop: 6  }}
                          styleName='inline'
                          onLongPress={()=>{
                            Alert.alert(
                          "Delete Category",
                          "Are you sure want to delete category?",
                          [
                              {
                                  text: "NO", onPress: () => {
                                  }
                              },
                              {
                                  text: "YES", onPress: () => {
                                      this.deleteCategory(item._id);
                                  }
                              }
                          ],
                          { cancelable: false }
                      )
                          }}
                      >
                          {/*<Icon name='ios-bookmark' style={{marginRight: 12, fontSize: 18}} />*/}
                          { (item.image == 'default') ? <Image source={{uri: 'https://image.flaticon.com/icons/png/512/88/88179.png'}} style={{width:30, height: 30, marginRight: 8}} /> : <Image source={{uri: item.image}} style={{width:30, height: 30, marginRight: 8}} /> }
                          <Text style={{fontSize: 18, color: '#555' }}>{item.name_category}</Text>
                        </TouchableOpacity>

                    )
                  }}
              />
              // <FlatList
              //     data={this.props.categories.data} 
              //     keyExtractor={(item, index) => index.toString()} 
              //     renderItem={({item, index}) => {<Text>{item._id}</Text>}}
              // /> 

            }

            <View style={{marginTop: 26}}>
                    <TouchableOpacity
                      style={{color: '#333333',width: '100%', flexDirection: 'row', marginHorizontal: 20, textAlignVertical: 'center', height: 36  }}
                      onPress={() => {
                        // this.props.navigation.closeDrawer();
                        this.setModalVisible(true);
                      }}
                      styleName='inline'
                  >
                      {/*<Icon name='ios-add-circle-outline' style={{marginRight: 12, fontSize: 18, color: '#333333'}} />*/}
                      <Image source={{uri: 'https://image.flaticon.com/icons/png/512/54/54731.png'}} style={{width:30, height: 30, marginRight: 8}} />
                      <Text style={{fontSize: 18, color: '#222222' }}>Add Category</Text>
                    </TouchableOpacity>
            </View>

    {/*<View style={{marginTop: 50, paddingHorizontal: 20}}>
          
      </View>*/}


      <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          style={{width:'20%', height:20}}
       >
        
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} >
          
          <TouchableOpacity 
            onPress={() => {
                this.setModalVisible(false);
              }}
            style={{position:'absolute', top:0, bottom: 0, left:0, right:0, backgroundColor: 'rgba(0,0,0,0.7)'}}
          >

          </TouchableOpacity>

            <Card 
              style={{
                backgroundColor: '#F5F6F7', 
                width: '80%', 
                height: 200,
                shadowOffset: { width: 5, height: 15 },
                  shadowOpacity: 0.5,
                  shadowRadius: 8,
                  elevation: 5,
                  borderRadius: 5,
                  zIndex: 999,
                  paddingVertical: 12,
                  paddingHorizontal: 20
              }}
              onPress={() => {
                  this.setModalVisible(true);
              }}
            >

            <View styleName="vertical" style={{backgroundColor: '#F5F6F7'}}>
              <TextInput
          placeholder={'Category Name'}
          style={{width:'100%', backgroundColor: '#F5F6F7', borderBottomWidth: 1, borderBottomColor: '#333333'}}
          value={this.state.name_category}
          onChangeText={(name_category) => this.setState({name_category})}
        />

        <TextInput
          placeholder={'Category Image'}
          style={{width:'100%', backgroundColor: '#F5F6F7', borderBottomWidth: 1, borderBottomColor: '#333333'}}
          value={this.state.image}
          onChangeText={(image) => this.setState({image})}
        />

            <View style={{backgroundColor: '#F5F6F7', marginTop: 24, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Button 
                onPress={() => {
                      this.setModalVisible(false);
                    }} 
                title="CANCEL"
                color='#8e8e95'
                style={{width: '40%'}}
              />
                
              

              <Button 
                title="ADD"
                onPress={() => this.addCategory({name_category: this.state.name_category, image: this.state.image})}
                color='#40a917'
                style={{width: '40%'}}
              />
            </View>
      </View>
              
            </Card>

        </View>   

       </Modal>
        </Content>
    );
  }
}


const styles = StyleSheet.create({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
