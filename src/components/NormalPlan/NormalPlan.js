import React, { useState, useEffect } from 'react';
import './normalPlan.css';

// Import images
import suryaNamaskar from './images/surya-namaskar.jpg';
import bhujangasana from './images/bhujangasana.jpg';
import tadasana from './images/tadasana.jpg';
import vrikshasana from './images/vrikshasana.jpg';
import trikonasana from './images/trikonasana.jpg';
import balasana from './images/balasana.jpg'

import breakfast from './images/breakfast.jpg';
import midMorning from './images/nuts.jpg';
import lunch from './images/lunch.jpg';
import evening from './images/sandwich.jpg';
import dinner from './images/dinner.jpg';
import hydration from './images/hydration.jpg';

import yogaIcon from './icons/yoga.png';
import foodIcon from './icons/food.png';
import tipIcon from './icons/tip.png';

import UnderweightImg from './images/UnderweightImg.png';

const NormalPlan = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [colorScheme, setColorScheme] = useState('color-scheme-1');
  const [progress, setProgress] = useState(0);
  const [completedItems, setCompletedItems] = useState([]);

  // Load progress from localStorage on component mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('NormalPlanProgress');
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
    localStorage.setItem('NormalPlanProgress', progress.toString());
  }, [progress]);

  useEffect(() => {
    localStorage.setItem('completedItems', JSON.stringify(completedItems));
  }, [completedItems]);

  const yogaPoses = [
    { 
      name: 'Surya Namaskar (Sun Salutation) - 3 rounds',
      image: suryaNamaskar,
      description: 'A dynamic sequence of 12 yoga postures that energize the body and improve flexibility.'
    },
    { 
      name: 'Tadasana (Mountain Pose) - 1 minute',
      image: tadasana,
      description: 'Improves posture, balance, and awareness while grounding the body.'
    },
    { 
      name: 'Vrikshasana (Tree Pose) - 30 seconds each side',
      image: vrikshasana,
      description: 'Enhances balance, strengthens legs, and improves focus.'
    },
    { 
      name: 'Trikonasana (Triangle Pose) - 30 seconds each side',
      image: trikonasana,
      description: 'Stretches the legs, hips, and spine while stimulating digestion.'
    },
    { 
      name: 'Bhujangasana (Cobra Pose) - 30 seconds',
      image: bhujangasana,
      description: 'Strengthens the spine and opens the chest for better breathing.'
    },
    { 
      name: 'Balasana (Child\'s Pose) - 1 minute',
      image: balasana,
      description: 'A relaxing pose that gently stretches the hips, thighs, and lower back.'
    },
  ];
  
  const mealPlan = [
    { 
      meal: 'Breakfast: Oatmeal with fruits and nuts + green tea',
      image: breakfast,
      description: 'Provides fiber, antioxidants, and healthy fats for sustained energy.'
    },
    { 
      meal: 'Mid-morning: Handful of nuts or yogurt with berries',
      image: midMorning,
      description: 'A protein-rich snack to keep energy levels stable.'
    },
    { 
      meal: 'Lunch: Whole grains with lean protein and vegetables',
      image: lunch,
      description: 'Balanced meal with complex carbs, protein, and essential nutrients.'
    },
    { 
      meal: 'Evening: Fruit with a handful of almonds',
      image: evening,
      description: 'A light, nutritious snack to curb hunger before dinner.'
    },
    { 
      meal: 'Dinner: Grilled fish/chicken with quinoa and roasted vegetables',
      image: dinner,
      description: 'High-protein meal with healthy carbs for muscle recovery.'
    },
    { 
      meal: 'Hydration: 8-10 glasses of water throughout the day',
      image: hydration,
      description: 'Essential for digestion, metabolism, and overall well-being.'
    },
  ];
  
  const healthTips = [
    'Maintain a balanced diet with all food groups',
    'Engage in 150 minutes of moderate exercise weekly',
    'Include both cardio and strength training',
    'Practice mindfulness and stress management',
    'Get 7-9 hours of quality sleep each night',
    'Monitor portion sizes to maintain healthy weight',
    'Limit processed foods and added sugars',
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
          <h1 className="plan-title">Normal Weight Wellness Plan</h1>
          <p>Maintaining Your Current Healthy Weight</p>
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

        <div className="extremely-obese-notice-box-normal">
          <h3 className="extremely-obese-notice-title-normal">Important Note</h3>
          <p className="extremely-obese-notice-text">
            This plan is designed as general guidance. For optimal safety and results, 
            we strongly recommend consulting with healthcare professionals to create 
            a personalized program tailored to your specific health status and needs.
          </p>
        </div>

        <button className="back-button-normal" onClick={() => window.history.back()}>
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

export default NormalPlan;