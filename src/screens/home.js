import React, {Component} from 'react';
import { Platform, 
          StyleSheet, 
          View, 
          Button, 
          TextInput, 
          FlatList,
          ActivityIndicator,
          TouchableOpacity,
          Alert,
          Image,
          RefreshControl
      } from 'react-native';

import { Container, Content, Text, Left, Body, Right, Header, Title, Icon, Drawer } from 'native-base'
import ActionButton from 'react-native-action-button';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import SideBar from './drawer';

import { connect } from 'react-redux';

import { fetch, removeNote, fetchMore, fetchByCategory, fetchByCategoryMore } from '../public/redux/action/notes';
import { fetchCategory } from '../public/redux/action/categories';

import { debounce } from 'throttle-debounce';

const mapStateToProps = state => {
    return {
        notes: state.notes,
        categories: state.categories
    }
}


const mapDispatchToProps = dispatch => ({
    fetch: (page, sort, search) => dispatch(fetch(page, sort, search)),
    fetchMore: (page, sort, search) => dispatch(fetchMore(page, sort, search)),
    removeNote: id => dispatch(removeNote(id)),
    fetchCategory: () => dispatch(fetchCategory()),
    fetchByCategory: (page, sort, id) => dispatch(fetchByCategory(page, sort, id)),
    fetchByCategoryMore: (page, sort, id) => dispatch(fetchByCategoryMore(page, sort, id))
})


class Home extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      data: [],
      page: 1,
      pageCategory: 1,
      search: '',
      refreshing: false,
      sort: 'desc'
    };
  }

  componentDidMount = () => {

    if(this.props.notes.typeAction == 'get'){
      this.props.fetch(this.state.page, this.state.sort, this.state.search);
      this.props.fetchCategory();
    }

  };

  closeDrawer() {
    this.drawer._root.close()
  };


  searchProcess(search) {
    this.setState({
      search: search,
      page: 1
    },
      this.seachAction
    )
  }

  seachAction = debounce(200, () => {
      this.props.fetch(this.state.page, this.state.sort, this.state.search);
  })


  openDrawer() { 
    this.drawer._root.open() 
  };

  dataFormat = (data, search) => {

    // const notesData = data.filter(data => data.title.toLowerCase().search(search.toLowerCase()) >= 0)

    if(data.length % 2 != 0) {
       data.push({_id: `blank`, empty: true});
    }

    return data;

  }

  // remove title bar
  static navigationOptions = {
      header: null
  };

  confirmButton() {
        Alert.alert(
            "Delete Note",
            "Are you sure want to delete note?",
            [
                {
                    text: "NO", onPress: () => {
                    }
                },
                {
                    text: "YES", onPress: () => {
                        this.deleteNote();
                    }
                }
            ],
            { cancelable: false }
        )
    }

    deleteNote = (id) => {
        this.props.removeNote(id);
    }

  renderItem = ({item, index}) => {
    if( item.empty == true ) {
      return (
          <TouchableOpacity key={item.key} style={{flex: 1, marginBottom:16, backgroundColor: 'transparent'}} />
      )
    }

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    let date = new Date(item.createdAt);
    let dateNote =  date.getDate() + ' ' + monthNames[date.getMonth()];

    return (
        <View key={item.key} style={{flex: 1, marginBottom:16}} activeOpacity={0.8} >
         
          <TouchableOpacity style={{
              flex: 1, 
              width: '95%',
              alignSelf: (index % 2 == 0) ? 'flex-start' : 'flex-end',
            }}
            onPress={()=>this.props.navigation.navigate('EditNote', item)}
            onLongPress={()=>{
              Alert.alert(
            "Delete Note",
            "Are you sure want to delete note?",
            [
                {
                    text: "NO", onPress: () => {
                    }
                },
                {
                    text: "YES", onPress: () => {
                        this.deleteNote(item._id);
                    }
                }
            ],
            { cancelable: false }
        )
            }}
          >

            <View style={[styles.card, {
              backgroundColor: (!item.category || !item.category.name_category) ? '#8E8E93' : 
                               (item.category.name_category.toLowerCase() == 'learn') ? '#37D9FE' : 
                               (item.category.name_category.toLowerCase() == 'work') ? '#6DE07E' : 
                               (item.category.name_category.toLowerCase() == 'whislist') ? '#FAD06C' : "#FF92A9"
              
            }]}>

              <Text style={{color:'#FFFFFF', textAlign: 'right', fontSize: 14, paddingBottom: 4 }}>{dateNote}</Text>

              <Text numberOfLines={1} style={{color:'#FFFFFF', fontWeight: 'bold', fontSize: 16}}>{item.title}</Text>

              <View style={{paddingVertical: 4}}> 
                {(!item.category || !item.category.name_category) ? <Text style={{color:'#F0F0F0'}} styleName="collapsible" numberOfLines={1}>-</Text> : <Text style={{color:'#F0F0F0'}} styleName="collapsible" numberOfLines={1}>{item.category.name_category }</Text> }
              </View>

              <View>
                <Text style={{fontSize: 13, color:'#FFFFFF'}} numberOfLines={4}>{item.note}</Text>
              </View>
            </View>
          
          </TouchableOpacity>
        </View>
    )
  }

  handleLoadMore = () => {

    if(this.state.page < this.props.notes.totalPage){
      
      if(this.props.notes.getMode){
        this.setState(
          {
            page: this.state.page + 1
          }
        )
              
        this.props.fetchMore(this.state.page+1, this.state.sort, this.state.search);
        
        }

      else {

        this.setState(
          {
            pageCategory: this.state.pageCategory + 1
          }
        )
              
        this.props.fetchByCategoryMore(this.state.pageCategory+1, this.state.sort, this.props.notes.categorySelect);
        
      }

    }
      

  }

  renderEmptyItem = () => {
    return (
        <Text style={styles.notFound}>Not Found</Text>
    )
  }

  renderFooter = () => {
      return (
        <View>
          { (this.props.notes.isLoadingMore) ?
              <View style={{paddingVertical: 12}}>  
                <ActivityIndicator animating size='large' color="#333333" />
              </View>
            : <View />

          }
        </View>
    )
  }

  handleRefresh = () => {
    this.setState({
      page: 1,
      pageCategory: 1,
      sort: 'desc',
      search: ''
    },
    () => {
      this.props.fetch(this.state.page, this.state.sort);
    }
    )
  }

  _menu = null;
 
  setMenuRef = ref => {
    this._menu = ref;
  };
 
  hideMenu = () => {
    this._menu.hide();
  };

  showMenu = () => {
    this._menu.show();
  };

  render() {
    return (
    
    <Drawer 
      ref={(ref) => { this.drawer = ref; }} 
      content={<SideBar navigation={this.props.navigation} close={() => this.closeDrawer} />} 
      onClose={() => this.closeDrawer} >
        
      <Container>
        <Header style={{ backgroundColor: "white", marginBottom: 5 }}>
                    <Left>
                      <TouchableOpacity onPress={()=>this.openDrawer()}>
                        <Image
                          style={{marginLeft: 12, width: 36, height: 36, borderRadius: 18}}
                          source={{ uri: 'https://s3-alpha-sig.figma.com/img/0427/a6f4/226406684c14631fcbc9e0ced34a8096?Expires=1562544000&Signature=hV1ELPfxrPZUr0GYi4db3LUiI7dMUWIG0v-AG7MUqyJ-vgVJpnwOuAUoOSi3IM2b2edXdyRASLKxHSTCUnrPJzMutf~2fkNM1CijtV~eSUpKyFbMJ~9QpwTMOUdDtOouq4CBbVTXbghzodCKeZ4wOZDlJa8SIdl3z5b2k~jFtCOToCorU9M2GI58G-R796UiQKgfCu1yTtEXsUnm0aK1-iqVlPZdHimEfM7dpNcywzVWnIwQEUoRAIP2Djsw2VVCh3L9stIC8dMbdRc7AzrWeeOP4ovz539eBrOe1Od3Byog6VlRgkHuEdGYG6xyXlSnk56AcUE7uctZLmKnbTtRkg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA'}}
                        />
                      </TouchableOpacity>
                    </Left>
                    <Body>
                        <Title style={{ color: "black", fontWeight: "100", alignSelf: 'center'  }}>
                            NOTE APP
                        </Title>
                    </Body>
                    <Right>
                        <Menu
                          ref={this.setMenuRef}
                          button={

                            <TouchableOpacity onPress={this.showMenu}>
                              <Image
                                style={{marginRight: 12, width: 24, height: 24}}
                                source={{ uri: 'https://s3-alpha-sig.figma.com/img/cae1/2e95/eb4556e0bf989e7b6412ece62bba6639?Expires=1562544000&Signature=LoVo7fLqyUfwFCsErKlPx3k-3EppVOWjFnpsdsDDf2LNIYcGrcWC1569yir8ESnUIrY1J4L3wY4w4uhgp1xY2TQmN4lVjmEUWRjPFsNmIkcnLESyetO~LuuCX7~Or4WbC-GA1At~YDYY6yUHLAMsH52OZaaMIhdY5zH2~cQ9hMVmR0r9u9guH2XNd5SYqdpggwV6tBLtx92yUgL2MKPH7kIBAkZeRgL1kKFHkky26seyQKUMxepm1lDwLCxsxoLynRP9noj9obQNkKtQTChCOIrs~6hwyI37E~y9QVVQBCCY25cVgTWqZDqkI-dEHKPU6f5KVA5U047pPc2GxogB6A__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA'}}
                              />
                            </TouchableOpacity>

                          }
                        >
                          <MenuItem onPress={() => {
                            this.hideMenu();
                            
                            this.setState({sort:'asc', page:1});
                            this.props.fetch(1, 'asc', this.state.search);
                          }}>ASCENDING</MenuItem>
                          <MenuItem onPress={() => {
                            this.hideMenu();

                            this.setState({sort:'desc', page:1});
                            this.props.fetch(1, 'desc', this.state.search);
                          }}>DESCENDING</MenuItem>
                        </Menu>
                    </Right>
                </Header>

          <View style={styles.serachContainer}>
            <TextInput 
              style={styles.search}
              placeholder="Search..."
              value={this.state.search}
              onChangeText={(search) => this.searchProcess(search)}
            />
          </View>

          
          { (this.props.notes.isError) ? <Text style={[styles.notFound, {marginLeft: 20}]}>Error Get Notes</Text> :
            (this.props.notes.isLoading) ? 
              <ActivityIndicator size="large" color="#333333" /> : 
              
              <FlatList
                  style={styles.cardContainer}
                  data={this.props.notes.data} 
                  keyExtractor={(item, index) => index.toString()} 
                  renderItem={this.renderItem}
                  ListEmptyComponent={this.renderEmptyItem}
                  numColumns={2}
                  onEndReached={this.handleLoadMore}
                  onEndReachedThreshold={0.5}
                  ListFooterComponent={this.renderFooter}
                  refreshControl={
                    <RefreshControl 
                        refreshing={this.props.notes.isLoading}    
                        onRefresh={this.handleRefresh}
                    />
                  }
              />
          }
          

        <ActionButton buttonColor="rgba(30,30,30,1)" onPress={() => this.props.navigation.navigate('AddNote')} />

      </Container>
    </Drawer>      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFCFC',
  },
  serachContainer: {
    marginTop: 20,
    marginBottom: 18,
    paddingHorizontal: 18
  },
  search: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 18,
    height: 42, 
    elevation: 3
  },
  cardContainer: {
    // paddingHorizontal: 20,
    marginLeft: '5%',
    flex: 1, 
    paddingBottom: 32,
    width: '90%'
  },
  card: {
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 3,
    height: 162,
    padding: 12
  },
  notFound: {
    fontSize: 18
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
