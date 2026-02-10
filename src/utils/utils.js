export function fibonacci(n) {
    if (n < 0) return [];
    const res = [0, 1];
    for (let i = 2; i < n; i++) {
        res.push(res[i - 1] + res[i - 2]);
    }
    return res.slice(0, n);
}

export function primes(arr) {
    const isPrime = (n) => {
        if (n < 2) return false;
        for (let i = 2; i * i <= n; i++) {
            if (n % i === 0) return false;
        }
        return true;
    };
    return arr.filter(isPrime);
}

export function hcf(arr) {
    const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
    return arr.reduce((a, b) => gcd(a, b));
}

export function lcm(arr) {
    const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
    const lcm2 = (a, b) => {
        const result = (a * b) / gcd(a, b);
        if (result > Number.MAX_SAFE_INTEGER) {
            throw new Error("LCM result exceeds safe integer limit");
        }
        return result;
    };
    return arr.reduce((a, b) => lcm2(a, b));
}
