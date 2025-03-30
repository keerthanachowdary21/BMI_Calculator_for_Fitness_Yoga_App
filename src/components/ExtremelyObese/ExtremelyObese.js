import React, { useState, useEffect } from 'react';
import './extremelyObese.css';

// Import images
import seatedNeckRolls from './images/seatedNeckRolls.jpg';
import chairArmCircles from './images/chairArmCircles.jpg';
import seatedMarching from './images/seatedMarching.jpg';
import ankleRotations from './images/ankleRotations.jpg';
import deepBreathing from './images/deepBreathing.jpg';
import supportedStanding from './images/supportedStanding.jpg'

import breakfast from './images/breakfast.jpg';
import proteinShake from './images/proteinShake.jpg';
import lunch from './images/lunch.jpg';
import afternoonSnack from './images/afternoonSnack.jpg';
import dinner from './images/dinner.jpg';
import eveningTea from './images/eveningTea.jpg';

import yogaIcon from './icons/yoga.png';
import foodIcon from './icons/food.png';
import tipIcon from './icons/tip.png';

import UnderweightImg from './images/UnderweightImg.png';

const ExtremelyObese = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [colorScheme, setColorScheme] = useState('color-scheme-1');
  const [progress, setProgress] = useState(0);
  const [completedItems, setCompletedItems] = useState([]);

  // Load progress from localStorage on component mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('ExtremelyObeseProgress');
    if (savedProgress) {
      setProgress(parseInt(savedProgress));
    }
    
    const savedCompleted = localStorage.getItem('completedItems');
    if (savedCompleted) {
      setCompletedItems(JSON.parse(savedCompleted));
    }
  }, []);

  // Save progress to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('ExtremelyObeseProgress', progress.toString());
  }, [progress]);

  useEffect(() => {
    localStorage.setItem('completedItems', JSON.stringify(completedItems));
  }, [completedItems]);

  const yogaPoses = [
    { 
      name: 'Seated Neck Rolls: 5 rotations each direction',
      image: seatedNeckRolls, // Replace with actual import
      description: 'Gentle neck mobility exercise to relieve tension. Perform slowly with controlled breathing.'
    },
    { 
      name: 'Chair-assisted Arm Circles: 10 forward, 10 backward',
      image: chairArmCircles, // Replace with actual import
      description: 'Improves shoulder mobility. Keep movements smooth and controlled.'
    },
    { 
      name: 'Seated Marching: Lift knees alternately (20 total)',
      image: seatedMarching, // Replace with actual import
      description: 'Engages core and improves circulation. Use chair arms for balance if needed.'
    },
    { 
      name: 'Ankle Rotations: 10 each direction per foot',
      image: ankleRotations, // Replace with actual import
      description: 'Promotes ankle flexibility and prevents stiffness. Lift feet slightly off the floor.'
    },
    { 
      name: 'Deep Breathing: 5 minutes (inhale 4s, exhale 6s)',
      image: deepBreathing, // Replace with actual import
      description: 'Reduces stress and improves oxygen flow. Focus on diaphragmatic breathing.'
    },
    { 
      name: 'Standing (with support): 1-2 minutes every hour',
      image: supportedStanding, // Replace with actual import
      description: 'Encourages postural awareness and breaks prolonged sitting. Use a wall or sturdy chair.'
    }
  ];

  const mealPlan = [
    { 
      meal: 'Breakfast: 2 eggs + 1 slice whole grain toast + 1/2 avocado',
      image: breakfast, // Replace with actual import
      description: 'Balanced meal (~400 kcal). Healthy fats from avocado support satiety.'
    },
    { 
      meal: 'Mid-morning: 1 small protein shake (1 scoop protein + water)',
      image: proteinShake, // Replace with actual import
      description: 'Quick protein boost (~120 kcal). Helps maintain muscle mass.'
    },
    { 
      meal: 'Lunch: 120g grilled chicken + 1 cup non-starchy vegetables + 1/2 cup quinoa',
      image: lunch, // Replace with actual import
      description: 'Lean protein + fiber-rich carbs (~450 kcal). Quinoa provides complete amino acids.'
    },
    { 
      meal: 'Afternoon: 1/4 cup nuts + 1 small apple',
      image: afternoonSnack, // Replace with actual import
      description: 'Crunchy snack (~200 kcal). Nuts offer healthy fats and magnesium.'
    },
    { 
      meal: 'Dinner: 120g baked fish + 2 cups mixed vegetables + 1 tsp olive oil',
      image: dinner, // Replace with actual import
      description: 'Light yet nutrient-dense (~350 kcal). Omega-3s from fish reduce inflammation.'
    },
    { 
      meal: 'Evening: 1 cup herbal tea + 1 tbsp chia seeds soaked in water',
      image: eveningTea, // Replace with actual import
      description: 'Hydrating and fiber-rich (~50 kcal). Chia seeds aid digestion.'
    }
  ];

  const healthTips = [
  'Consult with a physician before starting any exercise program',
  'Begin with 5-10 minutes of movement daily, gradually increasing',
  'Focus on hydration - aim for 2-3 liters of water daily',
  'Use smaller plates (9-inch) to help with portion control',
  'Keep a food and activity log to track progress',
  'Set small, achievable weekly goals (e.g., add 2 minutes of activity)',
  'Consider working with a registered dietitian for meal planning',
  'Practice mindful eating - eat slowly without distractions',
  'Celebrate non-scale victories like improved energy or mobility',
  ];

  const handleItemClick = (image, category) => {
    setSelectedImage(image);
    setActiveCategory(category);
  };

  const closeImage = () => {
    setSelectedImage(null);
    setActiveCategory(null);
  };

  const toggleComplete = (item, category) => {
    const itemId = `${category}-${item.name || item.meal || item}`;
    if (completedItems.includes(itemId)) {
      setCompletedItems(completedItems.filter(id => id !== itemId));
      setProgress(Math.max(0, progress - 1));
    } else {
      setCompletedItems([...completedItems, itemId]);
      setProgress(progress + 1);
    }
  };

  const isCompleted = (item, category) => {
    const itemId = `${category}-${item.name || item.meal || item}`;
    return completedItems.includes(itemId);
  };

  const changeColorScheme = (scheme) => {
    setColorScheme(scheme);
  };

  return (
    <div className={`underweight-container ${colorScheme}`}>
      <div className="plan-container">
        <div className="plan-header">
          <h1 className="plan-title">Extremely Obese Wellness Plan</h1>
          <p>Personalized care for achieving meaningful, health-focused progress</p>
        </div>

        {selectedImage && (
          <div className="image-modal" onClick={closeImage}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <button className="close-button" onClick={closeImage}>×</button>
              <img src={selectedImage} alt="Detail" className="detail-image" />
              {activeCategory === 'yoga' && (
                <p className="image-description">
                  {yogaPoses.find(pose => pose.image === selectedImage)?.description}
                </p>
              )}
              {activeCategory === 'meal' && (
                <p className="image-description">
                  {mealPlan.find(meal => meal.image === selectedImage)?.description}
                </p>
              )}
            </div>
          </div>
        )}

        <div className="plan-content">
          {/* Top row with two sections side by side */}
          <div className="top-sections">
            {/* Left section */}
            <div className="plan-section left-section">
              <div className="section-header">
                <img src={yogaIcon} alt="Yoga" className="section-icon" />
                <h2 className="section-title">Recommended Yoga Routine</h2>
              </div>
              <ul className="section-content" type="none">
                {yogaPoses.map((pose, index) => (
                  <li 
                    className={`yoga-pose clickable-item ${isCompleted(pose, 'yoga') ? 'completed' : ''}`} 
                    key={index}
                    onClick={() => handleItemClick(pose.image, 'yoga')}
                    onDoubleClick={() => toggleComplete(pose, 'yoga')}
                  >
                    {pose.name}
                    {isCompleted(pose, 'yoga') && <span className="checkmark"> ✓</span>}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right section */}
            <div className="plan-section right-section">
              <div className="section-header">
                <img src={foodIcon} alt="Food" className="section-icon" />
                <h2 className="section-title">Nutrition Plan</h2>
              </div>
              <ul className="section-content" type="none">
                {mealPlan.map((item, index) => (
                  <li 
                    className={`meal-plan clickable-item ${isCompleted(item, 'meal') ? 'completed' : ''}`} 
                    key={index}
                    onClick={() => handleItemClick(item.image, 'meal')}
                    onDoubleClick={() => toggleComplete(item, 'meal')}
                  >
                    {item.meal}
                    {isCompleted(item, 'meal') && <span className="checkmark"> ✓</span>}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Center image */}
          <div className="center-image-container">
            <img src={UnderweightImg} alt="Center Visual" className="main-image" />
          </div>

          {/* Bottom section */}
          <div className='bottom'>
          <div className="plan-section bottom-section">
            <div className="section-header">
              <img src={tipIcon} alt="Tips" className="section-icon" />
              <h2 className="section-title">Health Tips</h2>
            </div>
            <ul className="section-content">
              {healthTips.map((tip, index) => (
                <li 
                  className={`tip-item ${isCompleted(tip, 'tip') ? 'completed' : ''}`} 
                  key={index}
                  onDoubleClick={() => toggleComplete(tip, 'tip')}
                >
                  {tip}
                  {isCompleted(tip, 'tip') && <span className="checkmark"> ✓</span>}
                </li>
              ))}
            </ul>
          </div>
        </div>
        </div>

        <div className="extremely-obese-notice-box-exo">
          <h3 className="extremely-obese-notice-title-exo">Important Note</h3>
          <p className="extremely-obese-notice-text">
            This plan is designed as general guidance. For optimal safety and results, 
            we strongly recommend consulting with healthcare professionals to create 
            a personalized program tailored to your specific health status and needs.
          </p>
        </div>

        <button className="back-button-exo" onClick={() => window.history.back()}>
          Back to BMI Calculator
        </button>

        <div className="color-scheme-selector">
          <div 
            className="color-scheme-btn scheme-3" 
            onClick={() => changeColorScheme('color-scheme-3')}
            title="Default Theme"
          ></div>
          <div 
            className="color-scheme-btn scheme-2" 
            onClick={() => changeColorScheme('color-scheme-2')}
            title="Dark Blue Theme"
          ></div>
          <div 
            className="color-scheme-btn scheme-1" 
            onClick={() => changeColorScheme('color-scheme-1')}
            title="Purple Theme"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ExtremelyObese;