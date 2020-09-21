import React from 'react'
import { connect } from 'react-redux'
import { fetchQuizById, quizAnswerClick, retryQuiz} from '../../store/actions/quiz'

import s from './Quiz.module.scss'

import ActiveQuiz from '../../Components/ActiveQuiz/ActiveQuiz.jsx'
import FinishQuiz from '../../Components/FinishQuiz/FinishQuiz.jsx'
import Loader from '../../Components/UI/Loader/Loader.jsx'


class Quiz extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			results: {},
			activeQuestion: 0,
			answerState: null,
			isFinished: false,
			quiz: [],
			loading: true
		}
	}

	componentWillUnmount() {
		this.props.retryQuiz()
	}

	componentDidMount() {
		this.props.fetchQuizById(this.props.match.params.id)
	}

	render() {
		return (
			<div className={s.quiz}>
				<div className={s['quiz-wrapper']}>
					<h1>Вопрос</h1>

					{this.props.loading || !this.props.quiz ? <Loader /> :
						this.props.isFinished ?
							<FinishQuiz onRetry={this.props.retryQuiz} results={this.props.results} quiz={this.props.quiz} /> :
							<ActiveQuiz
								answers={this.props.quiz[this.props.activeQuestion].answers}
								question={this.props.quiz[this.props.activeQuestion].question}
								onAnswerClick={this.props.quizAnswerClick}
								quizLength={this.props.quiz.length}
								answerNumber={this.props.activeQuestion}
								state={this.props.answerState} />
					}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		results: state.quiz.results,
		activeQuestion: state.quiz.activeQuestion,
		answerState: state.quiz.answerState,
		isFinished: state.quiz.isFinished,
		quiz: state.quiz.quiz,
		loading: state.quiz.loading
	}
}

function mapDispatchToProps(dispatch) {
	return {
		fetchQuizById: id => dispatch(fetchQuizById(id)),
		quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
		retryQuiz: () => dispatch(retryQuiz())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)