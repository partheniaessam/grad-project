// src/navigation/WorkoutStackNavigator.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import CustomWorkoutScreen from '../features/workout/screens/CustomWorkoutScreen';
import ExerciseDetailsScreen from '../features/workout/screens/ExerciseDetailsScreen';
import FullBodyWorkoutScreen from '../features/workout/screens/FullBodyWorkoutScreen';
import LowerWorkoutScreen from '../features/workout/screens/LowerWorkoutScreen';
import TrackingScreen from '../features/workout/screens/TrackingScreen';
import UpperWorkoutScreen from '../features/workout/screens/UpperWorkoutScreen';
import WorkoutCompleteScreen from '../features/workout/screens/WorkoutCompleteScreen';
import WorkoutSelectionScreen from '../features/workout/screens/WorkoutSelectionScreen';
import type { WorkoutStackParamList } from './types';

const Stack = createNativeStackNavigator<WorkoutStackParamList>();

const WorkoutStackNavigator = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="WorkoutSelection" component={WorkoutSelectionScreen} />
        <Stack.Screen name="FullBodyWorkout" component={FullBodyWorkoutScreen} />
        <Stack.Screen name="UpperWorkout" component={UpperWorkoutScreen} />
        <Stack.Screen name="LowerWorkout" component={LowerWorkoutScreen} />
        <Stack.Screen name="CustomWorkout" component={CustomWorkoutScreen} />
        <Stack.Screen name="ExerciseDetails" component={ExerciseDetailsScreen} />
        <Stack.Screen name="Tracking" component={TrackingScreen} />
        <Stack.Screen name="WorkoutComplete" component={WorkoutCompleteScreen} />
    </Stack.Navigator>
);

export default WorkoutStackNavigator;
