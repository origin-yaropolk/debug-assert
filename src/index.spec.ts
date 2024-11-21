import { beforeEach, describe, expect, it } from '@jest/globals';

import { assert, assertNotNull, setupFailFast, setupMode } from './index';

const RANDOM_VARIABLE_TO_FAIL_ASSERTION = 'RANDOM_VARIABLE_TO_FAIL_ASSERTION';

describe('Main tests', () => {
	const falseCondition = Boolean(process.env[RANDOM_VARIABLE_TO_FAIL_ASSERTION]);

	beforeEach(() => {
		setupMode('fail-fast');
	});

	it('Should fail-fast by default', () => {
		let expectError: Error | null = null;

		setupFailFast((err: Error) => {
			expectError = err;
		});

		assert(falseCondition, 'Test error message');

		expect(expectError).not.toBeNull();
		expect(expectError).toEqual(new Error('Assertion failed: Test error message'));
	});

	it('Should throw when "fail-safe" mode', () => {
		setupMode('fail-safe');

		expect(() => assert(falseCondition, 'Test error message')).toThrowError('Test error message');
	});

	it('Should do nothing when "ignore" mode', () => {
		let expectError: Error | null = null;

		setupFailFast((err: Error) => {
			expectError = err;
		});

		setupMode('ignore');

		expect(() => assert(falseCondition, 'Test error message')).not.toThrowError('Test error message');
		expect(expectError).toBeNull();
	});

	it('Should assert for non null', () => {
		let mayBeNull: number | undefined | null = 0;
		let expectError: Error | null = null;

		setupFailFast((err: Error) => {
			expectError = err;
		});

		assertNotNull(mayBeNull);

		expect(expectError).toBeNull();

		mayBeNull = undefined;

		assertNotNull(mayBeNull);

		expect(expectError).toBeNull();

		mayBeNull = null;

		assertNotNull(mayBeNull);

		expect(expectError).not.toBeNull();
	});
});

