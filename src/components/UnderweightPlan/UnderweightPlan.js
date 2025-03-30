import React, { useState, useEffect } from 'react';
import './underweightPlan.css';

// Import images
import suryaNamaskar from './images/surya-namaskar.jpg';
import bhujangasana from './images/bhujangasana.jpg';
import shalabhasana from './images/shalabhasana.jpg';
import dhanurasana from './images/dhanurasana.jpg';
import vajrasana from './images/vajrasana.jpg';

import breakfast from './images/breakfast.jpg';
import midMorning from './images/nuts.jpg';
import lunch from './images/lunch.jpg';
import evening from './images/sandwich.jpg';
import dinner from './images/dinner.jpg';
import bedtime from './images/milk.jpg';

import yogaIcon from './icons/yoga.png';
import foodIcon from './icons/food.png';
import tipIcon from './icons/tip.png';

import UnderweightImg from './images/UnderweightImg.png';

const UnderweightPlan = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [colorScheme, setColorScheme] = useState('color-scheme-1');
  const [progress, setProgress] = useState(0);
  const [completedItems, setCompletedItems] = useState([]);

  // Load progress from localStorage on component mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('underweightPlanProgress');
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
    localStorage.setItem('underweightPlanProgress', progress.toString());
  }, [progress]);

  useEffect(() => {
    localStorage.setItem('completedItems', JSON.stringify(completedItems));
  }, [completedItems]);

  const yogaPoses = [
    { 
      name: 'Surya Namaskar (Sun Salutation) - 5 rounds',
      image: suryaNamaskar,
      description: 'A sequence of 12 powerful yoga poses that improve flexibility and strength.'
    },
    { 
      name: 'Bhujangasana (Cobra Pose) - 30 seconds',
      image: bhujangasana,
      description: 'Strengthens the spine, stretches chest and lungs, shoulders, and abdomen.'
    },
    { 
      name: 'Shalabhasana (Locust Pose) - 30 seconds',
      image: shalabhasana,
      description: 'Strengthens the muscles of the spine, buttocks, and backs of the arms and legs.'
    },
    { 
      name: 'Dhanurasana (Bow Pose) - 30 seconds',
      image: dhanurasana,
      description: 'Stretches the entire front of the body, ankles, thighs and groins, abdomen and chest.'
    },
    { 
      name: 'Vajrasana (Thunderbolt Pose) after meals - 5 minutes',
      image: vajrasana,
      description: 'Aids digestion and helps in maintaining good posture.'
    },
  ];

  const mealPlan = [
    { 
      meal: 'Breakfast: Whole grain toast with avocado + banana smoothie with nuts',
      image: breakfast,
      description: 'Provides complex carbs, healthy fats, and protein to start your day.'
    },
    { 
      meal: 'Mid-morning: Handful of nuts and dried fruits',
      image: midMorning,
      description: 'Energy-dense snack with healthy fats and natural sugars.'
    },
    { 
      meal: 'Lunch: Rice with dal, vegetables, and ghee + yogurt',
      image: lunch,
      description: 'Balanced meal with carbs, protein, fats, and probiotics.'
    },
    { 
      meal: 'Evening: Cheese sandwich + milkshake',
      image: evening,
      description: 'Calorie-dense snack with protein and calcium.'
    },
    { 
      meal: 'Dinner: Chicken/fish with potatoes + whole wheat chapati',
      image: dinner,
      description: 'High-protein meal with complex carbohydrates.'
    },
    { 
      meal: 'Before bed: Warm milk with turmeric',
      image: bedtime,
      description: 'Promotes relaxation and provides protein for overnight recovery.'
    },
  ];

  const healthTips = [
    'Eat frequent, nutrient-dense meals (5-6 times/day)',
    'Include healthy fats like nuts, seeds, avocado, and olive oil',
    'Choose protein-rich foods at every meal',
    'Do strength training 3 times/week to build muscle',
    'Stay hydrated but avoid drinking before meals',
    'Get enough sleep (7-9 hours) for proper recovery',
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

        <div className="extremely-obese-notice-box-under">
          <h3 className="extremely-obese-notice-title-under">Important Note</h3>
          <p className="extremely-obese-notice-text-under">
            This plan is designed as general guidance. For optimal safety and results, 
            we strongly recommend consulting with healthcare professionals to create 
            a personalized program tailored to your specific health status and needs.
          </p>
        </div>

        <button className="back-button-under" onClick={() => window.history.back()}>
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

export default UnderweightPlan;