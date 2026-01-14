import { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Layers, Rocket, Target, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
    {
        icon: Layers,
        title: 'Welcome to DigitalHub',
        description: 'Your all-in-one command center for digital marketing success. Let\'s get you set up in minutes.',
    },
    {
        icon: Target,
        title: 'Set Your Goals',
        description: 'What do you want to achieve? DigitalHub optimizes your experience based on your specific goals.',
    },
    {
        icon: Users,
        title: 'Invite Your Team',
        description: 'Collaborate seamlessly. Add your team members to manage campaigns together.',
    },
    {
        icon: Rocket,
        title: 'Ready for Liftoff',
        description: 'You\'re all set! Start your first campaign or explore the analytics dashboard.',
    },
];

export function OnboardingWizard() {
    const [open, setOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
        if (!hasSeenOnboarding) {
            setOpen(true);
        }
    }, []);

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            handleComplete();
        }
    };

    const handleComplete = () => {
        localStorage.setItem('hasSeenOnboarding', 'true');
        setOpen(false);
    };

    const CurrentIcon = steps[currentStep].icon;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[500px] overflow-hidden">
                <div className="absolute top-0 w-full h-1 bg-muted">
                    <motion.div
                        className="h-full bg-primary"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>

                <div className="pt-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="flex flex-col items-center text-center space-y-4 py-4"
                        >
                            <div className="h-16 w-16 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-lg shadow-primary/20">
                                {CurrentIcon && (
                                    <CurrentIcon className="h-8 w-8 text-primary-foreground" />
                                )}
                            </div>
                            <DialogHeader>
                                <DialogTitle className="text-2xl text-center">
                                    {steps[currentStep].title}
                                </DialogTitle>
                                <DialogDescription className="text-center text-base">
                                    {steps[currentStep].description}
                                </DialogDescription>
                            </DialogHeader>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <DialogFooter className="sm:justify-between items-center mt-4">
                    <div className="text-sm text-muted-foreground hidden sm:block">
                        Step {currentStep + 1} of {steps.length}
                    </div>
                    <Button onClick={handleNext} className="w-full sm:w-auto min-w-[120px]">
                        {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
