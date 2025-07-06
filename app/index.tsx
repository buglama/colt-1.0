import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';

export default function IndexRedirect() {
    const router = useRouter();
    const redirected = useRef(false);

    useEffect(() => {
        if (!redirected.current) {
            redirected.current = true;
            router.replace('/onboarding');
        }
    }, []);

    return null;
}
