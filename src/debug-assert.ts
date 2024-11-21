type Mode = 'fail-fast' | 'fail-safe' | 'ignore';
type AssertFunction = (condition: boolean, msg: string) => asserts condition;

let failFast = (error: Error): void => {
	console.error(error);
	process.abort();
};

const noop = () => noop;

function assertFailFast(condition: boolean, msg: string): asserts condition {
	if (condition) {
		return;
	}

	const error = Error(`Assertion failed: ${ msg }`);

	failFast(error);
}

function assertFailSafe(condition: boolean, msg: string): asserts condition {
	if (condition) {
		return;
	}

	const error = Error(`Assertion failed: ${ msg }`);

	throw error;
}

export function setupMode(mode: Mode): void {
	if (mode === 'fail-fast') {
		assert = assertFailFast;
		return;
	}

	if (mode === 'fail-safe') {
		assert = assertFailSafe;
		return;
	}

	assert = noop;
}

export function setupFailFast(func: (error: Error) => void): void {
	failFast = func;
}

export let assert: AssertFunction = assertFailFast;

export function assertNotNull<T>(value: T | null): asserts value is T {
	assert(value !== null, 'Value is null!');
}

