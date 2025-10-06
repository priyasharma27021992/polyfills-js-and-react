import './object-entries';
import {describe, it, expect} from "vitest";

describe('myEntries polyfil', () => {
	it('should return key-value pairs', () => {
		const obj = { a: 1, b: 2 };
		expect(Object.myEntries(obj)).toEqual([
			['a', 1],
			['b', 2],
		]);
	});

	it('should throw error for null', () => {
		expect(() => Object.myEntries(null as any)).toThrow();
	});

	it('should throw error for undefined', () => {
		expect(() => Object.myEntries(undefined as any)).toThrow();
	});

	it("should ignore inherited properties", () => {
		class Parent {
			x= 1;
		}
		class Child extends Parent {
			y=1;
		}
		const obj = new Child()
		expect(Object.myEntries(obj)).toEqual([['y',1]])
	})
});
