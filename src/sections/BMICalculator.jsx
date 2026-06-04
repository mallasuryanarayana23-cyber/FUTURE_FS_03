import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalculator, FaInfoCircle } from 'react-icons/fa';

export default function BMICalculator() {
  const [unit, setUnit] = useState('metric'); // 'metric' or 'imperial'
  const [weight, setWeight] = useState(70); // kg or lbs
  const [height, setHeight] = useState(175); // cm or inches
  
  // Imperial fields
  const [feet, setFeet] = useState(5);
  const [inches, setInches] = useState(9);
  const [lbs, setLbs] = useState(154);

  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');

  // Sync inputs when unit changes
  useEffect(() => {
    if (unit === 'metric') {
      // Convert Imperial to Metric
      const totalInches = (feet * 12) + parseInt(inches, 10);
      const convertedHeight = Math.round(totalInches * 2.54);
      const convertedWeight = Math.round(lbs * 0.45359237);
      setHeight(convertedHeight);
      setWeight(convertedWeight);
    } else {
      // Convert Metric to Imperial
      const totalInches = height / 2.54;
      const ft = Math.floor(totalInches / 12);
      const inc = Math.round(totalInches % 12);
      const convertedWeight = Math.round(weight / 0.45359237);
      setFeet(ft);
      setInches(inc);
      setLbs(convertedWeight);
    }
  }, [unit]);

  const calculateBMI = (e) => {
    if (e) e.preventDefault();
    setError('');

    let hMet = 0; // height in meters
    let wKg = 0;  // weight in kg

    if (unit === 'metric') {
      if (height <= 0 || weight <= 0) {
        setError('Please enter positive values for height and weight.');
        setBmi(null);
        return;
      }
      hMet = height / 100;
      wKg = weight;
    } else {
      const totalInches = (parseInt(feet, 10) * 12) + parseInt(inches, 10);
      if (totalInches <= 0 || lbs <= 0) {
        setError('Please enter positive values for height and weight.');
        setBmi(null);
        return;
      }
      hMet = (totalInches * 2.54) / 100;
      wKg = lbs * 0.45359237;
    }

    const calculatedBmi = wKg / (hMet * hMet);
    const roundedBmi = parseFloat(calculatedBmi.toFixed(1));
    setBmi(roundedBmi);

    // Determine category
    if (roundedBmi < 18.5) {
      setCategory('Underweight');
      setFeedback('You are in the underweight range. Fueling your workouts with dense macros and strength routines can help you build quality muscle.');
    } else if (roundedBmi >= 18.5 && roundedBmi <= 24.9) {
      setCategory('Normal');
      setFeedback('Excellent! You are in the healthy weight range. Maintain your activity level and balance nutrition to sustain optimal performance.');
    } else if (roundedBmi >= 25 && roundedBmi <= 29.9) {
      setCategory('Overweight');
      setFeedback('You are in the overweight range. Incorporating more high-intensity cardio (HIIT) and fine-tuning your diet will accelerate fat loss.');
    } else {
      setCategory('Obese');
      setFeedback('You are in the obese range. We suggest a structured combination of cardio, progressive strength training, and strict caloric deficit.');
    }
  };

  // Instant calculation on values update
  useEffect(() => {
    calculateBMI();
  }, [weight, height, feet, inches, lbs, unit]);

  // Color helper for BMI category
  const getCategoryColor = (cat) => {
    switch (cat) {
      case 'Underweight': return 'text-blue-400 border-blue-500/20 bg-blue-500/10';
      case 'Normal': return 'text-green-400 border-green-500/20 bg-green-500/10';
      case 'Overweight': return 'text-yellow-400 border-yellow-500/20 bg-yellow-500/10';
      case 'Obese': return 'text-red-400 border-red-500/20 bg-red-500/10';
      default: return 'text-white';
    }
  };

  const getMeterPercent = (val) => {
    if (!val) return 0;
    // Map BMI from 15 to 35 to percentage
    const min = 15;
    const max = 35;
    const percent = ((val - min) / (max - min)) * 100;
    return Math.min(Math.max(percent, 0), 100);
  };

  return (
    <section 
      id="bmi" 
      className="relative min-h-screen py-24 md:py-32 flex flex-col justify-center overflow-hidden bg-[#070707]"
    >
      {/* Glow effects */}
      <div className="absolute right-1/4 bottom-1/4 w-[400px] h-[400px] bg-neon-red/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute left-1/4 top-1/4 w-[400px] h-[400px] bg-neon-orange/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 w-full relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24 flex flex-col items-center">
          <span className="font-orbitron text-xs font-bold uppercase tracking-widest text-neon-red mb-2 block">
            Health Metrics
          </span>
          <h2 className="font-orbitron text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-wide text-white leading-none">
            BMI <span className="text-gradient-neon">Calculator</span>
          </h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-neon-red to-neon-orange mt-6" />
        </div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Info Card */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 text-left flex flex-col gap-6"
          >
            <h3 className="font-orbitron text-xl font-bold uppercase tracking-wider text-white">
              Understand Your BMI Score
            </h3>
            
            <p className="font-inter text-sm text-gray-text leading-relaxed">
              Body Mass Index (BMI) is a convenient calculation of body fat based on height and weight. While not directly measuring body fat percentage, it acts as an excellent general benchmark for defining health targets.
            </p>

            {/* Category Chart Table */}
            <div className="glass-panel rounded-2xl overflow-hidden border border-white/5 shadow-lg">
              <div className="grid grid-cols-2 bg-white/5 py-3.5 px-5 border-b border-white/10 font-orbitron text-[10px] font-bold uppercase tracking-wider text-white">
                <span>BMI Range</span>
                <span>Classification</span>
              </div>
              <div className="flex flex-col">
                <div className={`grid grid-cols-2 py-3 px-5 border-b border-white/5 font-inter text-xs ${bmi && bmi < 18.5 ? 'bg-blue-500/10 text-blue-400 font-bold' : 'text-gray-300'}`}>
                  <span>Below 18.5</span>
                  <span>Underweight</span>
                </div>
                <div className={`grid grid-cols-2 py-3 px-5 border-b border-white/5 font-inter text-xs ${bmi && bmi >= 18.5 && bmi <= 24.9 ? 'bg-green-500/10 text-green-400 font-bold' : 'text-gray-300'}`}>
                  <span>18.5 – 24.9</span>
                  <span>Normal Weight</span>
                </div>
                <div className={`grid grid-cols-2 py-3 px-5 border-b border-white/5 font-inter text-xs ${bmi && bmi >= 25 && bmi <= 29.9 ? 'bg-yellow-500/10 text-yellow-400 font-bold' : 'text-gray-300'}`}>
                  <span>25.0 – 29.9</span>
                  <span>Overweight</span>
                </div>
                <div className={`grid grid-cols-2 py-3 px-5 font-inter text-xs ${bmi && bmi >= 30 ? 'bg-red-500/10 text-red-400 font-bold' : 'text-gray-300'}`}>
                  <span>30.0 and Above</span>
                  <span>Obese</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white/5 border border-white/5 p-4 rounded-xl">
              <FaInfoCircle className="text-neon-orange text-lg mt-0.5 flex-shrink-0" />
              <p className="font-inter text-xs text-gray-text leading-relaxed">
                Note: BMI does not differentiate between weight from muscle mass and weight from body fat. Bodybuilders and highly muscular athletes might register high scores.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Calculator Box */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/5 shadow-2xl flex flex-col gap-6">
              
              {/* Unit Toggle Tabs */}
              <div className="flex bg-white/5 rounded-xl p-1.5 border border-white/5">
                <button
                  type="button"
                  onClick={() => setUnit('metric')}
                  className={`flex-1 font-orbitron text-xs font-bold uppercase tracking-wider py-3 rounded-lg cursor-pointer transition-all duration-300 ${
                    unit === 'metric' ? 'bg-gradient-to-r from-neon-red to-neon-orange text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Metric (KG/CM)
                </button>
                <button
                  type="button"
                  onClick={() => setUnit('imperial')}
                  className={`flex-1 font-orbitron text-xs font-bold uppercase tracking-wider py-3 rounded-lg cursor-pointer transition-all duration-300 ${
                    unit === 'imperial' ? 'bg-gradient-to-r from-neon-red to-neon-orange text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Imperial (LBS/IN)
                </button>
              </div>

              {/* Dynamic Input Form */}
              <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-6">
                
                {unit === 'metric' ? (
                  <>
                    {/* Metric Height Slider */}
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <label className="font-orbitron text-xs uppercase tracking-wider text-gray-300">Height</label>
                        <span className="font-orbitron font-bold text-white text-sm">{height} <span className="text-[10px] text-neon-red">CM</span></span>
                      </div>
                      <input 
                        type="range" 
                        min="120" 
                        max="220" 
                        value={height}
                        onChange={(e) => setHeight(parseInt(e.target.value, 10))}
                        className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-neon-red"
                      />
                    </div>

                    {/* Metric Weight Slider */}
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <label className="font-orbitron text-xs uppercase tracking-wider text-gray-300">Weight</label>
                        <span className="font-orbitron font-bold text-white text-sm">{weight} <span className="text-[10px] text-neon-orange">KG</span></span>
                      </div>
                      <input 
                        type="range" 
                        min="40" 
                        max="150" 
                        value={weight}
                        onChange={(e) => setWeight(parseInt(e.target.value, 10))}
                        className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-neon-orange"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    {/* Imperial Height Inputs */}
                    <div className="grid grid-cols-2 gap-4 text-left">
                      <div className="flex flex-col gap-2">
                        <label className="font-orbitron text-xs uppercase tracking-wider text-gray-300">Height (Feet)</label>
                        <input
                          type="number"
                          min="3"
                          max="8"
                          value={feet}
                          onChange={(e) => setFeet(Math.max(3, parseInt(e.target.value, 10) || 0))}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-orbitron text-white text-sm focus:outline-none focus:border-neon-red transition-all"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="font-orbitron text-xs uppercase tracking-wider text-gray-300">Height (Inches)</label>
                        <input
                          type="number"
                          min="0"
                          max="11"
                          value={inches}
                          onChange={(e) => setInches(Math.max(0, Math.min(11, parseInt(e.target.value, 10) || 0)))}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-orbitron text-white text-sm focus:outline-none focus:border-neon-red transition-all"
                        />
                      </div>
                    </div>

                    {/* Imperial Weight Input */}
                    <div className="flex flex-col gap-2 text-left">
                      <label className="font-orbitron text-xs uppercase tracking-wider text-gray-300">Weight (Lbs)</label>
                      <input
                        type="number"
                        min="50"
                        max="400"
                        value={lbs}
                        onChange={(e) => setLbs(Math.max(50, parseInt(e.target.value, 10) || 0))}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-orbitron text-white text-sm focus:outline-none focus:border-neon-orange transition-all"
                      />
                    </div>
                  </>
                )}

              </form>

              {/* Error Message */}
              {error && (
                <div className="text-red-500 text-xs font-semibold">{error}</div>
              )}

              {/* Real-time Results Card */}
              <AnimatePresence mode="wait">
                {bmi !== null && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="mt-4 p-5 sm:p-6 rounded-2xl border bg-black/40 border-white/5 shadow-inner flex flex-col gap-6 text-left"
                  >
                    {/* Header */}
                    <div className="flex justify-between items-center flex-wrap gap-2">
                      <div>
                        <p className="text-[10px] text-gray-text uppercase tracking-widest">Your Score</p>
                        <h4 className="font-orbitron text-3xl font-black text-white">{bmi}</h4>
                      </div>
                      <div className={`px-4 py-1.5 rounded-full border font-orbitron text-xs font-bold uppercase tracking-wider ${getCategoryColor(category)}`}>
                        {category}
                      </div>
                    </div>

                    {/* Visual Meter bar */}
                    <div className="flex flex-col gap-1.5">
                      <div className="w-full h-2.5 bg-white/5 border border-white/5 rounded-full relative overflow-hidden">
                        {/* Status bar zones */}
                        <div className="absolute inset-0 flex">
                          <div className="w-[18.5%] h-full bg-blue-500/10 border-r border-black/20" />
                          <div className="w-[32.4%] h-full bg-green-500/10 border-r border-black/20" />
                          <div className="w-[25%] h-full bg-yellow-500/10 border-r border-black/20" />
                          <div className="w-[24.1%] h-full bg-red-500/10" />
                        </div>
                        {/* Dynamic Slider Indicator */}
                        <motion.div 
                          className="absolute top-0 h-full w-2 bg-white shadow-[0_0_8px_#ffffff]"
                          initial={{ left: 0 }}
                          animate={{ left: `${getMeterPercent(bmi)}%` }}
                          transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                        />
                      </div>
                      
                      {/* Meter Labels */}
                      <div className="flex justify-between text-[8px] font-orbitron uppercase tracking-widest text-gray-text">
                        <span>15.0</span>
                        <span>18.5 (Fit)</span>
                        <span>25.0</span>
                        <span>30.0 (Obese)</span>
                        <span>35.0</span>
                      </div>
                    </div>

                    {/* Personal Recommendation text */}
                    <p className="font-inter text-xs text-gray-300 leading-relaxed italic border-l-2 border-neon-red pl-3.5">
                      {feedback}
                    </p>

                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
