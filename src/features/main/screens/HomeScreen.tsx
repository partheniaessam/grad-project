import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppText from '../../../components/AppText';
import { Colors, Spacing, BorderRadius } from '../../../theme';
import type { MainTabParamList } from '../../../navigation/types';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

type Props = BottomTabScreenProps<MainTabParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.safe}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.header}>
                    <AppText variant="h1">Hello, John</AppText>
                    <AppText variant="body" color={Colors.textSecondary}>Ready for your workout today?</AppText>
                </View>

                <View style={styles.dailyGoal}>
                    <AppText variant="h3">Daily Goal</AppText>
                    <AppText variant="bodySmall">75% completed</AppText>
                    <View style={styles.progressBar}>
                        <View style={[styles.progress, { width: '75%' }]} />
                    </View>
                </View>

                <View style={styles.section}>
                    <AppText variant="h3" style={styles.sectionTitle}>Featured Workouts</AppText>
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => navigation.navigate('Workout')}
                    >
                        <View style={styles.cardContent}>
                            <AppText variant="h3">Full Body Burn</AppText>
                            <AppText variant="caption">45 mins • Intermediate</AppText>
                        </View>
                        <AppText variant="display">🔥</AppText>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    content: {
        padding: Spacing.lg,
    },
    header: {
        marginVertical: Spacing.xl,
    },
    dailyGoal: {
        backgroundColor: Colors.surface,
        padding: Spacing.xl,
        borderRadius: BorderRadius.lg,
        marginBottom: Spacing.xl,
    },
    progressBar: {
        height: 8,
        backgroundColor: Colors.surfaceLight,
        borderRadius: 4,
        marginTop: Spacing.md,
        overflow: 'hidden',
    },
    progress: {
        height: '100%',
        backgroundColor: Colors.primary,
    },
    section: {
        flex: 1,
    },
    sectionTitle: {
        marginBottom: Spacing.md,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.surface,
        padding: Spacing.xl,
        borderRadius: BorderRadius.lg,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    cardContent: {
        flex: 1,
    },
});

export default HomeScreen;
