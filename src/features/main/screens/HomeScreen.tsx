// src/features/main/screens/HomeScreen.tsx
import { Ionicons } from '@expo/vector-icons';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
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
import type { MainTabParamList } from '../../../navigation/types';
import { WT } from '../../../theme/workoutTheme';
import { RECENT_ACTIVITY, TODAYS_WORKOUT } from '../../home/data/homeData';

type Props = BottomTabScreenProps<MainTabParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <View style={styles.root}>
            <StatusBar barStyle="light-content" backgroundColor={WT.colors.header} />

            {/* SECTION 1 — HEADER */}
            <View style={styles.header}>
                <SafeAreaView edges={['top']}>
                    <View style={styles.headerInner}>
                        <View style={styles.headerLeft}>
                            <Text style={styles.welcome}>Welcome, Alex 👋</Text>
                            <Text style={styles.welcomeSub}>Ready for your workout today?</Text>
                        </View>
                        <View style={styles.avatarCircle}>
                            <Ionicons name="person" size={20} color={WT.colors.textLight} />
                        </View>
                    </View>
                </SafeAreaView>
            </View>

            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <Animated.View style={{ opacity: fadeAnim }}>

                    {/* SECTION 2 — TODAY WORKOUT CARD */}
                    <View style={styles.card}>
                        <View style={styles.cardHeaderRow}>
                            <View style={styles.cardHeaderBadge}>
                                <Text style={styles.cardHeaderBadgeText}>TODAY</Text>
                            </View>
                            <Text style={styles.cardHeaderRight}>⚡ Moderate</Text>
                        </View>
                        <Text style={styles.todayTitle}>{TODAYS_WORKOUT.title}</Text>
                        <Text style={styles.todaySub}>
                            {TODAYS_WORKOUT.duration} min · {TODAYS_WORKOUT.calories} kcal ·{' '}
                            {TODAYS_WORKOUT.muscleGroups.join(', ')}
                        </Text>
                        <TouchableOpacity
                            style={styles.startBtn}
                            onPress={() => navigation.navigate('Workout')}
                            activeOpacity={0.85}
                        >
                            <Text style={styles.startBtnText}>Start Workout  →</Text>
                        </TouchableOpacity>
                    </View>

                    {/* SECTION 3 — LAST SESSION SUMMARY */}
                    <View style={styles.card}>
                        <Text style={styles.sectionTitle}>Last Session</Text>
                        <View style={styles.sessionRow}>
                            {[
                                { label: 'Duration', value: '55 min', icon: 'time-outline' as const },
                                { label: 'Exercises', value: '8', icon: 'repeat-outline' as const },
                                { label: 'Form Score', value: '91%', icon: 'star-outline' as const },
                            ].map(item => (
                                <View key={item.label} style={styles.sessionItem}>
                                    <View style={styles.sessionIconCircle}>
                                        <Ionicons name={item.icon} size={16} color={WT.colors.primary} />
                                    </View>
                                    <Text style={styles.sessionValue}>{item.value}</Text>
                                    <Text style={styles.sessionLabel}>{item.label}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* SECTION 4 — STREAK CARD */}
                    <View style={styles.streakCard}>
                        <View style={styles.streakLeft}>
                            <Text style={styles.streakEmoji}>🔥</Text>
                        </View>
                        <View style={styles.streakRight}>
                            <Text style={styles.streakTitle}>7 Day Streak!</Text>
                            <Text style={styles.streakSub}>Keep it up! You're on fire!</Text>
                        </View>
                        <View style={styles.streakBadge}>
                            <Text style={styles.streakBadgeText}>🏆</Text>
                        </View>
                    </View>

                    {/* SECTION 5 — QUICK STATUS */}
                    <View style={styles.card}>
                        <Text style={styles.sectionTitle}>This Week</Text>
                        <View style={styles.statusGrid}>
                            <View style={styles.statusItem}>
                                <Text style={styles.statusValue}>4</Text>
                                <Text style={styles.statusLabel}>Workouts</Text>
                            </View>
                            <View style={styles.statusDivider} />
                            <View style={styles.statusItem}>
                                <Text style={styles.statusValue}>87%</Text>
                                <Text style={styles.statusLabel}>Avg Form</Text>
                            </View>
                            <View style={styles.statusDivider} />
                            <View style={styles.statusItem}>
                                <Text style={[styles.statusValue, { color: WT.colors.success }]}>Low</Text>
                                <Text style={styles.statusLabel}>Fatigue</Text>
                            </View>
                        </View>
                    </View>

                    {/* Recent activity */}
                    <Text style={styles.recentTitle}>Recent Activity</Text>
                    {RECENT_ACTIVITY.map(activity => (
                        <View key={activity.id} style={styles.activityCard}>
                            <View style={styles.activityIcon}>
                                <Text style={styles.activityEmoji}>{activity.icon}</Text>
                            </View>
                            <View style={styles.activityInfo}>
                                <Text style={styles.activityName}>{activity.title}</Text>
                                <Text style={styles.activitySub}>
                                    {activity.date} · {activity.duration} min · {activity.calories} kcal
                                </Text>
                            </View>
                            <Ionicons name="chevron-forward" size={18} color={WT.colors.textMuted} />
                        </View>
                    ))}

                </Animated.View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: WT.colors.background },

    // Header
    header: {
        backgroundColor: WT.colors.header,
        paddingHorizontal: WT.spacing.lg,
        paddingBottom: WT.spacing.lg,
        borderBottomLeftRadius: WT.radius.lg,
        borderBottomRightRadius: WT.radius.lg,
        shadowColor: '#4A2878',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 8,
    },
    headerInner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: WT.spacing.md,
    },
    headerLeft: { flex: 1, marginRight: WT.spacing.md },
    welcome: { fontSize: 22, fontWeight: '800', color: '#FFFFFF', marginBottom: 4 },
    welcomeSub: { fontSize: 14, color: 'rgba(255,255,255,0.78)', fontWeight: '500' },
    avatarCircle: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: 'rgba(255,255,255,0.18)',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },

    content: { padding: WT.spacing.lg, paddingTop: WT.spacing.xl, paddingBottom: 24 },

    // Generic card
    card: {
        backgroundColor: WT.colors.card,
        borderRadius: WT.radius.md,
        borderWidth: 1,
        borderColor: WT.colors.cardBorder,
        padding: WT.spacing.lg,
        marginBottom: WT.spacing.md,
        shadowColor: '#6B3FA0',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 4,
    },
    sectionTitle: { fontSize: 14, fontWeight: '800', color: WT.colors.textDark, marginBottom: WT.spacing.md },

    // Today workout card
    cardHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: WT.spacing.sm },
    cardHeaderBadge: {
        backgroundColor: WT.colors.primary,
        borderRadius: 999,
        paddingHorizontal: 10,
        paddingVertical: 3,
    },
    cardHeaderBadgeText: { fontSize: 11, fontWeight: '700', color: '#FFFFFF', letterSpacing: 0.5 },
    cardHeaderRight: { fontSize: 12, color: WT.colors.textMuted, fontWeight: '500' },
    todayTitle: { fontSize: 20, fontWeight: '800', color: WT.colors.textDark, marginBottom: 4 },
    todaySub: { fontSize: 13, color: WT.colors.textMuted, marginBottom: WT.spacing.md, lineHeight: 18 },
    startBtn: {
        backgroundColor: WT.colors.primary,
        borderRadius: WT.radius.xl,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#4A2878',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 6,
    },
    startBtnText: { fontSize: 15, fontWeight: '800', color: '#FFFFFF' },

    // Last session
    sessionRow: { flexDirection: 'row', justifyContent: 'space-around' },
    sessionItem: { alignItems: 'center', gap: 4 },
    sessionIconCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(140,92,196,0.12)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 4,
    },
    sessionValue: { fontSize: 17, fontWeight: '800', color: WT.colors.textDark },
    sessionLabel: { fontSize: 11, color: WT.colors.textMuted },

    // Streak card
    streakCard: {
        backgroundColor: WT.colors.primary,
        borderRadius: WT.radius.md,
        padding: WT.spacing.lg,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: WT.spacing.md,
        shadowColor: '#4A2878',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
        elevation: 6,
    },
    streakLeft: {
        width: 48, height: 48, borderRadius: 24,
        backgroundColor: 'rgba(255,255,255,0.18)',
        alignItems: 'center', justifyContent: 'center',
        marginRight: WT.spacing.md,
        flexShrink: 0,
    },
    streakEmoji: { fontSize: 24 },
    streakRight: { flex: 1 },
    streakTitle: { fontSize: 18, fontWeight: '800', color: '#FFFFFF', marginBottom: 2 },
    streakSub: { fontSize: 13, color: 'rgba(255,255,255,0.80)', fontWeight: '500' },
    streakBadge: {
        width: 40, height: 40, borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.15)',
        alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
    },
    streakBadgeText: { fontSize: 20 },

    // Quick status
    statusGrid: { flexDirection: 'row', alignItems: 'center' },
    statusItem: { flex: 1, alignItems: 'center', gap: 4 },
    statusDivider: { width: 1, height: 40, backgroundColor: WT.colors.cardBorder },
    statusValue: { fontSize: 20, fontWeight: '800', color: WT.colors.primary },
    statusLabel: { fontSize: 11, color: WT.colors.textMuted },

    // Recent activity
    recentTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: WT.colors.textLight,
        marginBottom: WT.spacing.md,
    },
    activityCard: {
        backgroundColor: WT.colors.card,
        borderRadius: WT.radius.md,
        borderWidth: 1,
        borderColor: WT.colors.cardBorder,
        padding: WT.spacing.md,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: WT.spacing.sm,
        shadowColor: '#6B3FA0',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 2,
    },
    activityIcon: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: 'rgba(140,92,196,0.12)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: WT.spacing.md,
        flexShrink: 0,
    },
    activityEmoji: { fontSize: 20 },
    activityInfo: { flex: 1 },
    activityName: { fontSize: 15, fontWeight: '700', color: WT.colors.textDark, marginBottom: 2 },
    activitySub: { fontSize: 12, color: WT.colors.textMuted },
});

export default HomeScreen;
