import React, { Component } from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import PropTypes from 'prop-types'

import FormTextInput from '../components/formItems/FormTextInput'
import FormButton from '../components/formItems/FormButton'
import Error from '../components/formItems/Error'

import { actionCreators } from '../redux/auth'

const mapStateToProps = (state) => {
  const {authReducer} = state

  return {
    loading: authReducer.loading,
    error: authReducer.error,
    email: authReducer.email,
    user: authReducer.user
  }
}

class Register extends Component {

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    navigation: PropTypes.object.isRequired,
  }

  static navigationOptions = {
    title: 'Create Account'
  }

  constructor(props) {
    super(props)
    this.state = {
      firstName: props.firstName,
      lastName: props.lastName,
      email: props.email,
      password: ""
    }
  }

  onRegister = () => {
    const {navigation} = this.props
    const {email, password, firstName, lastName} = this.state

    this.props.dispatch(actionCreators.register(email, password, firstName, lastName, navigation))
  }

  renderError(error) {
    if (error) return (
      <Error error={error}/>
    )
  }

  render() {
    const {loading, error} = this.props
    const {email, password, firstName, lastName} = this.state

    if (loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      )
    }

    return (
      <View>
        { this.renderError(error) }

        <FormTextInput
          placeholder="First name"
          value={firstName}
          onChangeText={(firstName) => this.setState({firstName})} />

        <FormTextInput
          placeholder="Last name"
          value={lastName}
          onChangeText={(lastName) => this.setState({lastName})} />

        <FormTextInput
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={(email) => this.setState({email})} />

        <FormTextInput
          placeholder="Password"
          secureTextEntry={true}
          autoCapitalize="none"
          onChangeText={(password) => this.setState({password})} />

        <FormButton
          title="CREATE"
          onPress={this.onRegister}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
})

export default connect(mapStateToProps)(Register)
