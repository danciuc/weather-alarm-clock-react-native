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
    user: authReducer.user,
    userRole: authReducer.userRole
  }
}

class Login extends Component {

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    navigation: PropTypes.object.isRequired
  }

  static navigationOptions = {
    title: 'Login'
  }

  constructor(props) {
    super(props)
    this.state = {
      email: props.email,
      password: ""
    }
  }

  onLogin = () => {
    const {navigation} = this.props
    const {email, password} = this.state

    this.props.dispatch(actionCreators.login(email, password, navigation))
  }

  renderError(error) {
    if (error) return (
      <Error error={error}/>
    )
  }

  componentWillMount() {
    const {user, userRole, navigation} = this.props

    if (user) {
      navigation.navigate('Alarm', {userRole: userRole})
    }
  }

  render() {
    const {loading, error, navigation} = this.props
    const {email} = this.state

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
          title="LOGIN"
          onPress={this.onLogin}
        />

        <FormButton
          title="CREATE ACCOUNT"
          onPress={() => navigation.navigate('Register')}
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

export default connect(mapStateToProps)(Login)
