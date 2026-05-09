import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppText from '../../../components/AppText';
import AppButton from '../../../components/AppButton';
import { Colors, Spacing, BorderRadius } from '../../../theme';
import type { MainTabParamList } from '../../../navigation/types';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

type Props = BottomTabScreenProps<MainTabParamList, 'Profile'>;

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.safe}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.header}>
                    <View style={styles.avatarPlaceholder}>
                        <AppText variant="display">👤</AppText>
                    </View>
                    <AppText variant="h2" style={styles.name}>John Doe</AppText>
                    <AppText variant="body" color={Colors.textSecondary}>Elite Member since 2026</AppText>
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statBox}>
                        <AppText variant="h3">72</AppText>
                        <AppText variant="caption">Weight (kg)</AppText>
                    </View>
                    <View style={styles.statBox}>
                        <AppText variant="h3">182</AppText>
                        <AppText variant="caption">Height (cm)</AppText>
                    </View>
                    <View style={styles.statBox}>
                        <AppText variant="h3">24</AppText>
                        <AppText variant="caption">Workouts</AppText>
                    </View>
                </View>

                <View style={styles.menu}>
                    <TouchableOpacity style={styles.menuItem}>
                        <AppText variant="body">Personal Information</AppText>
                        <AppText variant="body" color={Colors.textSecondary}>›</AppText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem}>
                        <AppText variant="body">My Goals</AppText>
                        <AppText variant="body" color={Colors.textSecondary}>›</AppText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem}>
                        <AppText variant="body">Settings</AppText>
                        <AppText variant="body" color={Colors.textSecondary}>›</AppText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem}>
                        <AppText variant="body">Privacy Policy</AppText>
                        <AppText variant="body" color={Colors.textSecondary}>›</AppText>
                    </TouchableOpacity>
                </View>

                <AppButton
                    title="Logout"
                    variant="ghost"
                    onPress={() => (navigation.getParent() as any)?.replace('Auth')}
                    style={styles.logoutBtn}
                />
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
        alignItems: 'center',
        marginVertical: Spacing.xl,
    },
    avatarPlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: Colors.surface,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Spacing.md,
        borderWidth: 2,
        borderColor: Colors.primary,
    },
    name: {
        marginBottom: 4,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.lg,
        padding: Spacing.lg,
        marginVertical: Spacing.xl,
    },
    statBox: {
        alignItems: 'center',
    },
    menu: {
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.lg,
        padding: Spacing.sm,
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: Spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    logoutBtn: {
        marginTop: Spacing.xxl,
        marginBottom: Spacing.xl,
    },
});

export default ProfileScreen;
