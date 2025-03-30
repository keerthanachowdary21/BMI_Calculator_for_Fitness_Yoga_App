import React, { useState, useEffect } from 'react';
import './obesePlan.css';

// Import images
import chairTadasana from './images/chairTadasana.jpg';
import seatedVajrasana from './images/seatedVajrasana.jpg';
import supportedCobra from './images/supportedCobra.jpg';
import legsUpWall from './images/legsUpWall.jpg';
import seatedForwardBend from './images/seatedForwardBend.jpg';

import breakfast from './images/breakfast.jpg';
import appleAlmondButter from './images/appleAlmondButter.jpg';
import lunch from './images/lunch.jpg';
import yogurtSnack from './images/yogurtSnack.jpg';
import dinner from './images/dinner.jpg';
import herbalTea from './images/herbalTea.jpg';

import yogaIcon from './icons/yoga.png';
import foodIcon from './icons/food.png';
import tipIcon from './icons/tip.png';

import UnderweightImg from './images/UnderweightImg.png';

const ObesePlan = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [colorScheme, setColorScheme] = useState('color-scheme-1');
  const [progress, setProgress] = useState(0);
  const [completedItems, setCompletedItems] = useState([]);

  // Load progress from localStorage on component mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('zProgress');
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
    localStorage.setItem('ObesePlanProgress', progress.toString());
  }, [progress]);

  useEffect(() => {
    localStorage.setItem('completedItems', JSON.stringify(completedItems));
  }, [completedItems]);

  const yogaPoses = [
    { 
      name: 'Chair-assisted Tadasana (Mountain Pose) - 1 minute',
      image: chairTadasana, // Replace with actual import
      description: 'Improves posture and balance with chair support. Focus on grounding through the feet and lengthening the spine.'
    },
    { 
      name: 'Seated Vajrasana (Thunderbolt Pose) - 2 minutes',
      image: seatedVajrasana, // Replace with actual import
      description: 'Aids digestion and promotes calmness. Use a cushion under knees if needed for comfort.'
    },
    { 
      name: 'Supported Bhujangasana (Cobra Pose with pillow) - 30 seconds',
      image: supportedCobra, // Replace with actual import
      description: 'Gentle backbend with chest support to strengthen the spine without strain.'
    },
    { 
      name: 'Seated Forward Bend (with strap) - 30 seconds',
      image: seatedForwardBend, // Replace with actual import
      description: 'Stretches hamstrings safely using a strap. Keep back straight and hinge from hips.'
    },
    { 
      name: 'Supported Legs-Up-The-Wall - 3-5 minutes',
      image: legsUpWall, // Replace with actual import
      description: 'Relaxes the nervous system and reduces leg swelling. Place a pillow under hips for support.'
    }
  ];
  
  const mealPlan = [
    { 
      meal: 'Breakfast: Scrambled eggs with spinach + 1 slice whole grain toast',
      image: breakfast, // Replace with actual import
      description: 'High-protein, fiber-rich start (300-350 kcal). Spinach adds iron and vitamins.'
    },
    { 
      meal: 'Mid-morning: 1 small apple with 1 tbsp almond butter',
      image: appleAlmondButter, // Replace with actual import
      description: 'Balanced snack (200 kcal). Fiber from apple + healthy fats from almonds curb cravings.'
    },
    { 
      meal: 'Lunch: Grilled chicken (120g) with roasted vegetables (1 cup) and quinoa (1/2 cup)',
      image: lunch, // Replace with actual import
      description: 'Lean protein + complex carbs (400-450 kcal). Quinoa provides complete plant protein.'
    },
    { 
      meal: 'Afternoon: Greek yogurt (150g) with cinnamon',
      image: yogurtSnack, // Replace with actual import
      description: 'Protein-packed (150 kcal). Cinnamon helps regulate blood sugar.'
    },
    { 
      meal: 'Dinner: Baked salmon (100g) with steamed broccoli (1 cup) and mashed cauliflower (1/2 cup)',
      image: dinner, // Replace with actual import
      description: 'Omega-3s from salmon + low-carb veggies (350-400 kcal). Cauliflower adds fiber.'
    },
    { 
      meal: 'Evening: Herbal tea with 1 tsp honey (optional)',
      image: herbalTea, // Replace with actual import
      description: 'Calming and low-calorie (30 kcal with honey). Chamomile or peppermint recommended.'
    }
  ];
  
  const healthTips = [
    'Start with low-impact exercises like walking or swimming',
    'Focus on portion control using smaller plates',
    'Increase water intake to 2-3 liters daily',
    'Practice mindful eating - chew slowly and savor each bite',
    'Get support from a healthcare professional or dietitian',
    'Aim for 7-9 hours of quality sleep nightly',
    'Break activity into 10-minute chunks throughout the day',
    'Keep a food and activity journal for accountability'
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
          <h1 className="plan-title">Obese Plan Wellness Plan</h1>
          <p>Your Journey Towards Sustainable Weight Loss and Better Health</p>
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

        <div className="extremely-obese-notice-box-obese">
          <h3 className="extremely-obese-notice-title-obese">Important Note</h3>
          <p className="extremely-obese-notice-text">
            This plan is designed as general guidance. For optimal safety and results, 
            we strongly recommend consulting with healthcare professionals to create 
            a personalized program tailored to your specific health status and needs.
          </p>
        </div>

        <button className="back-button-obese" onClick={() => window.history.back()}>
          Back to BMI Calculator
        </button>

        <div className="color-scheme-selector">
          <div 
            className="color-scheme-btn scheme-3" 
            onClick={() => changeColorScheme('color-scheme-1')}
            title="Default Theme"
          ></div>
          <div 
            className="color-scheme-btn scheme-2" 
            onClick={() => changeColorScheme('color-scheme-2')}
            title="Dark Blue Theme"
          ></div>
          <div 
            className="color-scheme-btn scheme-1" 
            onClick={() => changeColorScheme('color-scheme-3')}
            title="Purple Theme"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ObesePlan;