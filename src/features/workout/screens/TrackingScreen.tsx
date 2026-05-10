// src/features/workout/screens/TrackingScreen.tsx
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CameraView, useCameraPermissions } from 'expo-camera';
import React, { useEffect, useRef, useState } from 'react';
import {
    Alert,
    Animated,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { WorkoutStackParamList } from '../../../navigation/types';
import { WT } from '../../../theme/workoutTheme';
import PrimaryWorkoutButton from '../components/PrimaryWorkoutButton';

type Props = NativeStackScreenProps<WorkoutStackParamList, 'Tracking'>;

const TrackingScreen: React.FC<Props> = ({ route, navigation }) => {
    const { exercise } = route.params;
    const [isPaused, setIsPaused] = useState(false);
    const [reps, setReps] = useState(0);
    const [cameraEnabled, setCameraEnabled] = useState(false);
    const [fatigue, setFatigue] = useState('Low 🟢');
    const [motivation, setMotivation] = useState('Keep Going! 💪');
    const [permission, requestPermission] = useCameraPermissions();
    const pulseAnim = useRef(new Animated.Value(1)).current;

    const motionLoop = useRef<Animated.CompositeAnimation | null>(null);

    useEffect(() => {
        startPulse();
        return () => motionLoop.current?.stop();
    }, []);

    const startPulse = () => {
        motionLoop.current = Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, { toValue: 1.06, duration: 700, useNativeDriver: true }),
                Animated.timing(pulseAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
            ]),
        );
        motionLoop.current.start();
    };

    const togglePause = () => {
        setIsPaused(prev => {
            if (!prev) {
                motionLoop.current?.stop();
            } else {
                startPulse();
            }
            return !prev;
        });
    };

    const incrementRep = () => {
        if (!isPaused) setReps(r => r + 1);
    };

    const endWorkout = () => {
        navigation.navigate('WorkoutComplete', { workoutType: exercise.targetMuscles });
    };

    const toggleCamera = async () => {
        if (!cameraEnabled) {
            if (!permission?.granted) {
                const response = await requestPermission();
                if (!response.granted) {
                    Alert.alert('Permission Required', 'Camera permission is needed for live tracking.');
                    return;
                }
            }
        }
        setCameraEnabled(prev => !prev);
    };

    const motivationPhrases = [
        'Keep Going! 💪',
        "You're Crushing It! 🔥",
        'Almost There! ⚡',
        'Beast Mode ON! 🦁',
    ];

    const fatigueLevels = ['Low 🟢', 'Medium 🟡', 'High 🔴'];

    // Mock realtime tracking updates
    useEffect(() => {
        if (!cameraEnabled || isPaused) return;

        const interval = setInterval(() => {
            setReps(prev => prev + 1);
            setFatigue(fatigueLevels[Math.floor(Math.random() * fatigueLevels.length)]);
            setMotivation(motivationPhrases[Math.floor(Math.random() * motivationPhrases.length)]);
        }, 2000);

        return () => clearInterval(interval);
    }, [cameraEnabled, isPaused]);

    const motivationalTexts = [
        'Keep Going! 💪',
        "You're Crushing It! 🔥",
        'Almost There! ⚡',
        'Beast Mode ON! 🦁',
    ];
    const phrase = motivationalTexts[reps % motivationalTexts.length];

    if (!permission) {
        return (
            <View style={[styles.root, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ color: '#FFF' }}>Loading permissions...</Text>
            </View>
        );
    }

    return (
        <View style={styles.root}>
            <StatusBar barStyle="light-content" backgroundColor="#1A0E2A" />
            <SafeAreaView edges={['top']} style={styles.safe}>
                <ScrollView
                    contentContainerStyle={styles.content}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Camera view or placeholder */}
                    <View style={styles.cameraBox}>
                        {cameraEnabled && permission.granted ? (
                            <View style={styles.cameraInnerContainer}>
                                <CameraView
                                    key="camera-view-stable"
                                    style={StyleSheet.absoluteFill}
                                    facing="front"
                                    onCameraReady={() => console.log('Camera Ready Output')}
                                    onMountError={(error) => console.log('Camera Mount Error:', error)}
                                />
                                <View style={styles.metricsOverlay} pointerEvents="none">
                                    <View style={styles.overlayCard}>
                                        <Text style={styles.overlayLabel}>Reps</Text>
                                        <Text style={styles.overlayValue}>{reps}</Text>
                                    </View>
                                    <View style={styles.overlayCard}>
                                        <Text style={styles.overlayLabel}>Tempo</Text>
                                        <Text style={styles.overlayValue}>Balanced</Text>
                                    </View>
                                    <View style={styles.overlayCard}>
                                        <Text style={styles.overlayLabel}>Fatigue</Text>
                                        <Text style={styles.overlayValue}>{fatigue}</Text>
                                    </View>
                                    <View style={styles.overlayCard}>
                                        <Text style={styles.overlayLabel}>Status</Text>
                                        <Text style={styles.overlayValue}>{motivation}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity
                                    style={styles.floatingCameraButton}
                                    onPress={toggleCamera}
                                    activeOpacity={0.8}
                                >
                                    <Ionicons name="camera-reverse" size={16} color="white" />
                                    <Text style={styles.floatingButtonText}>Turn Off Camera</Text>
                                </TouchableOpacity>
                            </View>
                        ) : cameraEnabled && !permission.granted ? (
                            <View style={styles.errorContainer}>
                                <Ionicons name="alert-circle" size={40} color={WT.colors.danger} />
                                <Text style={styles.errorText}>Camera access denied or unavailable</Text>
                                <TouchableOpacity style={styles.inlineEnableBtn} onPress={toggleCamera}>
                                    <Text style={styles.inlineEnableText}>Try Again</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View style={styles.placeholderInner}>
                                <Animated.View style={[styles.cameraInner, { transform: [{ scale: pulseAnim }] }]}>
                                    <Ionicons
                                        name="body-outline"
                                        size={56}
                                        color={isPaused ? '#888' : 'rgba(255,255,255,0.7)'}
                                    />
                                </Animated.View>
                                <Text style={styles.cameraTitle}>
                                    {isPaused ? 'Paused' : 'Tracking Without Camera'}
                                </Text>
                                <Text style={styles.cameraSub}>Using motion sensors</Text>
                                <View style={styles.sensorBadge}>
                                    <View style={[styles.sensorDot, { backgroundColor: isPaused ? '#E56B6B' : '#69C36D' }]} />
                                    <Text style={styles.sensorText}>{isPaused ? 'Paused' : 'Sensor Active'}</Text>
                                </View>
                                <TouchableOpacity style={styles.inlineEnableBtn} onPress={toggleCamera}>
                                    <Text style={styles.inlineEnableText}>Enable Camera</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>

                    {/* Exercise label */}
                    <Text style={styles.exLabel}>{exercise.name}</Text>

                    {/* Stats card */}
                    <TouchableOpacity onPress={incrementRep} style={styles.statsCard} activeOpacity={0.85}>
                        <View style={styles.repSection}>
                            <Text style={styles.repCount}>{reps}</Text>
                            <Text style={styles.repHint}>{isPaused ? 'Reps Count' : 'Tap to count rep'}</Text>
                        </View>
                        <View style={styles.statsRight}>
                            <Text style={styles.motivation}>{phrase}</Text>
                        </View>
                    </TouchableOpacity>

                    {/* Metrics */}
                    <View style={styles.metricsCard}>
                        <Text style={styles.metricsTitle}>Metrics</Text>
                        {[
                            { label: 'Tempo', value: isPaused ? '—' : 'Good ✓', color: WT.colors.success },
                            { label: 'Fatigue Level', value: reps < 5 ? 'Low 🟢' : reps < 12 ? 'Medium 🟡' : 'High 🔴', color: WT.colors.warning },
                            { label: 'Voice Feedback', value: 'On 🔊', color: WT.colors.primary },
                        ].map(metric => (
                            <View key={metric.label} style={styles.metricRow}>
                                <Text style={styles.metricLabel}>{metric.label}</Text>
                                <Text style={[styles.metricValue, { color: metric.color }]}>{metric.value}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Buttons */}
                    <View style={styles.btnRow}>
                        <TouchableOpacity
                            onPress={togglePause}
                            style={[styles.pauseBtn, isPaused && styles.resumeBtn]}
                            activeOpacity={0.85}
                        >
                            <Ionicons
                                name={isPaused ? 'play' : 'pause'}
                                size={20}
                                color={WT.colors.textLight}
                            />
                            <Text style={styles.pauseLabel}>{isPaused ? 'Resume' : 'Pause'}</Text>
                        </TouchableOpacity>

                        <PrimaryWorkoutButton
                            label="End Workout"
                            variant="white"
                            style={styles.endBtn}
                            onPress={endWorkout}
                        />
                    </View>

                    <PrimaryWorkoutButton
                        label={cameraEnabled ? "Disable Camera" : "Enable Camera"}
                        variant="purple"
                        style={{ marginTop: WT.spacing.md }}
                        onPress={toggleCamera}
                        icon={<Ionicons name={cameraEnabled ? "camera-outline" : "camera"} size={22} color="white" />}
                    />
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: '#1A0E2A' },
    safe: { flex: 1 },
    content: { padding: WT.spacing.lg, paddingBottom: 40 },

    cameraBox: {
        backgroundColor: 'rgba(255,255,255,0.06)',
        borderRadius: WT.radius.md,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.14)',
        height: 320, // Unified height
        width: '100%',
        overflow: 'hidden',
        marginBottom: WT.spacing.lg,
    },
    placeholderInner: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
    },
    cameraInnerContainer: {
        flex: 1,
        backgroundColor: '#000',
    },
    cameraContainer: {
        width: '100%',
        height: 320,
        borderRadius: 24,
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#000',
        marginBottom: WT.spacing.lg,
    },
    cameraInner: { marginBottom: 4 },
    cameraTitle: { fontSize: 14, fontWeight: '700', color: 'rgba(255,255,255,0.80)' },
    cameraSub: { fontSize: 12, color: 'rgba(255,255,255,0.55)' },
    sensorBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginTop: 4,
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderRadius: 999,
        paddingHorizontal: 12,
        paddingVertical: 4,
    },
    sensorDot: { width: 7, height: 7, borderRadius: 4 },
    sensorText: { fontSize: 12, color: 'rgba(255,255,255,0.80)' },

    exLabel: {
        fontSize: 18,
        fontWeight: '800',
        color: WT.colors.textLight,
        marginBottom: WT.spacing.md,
        textAlign: 'center',
    },

    statsCard: {
        backgroundColor: WT.colors.card,
        borderRadius: WT.radius.md,
        borderWidth: 1,
        borderColor: WT.colors.cardBorder,
        padding: WT.spacing.lg,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: WT.spacing.md,
        shadowColor: '#6B3FA0',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
        elevation: 5,
    },
    repSection: { flex: 1, alignItems: 'center', gap: 4 },
    repCount: { fontSize: 72, fontWeight: '900', color: WT.colors.primary, lineHeight: 76 },
    repHint: { fontSize: 12, color: WT.colors.textMuted },
    statsRight: { flex: 1, alignItems: 'center' },
    motivation: { fontWeight: '800', fontSize: 16, color: WT.colors.primary, textAlign: 'center', lineHeight: 24 },

    metricsCard: {
        backgroundColor: WT.colors.card,
        borderRadius: WT.radius.md,
        borderWidth: 1,
        borderColor: WT.colors.cardBorder,
        padding: WT.spacing.lg,
        marginBottom: WT.spacing.lg,
        shadowColor: '#6B3FA0',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 4,
    },
    metricsTitle: { fontSize: 14, fontWeight: '700', color: WT.colors.textDark, marginBottom: WT.spacing.sm },
    metricRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: WT.colors.cardBorder,
    },
    metricLabel: { fontSize: 14, color: WT.colors.textMuted },
    metricValue: { fontSize: 14, fontWeight: '700' },

    btnRow: { flexDirection: 'row', gap: WT.spacing.md, alignItems: 'center' },
    pauseBtn: {
        flex: 1,
        height: 54,
        borderRadius: WT.radius.xl,
        backgroundColor: 'rgba(255,255,255,0.15)',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.25)',
    },
    resumeBtn: {
        backgroundColor: WT.colors.success + 'BB',
        borderColor: WT.colors.success,
    },
    pauseLabel: { fontSize: 14, fontWeight: '700', color: WT.colors.textLight },
    endBtn: { flex: 1 },

    // New Camera Styles
    cameraContainer: {
        width: '100%',
        height: 320,
        borderRadius: 24,
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#000',
        marginBottom: WT.spacing.lg,
    },
    camera: {
        flex: 1,
    },
    metricsOverlay: {
        position: 'absolute',
        top: 16,
        left: 16,
        width: 140,
    },
    overlayCard: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 12,
        marginBottom: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    overlayLabel: {
        fontSize: 10,
        color: 'rgba(255,255,255,0.7)',
        fontWeight: '600',
    },
    overlayValue: {
        fontSize: 10,
        color: '#FFF',
        fontWeight: '800',
    },
    floatingCameraButton: {
        position: 'absolute',
        bottom: 16,
        right: 16,
        backgroundColor: 'rgba(140, 92, 196, 0.8)',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    floatingButtonText: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: '700',
    },
    inlineEnableBtn: {
        marginTop: 10,
        backgroundColor: 'rgba(255,255,255,0.1)',
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    inlineEnableText: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: '600',
    },
    errorContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        gap: 12,
    },
    errorText: {
        color: '#FFF',
        fontSize: 14,
        textAlign: 'center',
        fontWeight: '600',
    },
});

export default TrackingScreen;
