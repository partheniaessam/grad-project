import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import {
    Animated,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PT } from '../components/ProgressTheme';

// ──────────────────────────────────────────────────────────────────
// TYPES
// ──────────────────────────────────────────────────────────────────
export type WorkoutType = 'full_body' | 'upper_body' | 'lower_body';

export interface WorkoutSummaryData {
    type: WorkoutType;
    duration: string;
    totalReps: number;
    setsCompleted: number;
    calories: number;
    repQuality: number;   // 0–100
    suggestions: string[];
    muscles: { name: string; activation: number }[];
}

const WORKOUT_DATA: Record<WorkoutType, WorkoutSummaryData> = {
    full_body: {
        type: 'full_body',
        duration: '48 min',
        totalReps: 186,
        setsCompleted: 16,
        calories: 420,
        repQuality: 88,
        suggestions: [
            'Slow down on deadlifts for better form.',
            'Add 5 kg to bench press next session.',
            'Rest 90 s between sets for max recovery.',
        ],
        muscles: [
            { name: 'Chest', activation: 82 },
            { name: 'Back', activation: 75 },
            { name: 'Legs', activation: 90 },
            { name: 'Shoulders', activation: 68 },
        ],
    },
    upper_body: {
        type: 'upper_body',
        duration: '35 min',
        totalReps: 124,
        setsCompleted: 12,
        calories: 290,
        repQuality: 85,
        suggestions: [
            'Focus on slow negatives for triceps.',
            'Superset biceps + triceps next time.',
            'Increase shoulder volume by 10%.',
        ],
        muscles: [
            { name: 'Chest', activation: 90 },
            { name: 'Shoulders', activation: 85 },
            { name: 'Triceps', activation: 78 },
            { name: 'Biceps', activation: 72 },
        ],
    },
    lower_body: {
        type: 'lower_body',
        duration: '40 min',
        totalReps: 148,
        setsCompleted: 14,
        calories: 380,
        repQuality: 92,
        suggestions: [
            'Add Bulgarian split squats next week.',
            'Hip mobility warm-up before squats.',
            'Great squat depth today – keep it up!',
        ],
        muscles: [
            { name: 'Quads', activation: 94 },
            { name: 'Glutes', activation: 88 },
            { name: 'Hamstrings', activation: 80 },
            { name: 'Calves', activation: 65 },
        ],
    },
};

// ──────────────────────────────────────────────────────────────────
// SESSION SUMMARY CARD
// ──────────────────────────────────────────────────────────────────
const SessionSummaryCard: React.FC<{ data: WorkoutSummaryData }> = ({ data }) => {
    const rows = [
        { icon: 'time-outline' as const, label: 'Duration', value: data.duration },
        { icon: 'repeat-outline' as const, label: 'Total Reps', value: String(data.totalReps) },
        { icon: 'layers-outline' as const, label: 'Sets Completed', value: String(data.setsCompleted) },
        { icon: 'flame-outline' as const, label: 'Calories Burned', value: `${data.calories} kcal` },
    ];

    return (
        <View style={ssStyles.card}>
            <Text style={ssStyles.cardTitle}>Session Summary</Text>
            {rows.map((row, i) => (
                <React.Fragment key={row.label}>
                    <View style={ssStyles.row}>
                        <View style={ssStyles.iconWrap}>
                            <Ionicons name={row.icon} size={18} color={PT.accent} />
                        </View>
                        <Text style={ssStyles.rowLabel}>{row.label}</Text>
                        <Text style={ssStyles.rowValue}>{row.value}</Text>
                    </View>
                    {i < rows.length - 1 && <View style={ssStyles.divider} />}
                </React.Fragment>
            ))}
        </View>
    );
};

const ssStyles = StyleSheet.create({
    card: {
        backgroundColor: PT.cardBg,
        borderRadius: PT.radius.lg,
        padding: PT.cardPadding,
        marginHorizontal: PT.spacing.lg,
        marginBottom: PT.spacing.md,
        shadowColor: PT.cardShadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 12,
        elevation: 5,
    },
    cardTitle: {
        fontSize: PT.font.label,
        fontWeight: '700',
        color: PT.textPrimary,
        marginBottom: PT.spacing.sm,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        columnGap: 12,
    },
    iconWrap: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: PT.accentDim,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rowLabel: {
        flex: 1,
        fontSize: PT.font.label,
        color: PT.textSecondary,
        fontWeight: '500',
    },
    rowValue: {
        fontSize: PT.font.label,
        fontWeight: '800',
        color: PT.textPrimary,
    },
    divider: {
        height: 1,
        backgroundColor: '#F0EBF7',
        marginLeft: 48,
    },
});

// ──────────────────────────────────────────────────────────────────
// PERFORMANCE CARD
// ──────────────────────────────────────────────────────────────────
const PerformanceCard: React.FC<{ data: WorkoutSummaryData }> = ({ data }) => {
    const barAnims = useRef(
        data.muscles.map(m => new Animated.Value(0))
    ).current;

    useEffect(() => {
        Animated.stagger(
            80,
            barAnims.map((a, i) =>
                Animated.timing(a, {
                    toValue: data.muscles[i].activation / 100,
                    duration: 600,
                    useNativeDriver: false,
                }),
            ),
        ).start();
    }, []);

    return (
        <View style={perfStyles.card}>
            <View style={perfStyles.header}>
                <Text style={perfStyles.cardTitle}>Your Performance</Text>
                <View style={perfStyles.qualityBadge}>
                    <Text style={perfStyles.qualityText}>{data.repQuality}%</Text>
                </View>
            </View>
            <Text style={perfStyles.sub}>Rep quality score</Text>

            <View style={{ marginTop: 16, rowGap: 12 }}>
                {data.muscles.map((m, i) => (
                    <View key={m.name}>
                        <View style={perfStyles.barLabelRow}>
                            <Text style={perfStyles.barLabel}>{m.name}</Text>
                            <Text style={perfStyles.barValue}>{m.activation}%</Text>
                        </View>
                        <View style={perfStyles.barTrack}>
                            <Animated.View
                                style={[
                                    perfStyles.barFill,
                                    {
                                        width: barAnims[i].interpolate({
                                            inputRange: [0, 1],
                                            outputRange: ['0%', '100%'],
                                        }),
                                        backgroundColor:
                                            m.activation >= 85
                                                ? PT.success
                                                : m.activation >= 70
                                                    ? PT.accent
                                                    : PT.warning,
                                    },
                                ]}
                            />
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
};

const perfStyles = StyleSheet.create({
    card: {
        backgroundColor: PT.cardBg,
        borderRadius: PT.radius.lg,
        padding: PT.cardPadding,
        marginHorizontal: PT.spacing.lg,
        marginBottom: PT.spacing.md,
        shadowColor: PT.cardShadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 12,
        elevation: 5,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: PT.font.label,
        fontWeight: '700',
        color: PT.textPrimary,
    },
    qualityBadge: {
        backgroundColor: PT.successDim,
        borderRadius: PT.radius.full,
        paddingHorizontal: 12,
        paddingVertical: 4,
    },
    qualityText: {
        fontSize: PT.font.label,
        fontWeight: '800',
        color: PT.success,
    },
    sub: {
        fontSize: PT.font.micro,
        color: PT.textMuted,
        marginTop: 3,
    },
    barLabelRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    barLabel: {
        fontSize: PT.font.label,
        color: PT.textSecondary,
        fontWeight: '500',
    },
    barValue: {
        fontSize: PT.font.label,
        color: PT.textPrimary,
        fontWeight: '700',
    },
    barTrack: {
        height: 8,
        backgroundColor: '#F0EBF7',
        borderRadius: PT.radius.full,
        overflow: 'hidden',
    },
    barFill: {
        height: '100%',
        borderRadius: PT.radius.full,
    },
});

// ──────────────────────────────────────────────────────────────────
// SUGGESTIONS CARD
// ──────────────────────────────────────────────────────────────────
const SuggestionsCard: React.FC<{ suggestions: string[] }> = ({ suggestions }) => (
    <View style={sugStyles.card}>
        <View style={sugStyles.header}>
            <Ionicons name="flash" size={18} color={PT.accent} />
            <Text style={sugStyles.title}>Coach Says</Text>
        </View>
        {suggestions.map((s, i) => (
            <View key={i} style={sugStyles.row}>
                <View style={sugStyles.bullet} />
                <Text style={sugStyles.text}>{s}</Text>
            </View>
        ))}
    </View>
);

const sugStyles = StyleSheet.create({
    card: {
        backgroundColor: PT.accentDim,
        borderRadius: PT.radius.lg,
        padding: PT.cardPadding,
        marginHorizontal: PT.spacing.lg,
        marginBottom: PT.spacing.md,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 8,
        marginBottom: PT.spacing.sm,
    },
    title: {
        fontSize: PT.font.label,
        fontWeight: '700',
        color: PT.accent,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        columnGap: 8,
        paddingVertical: 4,
    },
    bullet: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: PT.accent,
        marginTop: 6,
    },
    text: {
        flex: 1,
        fontSize: PT.font.label,
        color: PT.bgDark,
        fontWeight: '500',
        lineHeight: 20,
    },
});

// ──────────────────────────────────────────────────────────────────
// WORKOUT SUMMARY SCREEN
// ──────────────────────────────────────────────────────────────────
interface WorkoutSummaryScreenProps {
    workoutType: WorkoutType;
    onBackToProgress: () => void;
}

const WorkoutSummaryScreen: React.FC<WorkoutSummaryScreenProps> = ({
    workoutType,
    onBackToProgress,
}) => {
    const data = WORKOUT_DATA[workoutType];

    const scaleAnim = useRef(new Animated.Value(0.7)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, speed: 12, bounciness: 8 }),
            Animated.timing(fadeAnim, { toValue: 1, duration: 350, useNativeDriver: true }),
        ]).start();
    }, []);

    const typeLabels: Record<WorkoutType, string> = {
        full_body: 'Full Body',
        upper_body: 'Upper Body',
        lower_body: 'Lower Body',
    };

    return (
        <View style={wsStyles.root}>
            <StatusBar barStyle="light-content" backgroundColor={PT.bgPrimary} />
            <SafeAreaView style={wsStyles.safe} edges={['top']}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={wsStyles.scrollContent}
                >
                    {/* Celebration header */}
                    <Animated.View
                        style={[
                            wsStyles.heroWrap,
                            { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
                        ]}
                    >
                        <View style={wsStyles.heroCircle}>
                            <Ionicons name="checkmark-circle" size={56} color="#FFFFFF" />
                        </View>
                        <Text style={wsStyles.heroTitle}>Workout Complete!</Text>
                        <Text style={wsStyles.heroSub}>
                            Great job! You finished your {typeLabels[workoutType]} workout.
                        </Text>
                    </Animated.View>

                    {/* Cards */}
                    <Animated.View style={{ opacity: fadeAnim }}>
                        <SessionSummaryCard data={data} />
                        <PerformanceCard data={data} />
                        <SuggestionsCard suggestions={data.suggestions} />
                    </Animated.View>
                </ScrollView>

                {/* Sticky footer */}
                <View style={wsStyles.footer}>
                    <TouchableOpacity
                        style={wsStyles.backBtn}
                        onPress={onBackToProgress}
                        activeOpacity={0.85}
                        accessibilityRole="button"
                        accessibilityLabel="Back to Progress"
                    >
                        <Text style={wsStyles.backBtnText}>Back to Progress</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
};

const wsStyles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: PT.bgPrimary,
    },
    safe: { flex: 1 },
    scrollContent: {
        paddingBottom: 100,
        paddingTop: PT.spacing.lg,
    },

    heroWrap: {
        alignItems: 'center',
        paddingHorizontal: PT.spacing.lg,
        paddingBottom: PT.spacing.xl,
    },
    heroCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(255,255,255,0.20)',
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.38)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 18,
        shadowColor: '#FFFFFF',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.20,
        shadowRadius: 20,
        elevation: 0,
    },
    heroTitle: {
        fontSize: 26,
        fontWeight: '800',
        color: '#FFFFFF',
        marginBottom: 8,
        letterSpacing: 0.2,
    },
    heroSub: {
        fontSize: PT.font.subtitle,
        color: PT.textWhiteSoft,
        textAlign: 'center',
        lineHeight: 20,
        paddingHorizontal: 16,
    },

    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: PT.spacing.lg,
        paddingVertical: PT.spacing.md,
        backgroundColor: PT.bgPrimary,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.18)',
    },
    backBtn: {
        height: PT.buttonHeight,
        backgroundColor: '#FFFFFF',
        borderRadius: PT.radius.xl,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: PT.cardShadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.30,
        shadowRadius: 10,
        elevation: 5,
    },
    backBtnText: {
        fontSize: 16,
        fontWeight: '700',
        color: PT.accent,
        letterSpacing: 0.3,
    },
});

export { WorkoutSummaryScreen };
export default WorkoutSummaryScreen;
