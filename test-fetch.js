const fetch = globalThis.fetch;

async function testFetch() {
    try {
        const res = await fetch('https://api.expo.dev/v2/versions/latest');
        console.log('Status:', res.status);
    } catch (err) {
        console.error('Fetch Error:', err);
        if (err.cause) {
            console.error('Cause:', err.cause);
        }
    }
}

testFetch();
