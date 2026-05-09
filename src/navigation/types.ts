import type { NativeStackScreenProps } from '@react-navigation/native-stack';

// Root Stack
export type RootStackParamList = {
    Auth: undefined;
    Onboarding: undefined;
    ProfileSetup: undefined;
    Main: undefined;
};

// Auth Stack
export type AuthStackParamList = {
    Login: undefined;
    Register: undefined;
    ForgotPassword: undefined;
    OTPVerification: { email: string };
    ResetPassword: { token: string };
    Success: undefined;
};

// Onboarding Stack
export type OnboardingStackParamList = {
    Splash: undefined;
    OnboardingSlides: undefined;
    Welcome: undefined;
    Intro: undefined;
};

// Profile Setup Stack
export type ProfileSetupStackParamList = {
    Gender: undefined;
    Age: undefined;
    Weight: undefined;
    Goals: undefined;
    FitnessLevel: undefined;
    Height: undefined;
    SetupComplete: undefined;
};

// Main Tab Stack
export type MainTabParamList = {
    Home: undefined;
    Workout: undefined;
    Progress: undefined;
    Profile: undefined;
};

// Screen Props helpers
export type RootStackScreenProps<T extends keyof RootStackParamList> =
    NativeStackScreenProps<RootStackParamList, T>;

export type AuthStackScreenProps<T extends keyof AuthStackParamList> =
    NativeStackScreenProps<AuthStackParamList, T>;

export type OnboardingStackScreenProps<T extends keyof OnboardingStackParamList> =
    NativeStackScreenProps<OnboardingStackParamList, T>;

export type ProfileSetupStackScreenProps<
    T extends keyof ProfileSetupStackParamList,
> = NativeStackScreenProps<ProfileSetupStackParamList, T>;
