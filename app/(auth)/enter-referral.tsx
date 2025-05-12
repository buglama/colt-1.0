import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle,
  withSpring, 
  withSequence,
  withDelay
} from 'react-native-reanimated';
import { ArrowRight, Gift } from 'lucide-react-native';
import Text from '@/src/components/ui/Text';
import Button from '@/src/components/ui/Button';
import { colors } from '@/src/constants/theme';
import { useUser } from '@/src/context/UserContext';

export default function EnterReferralScreen() {
  const router = useRouter();
  const { updateReferralCode } = useUser();
  const [referralCode, setReferralCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const iconScale = useSharedValue(1);
  const rotation = useSharedValue(0);

  const animateIcon = () => {
    iconScale.value = withSequence(
      withSpring(1.3, { damping: 2 }),
      withDelay(300, withSpring(1))
    );
    
    rotation.value = withSequence(
      withSpring(-0.1),
      withSpring(0.1),
      withSpring(0)
    );
  };

  React.useEffect(() => {
    // Animate icon when component mounts
    animateIcon();
  }, []);

  const iconStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: iconScale.value },
        { rotate: `${rotation.value * 30}rad` }
      ]
    };
  });

  const handleSubmit = async () => {
    if (referralCode.trim()) {
      setLoading(true);
      setError(null);
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Update referral code
        await updateReferralCode(referralCode);
        
        // Navigate to main app
        router.replace('/(tabs)');
      } catch (err) {
        setError('Invalid referral code. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      skipReferral();
    }
  };

  const skipReferral = () => {
    router.replace('/(tabs)');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Animated.View style={[styles.iconContainer, iconStyle]}>
            <Gift size={40} color={colors.primary} />
          </Animated.View>
          
          <Text variant="h2" weight="bold" style={styles.title}>
            Enter Referral Code
          </Text>
          <Text variant="body" color="textSecondary" style={styles.subtitle}>
            Got a referral code? Enter it below to receive bonus cashback on your orders
          </Text>
        </View>
        
        <View style={styles.form}>
          {error && (
            <View style={styles.errorContainer}>
              <Text variant="body2" color="danger" style={styles.errorText}>
                {error}
              </Text>
            </View>
          )}
          
          <View style={styles.inputContainer}>
            <Text variant="body2" weight="medium" style={styles.label}>
              Referral Code (Optional)
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter referral code"
              autoCapitalize="characters"
              value={referralCode}
              onChangeText={setReferralCode}
            />
          </View>
          
          <Button
            title="Continue"
            onPress={handleSubmit}
            loading={loading}
            fullWidth
            style={styles.submitButton}
            rightIcon={<ArrowRight size={20} color="white" />}
          />
          
          <TouchableOpacity 
            onPress={skipReferral} 
            style={styles.skipButton}
            disabled={loading}
          >
            <Text variant="body2" color="textSecondary">
              Skip for now
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.benefitsContainer}>
          <Text variant="h4" weight="semibold" style={styles.benefitsTitle}>
            Referral Benefits
          </Text>
          
          <View style={styles.benefitItem}>
            <View style={styles.benefitIcon}>
              <Text variant="h4" weight="bold" color="primary">
                3%
              </Text>
            </View>
            <View style={styles.benefitContent}>
              <Text variant="body" weight="semibold">
                You get 3% cashback
              </Text>
              <Text variant="body2" color="textSecondary">
                On every order you place
              </Text>
            </View>
          </View>
          
          <View style={styles.benefitItem}>
            <View style={styles.benefitIcon}>
              <Text variant="h4" weight="bold" color="primary">
                2%
              </Text>
            </View>
            <View style={styles.benefitContent}>
              <Text variant="body" weight="semibold">
                Your referrer gets 2%
              </Text>
              <Text variant="body2" color="textSecondary">
                When you place an order
              </Text>
            </View>
          </View>
          
          <View style={styles.benefitItem}>
            <View style={styles.benefitIcon}>
              <Text variant="h4" weight="bold" color="primary">
                1%
              </Text>
            </View>
            <View style={styles.benefitContent}>
              <Text variant="body" weight="semibold">
                Indirect referrer gets 1%
              </Text>
              <Text variant="body2" color="textSecondary">
                Creating a 3-level referral chain
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    maxWidth: '90%',
  },
  form: {
    width: '100%',
  },
  errorContainer: {
    backgroundColor: colors.dangerLight,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    marginBottom: 8,
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderColor: colors.gray300,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    textTransform: 'uppercase',
  },
  submitButton: {
    height: 56,
  },
  skipButton: {
    alignSelf: 'center',
    padding: 16,
    marginTop: 8,
  },
  benefitsContainer: {
    marginTop: 40,
    padding: 20,
    backgroundColor: colors.gray100,
    borderRadius: 16,
  },
  benefitsTitle: {
    marginBottom: 16,
  },
  benefitItem: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
  },
  benefitIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  benefitContent: {
    flex: 1,
  },
});