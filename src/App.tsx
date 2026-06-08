/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, Sparkles, User, Award, School, Settings, ArrowRight,
  HelpCircle, ChevronRight, CheckCircle2, Star, Check 
} from 'lucide-react';
import { ClassGroup, Exam, Submission } from './types';
import { 
  loadClasses, saveClasses, 
  loadExams, saveExams, 
  loadSubmissions, saveSubmissions 
} from './data';
import TeacherPortal from './components/TeacherPortal';
import StudentPortal from './components/StudentPortal';
import Vnu1001Portal from './components/Vnu1001Portal';

export default function App() {
  // Global Persisted Datastore
  const [classes, setClasses] = useState<ClassGroup[]>([]);
  const [exams, setExams] = useState<Exam[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  // Current Mode: directly launch the student custom uploader and portal workspace
  const [currentMode, setCurrentMode] = useState<'launcher' | 'teacher' | 'student' | 'vnu1001'>('vnu1001');

  // Load initial datasets
  useEffect(() => {
    // Keep basic persistence functional for simple storage keys if required
    setClasses(loadClasses());
    setExams(loadExams());
    setSubmissions(loadSubmissions());
  }, []);

  const handleUpdateClasses = (updated: ClassGroup[]) => {
    setClasses(updated);
    saveClasses(updated);
  };

  const handleUpdateExams = (updated: Exam[]) => {
    setExams(updated);
    saveExams(updated);
  };

  const handleUpdateSubmissions = (updated: Submission[]) => {
    setSubmissions(updated);
    saveSubmissions(updated);
  };

  return (
    <div className="w-screen h-screen overflow-hidden bg-slate-50 relative flex flex-col font-sans selection:bg-blue-200">
      
      {/* Render Pages */}
      <AnimatePresence mode="wait">
        
        {/* RE-PURPOSED WORKSPACE PANEL FOR STUDENT CUSTOM SUBMISSIONS */}
        {currentMode === 'vnu1001' && (
          <motion.div 
            key="vnu1001"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 overflow-hidden"
          >
            <Vnu1001Portal
              onBackToLauncher={() => {}} // No launcher toggle needed
            />
          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
}
