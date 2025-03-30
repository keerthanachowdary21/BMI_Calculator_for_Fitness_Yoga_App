import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import BmiCalculator from './components/BmiCalculator/BmiCalculator.js'
import UnderweightPlan from './components/UnderweightPlan/UnderweightPlan.js'
import NormalPlan from './components/NormalPlan/NormalPlan.js'
import OverweightPlan from './components/OverweightPlan/OverweightPlan'
import ObesePlan from './components/ObesePlan/ObesePlan.js'
import ExtremelyObese from "./components/ExtremelyObese/ExtremelyObese.js"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BmiCalculator />} />
        <Route path="/underweight" element={<UnderweightPlan />} />
        <Route path="/normal" element={<NormalPlan />} />
        <Route path="/overweight" element={<OverweightPlan />} />
        <Route path="/obese" element={<ObesePlan />} />
        <Route path="/extremelyObese" element={<ExtremelyObese/>}/>
      </Routes>
    </Router>
  )
}

export default App