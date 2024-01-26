export const fibo = (index) => {
    if(index < 2) return 1
    return fib(index - 1) + fib(index - 2);
} 
