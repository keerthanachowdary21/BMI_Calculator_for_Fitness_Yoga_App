import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import './bmiCalculator.css'

const getBmi = (height, weight) => {
  const heightInMeters = height / 100
  const bmi = weight / heightInMeters ** 2
  return Math.round(bmi*10)/10
}

const getBmiCategory = (bmi) => {
  if (bmi < 18.5) return 'underweight'
  if (bmi >= 18.5 && bmi <= 24.9) return 'normal'
  if (bmi >= 25 && bmi <= 29.9) return 'overweight'
  if (bmi >= 30 && bmi <= 34.9) return 'obese'
  return 'extremelyObese'
}

const BmiCalculator = () => {
  const navigate = useNavigate()
  const storedHeight = JSON.parse(localStorage.getItem('height'))
  const storedWight = JSON.parse(localStorage.getItem('weight'))

  const [height, setHeight] = useState(
    storedHeight !== null ? storedHeight : 170,
  )
  const [weight, setWeight] = useState(storedWight !== null ? storedWight : 60)
  const [bmi, setBmi] = useState(getBmi(height, weight))
  const [bmiCategory, setBmiCategory] = useState(getBmiCategory(bmi))

  useEffect(() => {
    const calculatedBmi = getBmi(height, weight)
    setBmi(calculatedBmi)
    setBmiCategory(getBmiCategory(calculatedBmi))
    document.title = `Your BMI: ${calculatedBmi}`
  }, [height, weight])

  useEffect(() => {
    localStorage.setItem('height', JSON.stringify(height))
  }, [height])

  useEffect(() => {
    localStorage.setItem('weight', JSON.stringify(weight))
  }, [weight])

  const onIncrementWeight = () => {
    setWeight(prevWeight => prevWeight + 1)
  }

  const onDecrementWeight = () => {
    setWeight(prevWeight => prevWeight - 1)
  }

  const onIncrementHeight = () => {
    setHeight(prevHeight => prevHeight + 1)
  }

  const onDecrementHeight = () => {
    setHeight(prevHeight => prevHeight - 1)
  }

  const navigateToCategoryPlan = () => {
    switch(bmiCategory) {
      case 'underweight':
        navigate('/underweight')
        break
      case 'normal':
        navigate('/normal')
        break
      case 'overweight':
        navigate('/overweight')
        break
      case 'obese':
        navigate('/obese')
        break
      case "extremelyObese":
        navigate("/extremelyObese")
        break
      default:
        navigate('/')
    }
  }

  const renderCategoryButton = () => {
    switch(bmiCategory) {
      case 'underweight':
        return (
          <button className="underweight-button" onClick={navigateToCategoryPlan}>
            Get Underweight Plan
          </button>
        )
      case 'normal':
        return (
          <button className="normal-button" onClick={navigateToCategoryPlan}>
            Get Normal Weight Plan
          </button>
        )
      case 'overweight':
        return (
          <button className="overweight-button" onClick={navigateToCategoryPlan}>
            Get Overweight Plan
          </button>
        )
      case 'obese':
        return (
          <button className="obese-button" onClick={navigateToCategoryPlan}>
            Get Obese Plan
          </button>
        )
      case "extremelyObese":
        return(
            <button className='exobese-button' onClick={navigateToCategoryPlan}>
             Get Extremely Obese Plan
            </button>
        )
      default:
        return null
    }
  }

  return (
    <div className="main-container">
      <h1 className="title">BMI Calculator for Fitness & Yoga App</h1>
      <img
        className="bmi-levels-image"
        src="https://www.medicoverhospitals.in/bmi-calculator/bmi-calculator.webp"
        alt="bmi levels"
      />
      <div className="card-container">
        <div className="measurements-container">
          <div className="measurement-card">
            <p className="measurement">Height</p>
            <p className="measurement-value">
              {height}
              <span className="unit">cms</span>
            </p>
            <div className="buttons-container">
              <button className="button" onClick={onDecrementHeight}>-</button>
              <button className="button" onClick={onIncrementHeight}>+</button>
            </div>
          </div>
          <div className="measurement-card">
            <p className="measurement">Weight</p>
            <p className="measurement-value">
              {weight}
              <span className="unit">kgs</span>
            </p>
            <div className="buttons-container">
              <button className="button" onClick={onDecrementWeight}>-</button>
              <button className="button" onClick={onIncrementWeight}>+</button>
            </div>
          </div>
        </div>
        <p className="result-content">
          BMI : {Number.isInteger(bmi) ? bmi:bmi.toFixed(1)}
        </p>
        {renderCategoryButton()}
      </div>
    </div>
  )
}

export default BmiCalculator