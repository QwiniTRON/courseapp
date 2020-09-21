import React from 'react'
import { createControl, validate, validateForm } from '../../formFramework/form'
import { createQuizQuestion, finishCreateQuiz } from '../../store/actions/create'

import s from './QuizCreator.module.scss'

import Input from '../../Components/UI/Input/Input.jsx'
import Button from '../../Components/UI/Button/Button.jsx'
import Auxiliry from '../../hoc/Auxiliary/Auxiliary.jsx'
import Select from '../../Components/UI/Select/Select.jsx'
import { connect } from 'react-redux'


function createOptionControl(number) {
  return createControl({
    label: `Вариант ${number}`,
    errorMessage: 'значение не может быть пустым',
    id: number
  }, { required: true })
}

function createFormControls() {
  return {
    question: createControl({
      label: 'Введите вопрос',
      errorMessage: 'вопрос не может быть пустым'
    }, { required: true }),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4)
  }
}

class QuizCreator extends React.Component {
  constructor(props) {
    super(props)

    this.addQuestionHandle = this.addQuestionHandle.bind(this)
    this.createQuizHandle = this.createQuizHandle.bind(this)
    this.renderInputs = this.renderInputs.bind(this)
    this.changeInputHandle = this.changeInputHandle.bind(this)
    this.selectChangeHandle = this.selectChangeHandle.bind(this)

    this.state = {
      quiz: [],
      formControls: createFormControls(),
      rightAnswerId: 1,
      isFormValid: false,
      finishCreate: false
    }
  }

  submitHandle(event) {
    event.preventDefault()
  }

  addQuestionHandle(event) {
    const quiz = this.props.quiz.concat()
    const index = quiz.length + 1

    const { option1, option2, option3, option4, question } = this.state.formControls

    const questionItem = {
      question: question.value,
      rightAnswerId: this.state.rightAnswerId,
      answers: [
        { text: option1.value, id: option1.id },
        { text: option2.value, id: option2.id },
        { text: option3.value, id: option3.id },
        { text: option4.value, id: option4.id }
      ],
      id: index
    }


    this.props.createQuizQuestion(questionItem)
    this.setState(() => ({
      formControls: createFormControls(),
      rightAnswerId: 1,
      isFormValid: false
    }))
  }

  createQuizHandle(event) {
    this.setState(() => ({
      formControls: createFormControls(),
      rightAnswerId: 1,
      isFormValid: false,
      finishCreate: true
    }))

    this.props.finishCreateQuiz()
    setTimeout(() => {
      this.props.history.push('/')
    }, 1500)
  }

  changeInputHandle(event, controlName) {
    const formControls = { ...this.state.formControls }
    const control = { ...formControls[controlName] }

    control.value = event.target.value
    control.touched = true
    control.valid = validate(control.value, control.validation)

    formControls[controlName] = control

    this.setState(() => ({ formControls, isFormValid: validateForm(formControls) }))
  }

  selectChangeHandle(event) {
    const value = +event.target.value
    this.setState(() => ({ rightAnswerId: value }))
  }

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, i) => {
      const control = this.state.formControls[controlName]

      return (
        <Auxiliry key={controlName + i}>
          <Input
            {...control}
            shouldValidate={!!control.validation}
            onChangeHandle={(event) => { this.changeInputHandle(event, controlName) }} />
          {i === 0 && <hr />}
        </Auxiliry>
      )
    })
  }

  render() {
    return (
      <div className={s['quiz-creator']}>
        <div className={s["quiz-creator__body"]}>
          <h2>Создание теста</h2>
          {this.state.finishCreate ? <h4>Тест создан. Переадресация 1 с ...</h4> :
            <form onSubmit={this.submitHandle}>

              {this.renderInputs()}

              <Select
                label="выбирите правильный ответ"
                options={[{ text: 1, value: '1' }, { text: 2, value: '2' }, { text: 3, value: '3' }, { text: 4, value: '4' }]}
                value={this.state.rightAnswerId}
                onChange={this.selectChangeHandle} />

              <Button
                type="green"
                onClick={this.addQuestionHandle}
                disabled={!this.state.isFormValid}
              >Добавить вопрос</Button>
              <Button
                type="bisque"
                onClick={this.createQuizHandle}
                disabled={this.props.quiz.length === 0}
              >Создать тест</Button>
            </form>
          }

        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    quiz: state.create.quiz
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createQuizQuestion: item => dispatch(createQuizQuestion(item)),
    finishCreateQuiz: () => dispatch(finishCreateQuiz()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator)