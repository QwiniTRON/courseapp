import React from 'react'
import { connect } from 'react-redux'
import {fetchQuizes} from '../../store/actions/quiz'

import s from './QuizList.module.scss'

import { NavLink } from 'react-router-dom'
import Loader from '../../Components/UI/Loader/Loader.jsx'

class QuizList extends React.Component {
  constructor(props) {
    super(props)

    this.renderQuizes = this.renderQuizes.bind(this)
  }

  renderQuizes() {
    return this.props.quizes.map((q, i) => {
      return (
        <li key={q.id}>
          <NavLink to={'/quiz/' + q.id} exact>
            {q.name}
          </NavLink>
        </li>
      );
    })
  }

  componentDidMount() {
    this.props.fetchQuizes()
  }

  render() {
    return (
      <div className={s['quiz-list']}>
        <div className={s['quiz-list__content']}>
          <h2>Список тестов</h2>
          {this.props.loading && this.props.quizes.length === 0 ? <Loader /> :
            <ul>
              {this.renderQuizes()}
            </ul>
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    quizes: state.quiz.quizes,
    loading: state.quiz.loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizes: () => dispatch(fetchQuizes())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList)