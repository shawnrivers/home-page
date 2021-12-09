export function joinClasses(...classNames: string[]): string {
	return classNames.filter((className) => className !== undefined).join(' ');
}
