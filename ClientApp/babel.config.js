module.exports = function (api) {
	api.cache(true);
	return {
		presets: ['babel-preset-expo'],
		plugins: [
			[
				'@babel/plugin-proposal-decorators',
				{
					legacy: true,
				},
			],
			[
				'module-resolver',
				{
					root: ['./src'],
					extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
					alias: {
						'@components': './src/components',
						'@constants': './src/constants',
						'@containers': './src/containers',
						'@localization': './src/localization',
						'@services': './src/services',
					},
				},
			],
		],
	};
};
