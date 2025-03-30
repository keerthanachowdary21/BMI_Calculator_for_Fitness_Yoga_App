import React, { useState, useEffect } from 'react';
import './overweightPlan.css';

// Import images
import suryaNamaskar from './images/surya-namaskar.jpg';
import bhujangasana from './images/bhujangasana.jpg';
import pavanamuktasana from './images/pavanamuktasana.jpg';
import dhanurasana from './images/dhanurasana.jpg';
import vajrasana from './images/vajrasana.jpg';
import ardhaMatsyendrasana from './images/ardhaMatsyendrasana.jpg'

import breakfast from './images/breakfast.jpg';
import midMorning from './images/nuts.jpg';
import lunch from './images/lunch.jpg';
import evening from './images/sandwich.jpg';
import dinner from './images/dinner.jpg';
import bedtime from './images/water.jpg';

import yogaIcon from './icons/yoga.png';
import foodIcon from './icons/food.png';
import tipIcon from './icons/tip.png';

import UnderweightImg from './images/UnderweightImg.png';

const OverweightPlan = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [colorScheme, setColorScheme] = useState('color-scheme-1');
  const [progress, setProgress] = useState(0);
  const [completedItems, setCompletedItems] = useState([]);

  // Load progress from localStorage on component mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('OverweightPlanProgress');
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
    localStorage.setItem('OverweightPlanProgress', progress.toString());
  }, [progress]);

  useEffect(() => {
    localStorage.setItem('completedItems', JSON.stringify(completedItems));
  }, [completedItems]);

  const yogaPoses = [
    { 
      name: 'Surya Namaskar (Sun Salutation) - 2 slow rounds',
      image: suryaNamaskar, // Replace with your image import
      description: 'A gentle flow of 12 yoga postures to warm up the body and improve circulation.'
    },
    { 
      name: 'Vajrasana (Thunderbolt Pose) after meals - 5 minutes',
      image: vajrasana, // Replace with your image import
      description: 'Aids digestion and promotes calmness when practiced post-meals.'
    },
    { 
      name: 'Pavanamuktasana (Wind-Relieving Pose) - 30 seconds',
      image: pavanamuktasana, // Replace with your image import
      description: 'Helps relieve gas and bloating while stretching the lower back.'
    },
    { 
      name: 'Bhujangasana (Cobra Pose) - 30 seconds',
      image: bhujangasana, // Replace with your image import
      description: 'Strengthens the spine and opens the chest for deeper breathing.'
    },
    { 
      name: 'Dhanurasana (Bow Pose) - 30 seconds',
      image: dhanurasana, // Replace with your image import
      description: 'Stretches the entire front body and improves posture.'
    },
    { 
      name: 'Ardha Matsyendrasana (Half Spinal Twist) - 30 seconds each side',
      image: ardhaMatsyendrasana, // Replace with your image import
      description: 'Detoxifies organs and increases spinal flexibility.'
    },
  ];
  
  const mealPlan = [
    { 
      meal: 'Breakfast: Vegetable omelet with whole grain toast + green tea',
      image: breakfast, // Replace with your image import
      description: 'High-protein start with fiber and antioxidants for sustained energy.'
    },
    { 
      meal: 'Mid-morning: Handful of nuts or fruit with yogurt',
      image: midMorning, // Replace with your image import
      description: 'Balanced snack with healthy fats, protein, and natural sugars.'
    },
    { 
      meal: 'Lunch: Grilled chicken/fish with quinoa and steamed vegetables',
      image: lunch, // Replace with your image import
      description: 'Lean protein with complex carbs and micronutrients for recovery.'
    },
    { 
      meal: 'Evening: Herbal tea with a few almonds',
      image: evening, // Replace with your image import
      description: 'Low-calorie option to curb cravings while providing healthy fats.'
    },
    { 
      meal: 'Dinner: Lentil soup with mixed vegetables and small portion of brown rice',
      image: dinner, // Replace with your image import
      description: 'Light yet nutrient-dense meal with plant-based protein and fiber.'
    },
    { 
      meal: 'Hydration: 8-10 glasses of water throughout the day',
      image: bedtime, // Replace with your image import
      description: 'Essential for metabolism, digestion, and overall vitality.'
    },
  ];
  
  // HealthTips remain as an array of strings (no changes needed)
  const healthTips = [
    'Focus on portion control and mindful eating',
    'Incorporate 30 minutes of moderate exercise daily',
    'Include more fiber-rich foods in your diet',
    'Limit processed foods and added sugars',
    'Practice stress-reducing techniques like meditation',
    'Get 7-8 hours of quality sleep each night',
    'Start with low-impact exercises if new to working out',
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
          <h1 className="plan-title">Underweight Wellness Plan</h1>
          <p>Your Personalized Guide To Healthy Weight Gain</p>
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

        <div className="extremely-obese-notice-box-over">
          <h3 className="extremely-obese-notice-title-over">Important Note</h3>
          <p className="extremely-obese-notice-text-over">
            This plan is designed as general guidance. For optimal safety and results, 
            we strongly recommend consulting with healthcare professionals to create 
            a personalized program tailored to your specific health status and needs.
          </p>
        </div>

        <button className="back-button-over" onClick={() => window.history.back()}>
          Back to BMI Calculator
        </button>

        <div className="color-scheme-selector">
          <div 
            className="color-scheme-btn scheme-1" 
            onClick={() => changeColorScheme('color-scheme-1')}
            title="Default Theme"
          ></div>
          <div 
            className="color-scheme-btn scheme-2" 
            onClick={() => changeColorScheme('color-scheme-2')}
            title="Dark Blue Theme"
          ></div>
          <div 
            className="color-scheme-btn scheme-3" 
            onClick={() => changeColorScheme('color-scheme-3')}
            title="Purple Theme"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default OverweightPlan;