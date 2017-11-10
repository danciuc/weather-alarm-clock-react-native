import React, { Component } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Keyboard
} from 'react-native';

import PopupDialog, { DialogButton } from 'react-native-popup-dialog';

import Email from './Email'

export default class ListAlarms extends Component {
  constructor(props) {
    super(props);
    this._editItem = this._editItem.bind(this);
    this.state = {
      alarms: [
        {id: 1, time: "10:00", label: "Alarm 1"},
        {id: 2, time: "14:06", label: "Alarm 2"},
        {id: 3, time: "11:11", label: "Alarm 3"},
        {id: 4, time: "04:00", label: "Alarm 4"},
      ]
    };
  }

  _editItem = (index) => {
    let item = this.state.alarms[index];
    this.setState({
      edit_time: item.time,
      edit_label: item.label,
      edit_index: index
    });
    this.popupDialog.show();
  }

  _saveItem = () => {
    const alarms = this.state.alarms;
    alarms[this.state.edit_index]['time'] = this.state.edit_time;
    alarms[this.state.edit_index]['label'] = this.state.edit_label;

    this.setState({alarms: alarms});
    this.popupDialog.dismiss();
    Keyboard.dismiss();
  }

  _getItemIndex = (item) => {
    for (let i=0; i < this.state.alarms.length; i++) {
        if (this.state.alarms[i].id === item.id) {
            return i;
        }
    }

    return -1;
  }

  _renderAlarm = ({item}) => {
    let itemIndex = this._getItemIndex(item);
    return (
      <View>
        <View style={styles.itemContainer}>
          { this._renderItemText(itemIndex, item.id) }
          { this._renderItemText(itemIndex, item.time) }
          { this._renderItemText(itemIndex, item.label) }
        </View>
        <View style={styles.itemBorder} />
      </View>
    );
  }

  _renderItemText = (index, text) => (
    <Text
      onPress={() => this._editItem(index)}
      style={styles.item}
    >
      {text}
    </Text>
  )

  render() {
    return (
      <View style={styles.container}>

        <Email />

        <FlatList
          data={this.state.alarms}
          keyExtractor={(item, index) => item.id}
          renderItem={this._renderAlarm}
          extraData={this.state}
        />

        {/* PopupDialog for displaying edit item form */}
        <PopupDialog
          ref={(popupDialog) => { this.popupDialog = popupDialog }}
          actions={[
            <DialogButton
              key="Save"
              text="Save"
              onPress={() => this._saveItem()}
            />,
            <DialogButton
              key="Cancel"
              text="Cancel"
              onPress={() => this.popupDialog.dismiss()}
            />
          ]}
        >
          {/* Edit time property */}
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.item}>Time: </Text>
            <TextInput
              onChangeText={(text) => this.setState({edit_time: text})}
              value={this.state.edit_time}
            />
          </View>
          {/* Edit label property */}
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.item}>Label: </Text>
            <TextInput
              onChangeText={(text) => this.setState({edit_label: text})}
              value={this.state.edit_label}
            />
          </View>
        </PopupDialog>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  itemBorder: {
    height: 1,
    width: '86%',
    backgroundColor: 'gray',
    marginLeft: '7%'
  },
  item: {
    padding: 20,
    fontSize: 18,
  },
})
