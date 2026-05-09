// File: src/features/onboarding/data/slides.ts

export interface OnboardingSlide {
    id: string;
    title: string;
    subtitle?: string;
    image: any;
}

export const ONBOARDING_SLIDES: OnboardingSlide[] = [
    {
        id: 'ai-coach',
        title: 'Your Personal AI Coach',
        subtitle: 'Real-time feedback, Rep counting and Form correction',
        image: require('../../../../assets/ai_coach.png'),
    },
    {
        id: 'train-smarter',
        title: 'Train Smarter',
        subtitle: 'Fatigue detection, Form quality score and Personalized workouts',
        image: require('../../../../assets/train-smarter.png'),
    },
    {
        id: 'privacy',
        title: 'Your Data, Your Control',
        subtitle: 'Local data processing, Camera is optional and No forced cloud',
        image: require('../../../../assets/privacy.png'),
    },
    {
        id: 'get-started',
        title: 'Ready to start your journey',
        subtitle: '',
        image: require('../../../../assets/get-started.png'),
    },
];