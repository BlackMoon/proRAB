interface String {
	toAlphaCase(): string;
}

// eslint-disable-next-line no-extend-native
String.prototype.toAlphaCase = function () {
	const s = String(this);
	return s[0].toUpperCase() + s.substr(1).toLowerCase();
};
