import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import {autoLogin} from './store/actions/auth'

import Layout from './hoc/Layout/Layout'
import Quiz from './Containers/Quiz/Quiz.jsx'
import QuizCreator from './Containers/QuizCreator/QuizCreator.jsx'
import Auth from './Containers/Auth/Auth.jsx'
import QuizList from './Containers/QuizList/QuizList.jsx'
import Logout from './Components/Logout/Logout.jsx'


function App(props) {
  useEffect(() => {  // componentDidMount
    props.autoLogin()
  }, [])

  let routes = (
    <Switch>
      <Route path="/auth" component={Auth} />
      <Route path="/quiz/:id" component={Quiz} />
      <Route path="/" component={QuizList} />
      <Redirect to="/" />
    </Switch>
  )

  if (props.isAuth) {
    routes = (
      <Switch>
        <Route path="/quiz-creator" component={QuizCreator} />
        <Route path="/quiz/:id" component={Quiz} />
        <Route path="/" exact component={QuizList} />
        <Route path="/logout" exact component={Logout} />
        <Redirect to="/" />
      </Switch>
    )
  }

  return (
    <Layout>
      {routes}
    </Layout>
  );
}


function mapStateToProps(state) {
  return {
    isAuth: !!state.auth.token
  }
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
