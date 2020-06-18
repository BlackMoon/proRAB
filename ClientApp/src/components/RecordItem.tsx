import React, { FC } from 'react';
import { Text, View, TextInput, TouchableHighlight, Button } from 'react-native';
import { Formik } from 'formik';
import { inject, observer } from 'mobx-react';

import i18n, { translate } from '@localization';
import { RecordScreenRouteProp, RecordScreenNavigatorProp } from '@navigation';
import { recordStore } from '@stores';

interface RecordItemProps {
	navigation: RecordScreenNavigatorProp;
	recordStore: typeof recordStore;
	route: RecordScreenRouteProp;
}

// ref to formik.handleSubmit delegate
let submit: () => void;

export const RecordItem: FC<RecordItemProps> = inject('recordStore')(
	observer(({ navigation, recordStore, route }) => {
		const { recordId } = route.params;
		const { catalog, addRecord, loadRecord, updateRecord } = recordStore;

		React.useLayoutEffect(() => {
			navigation.setOptions({
				headerRight: () => <Button onPress={submit} title={i18n.t('save')} />,
			});
		}, []);

		const fields = catalog?.fields;
		const keyProperty = `Catalog${catalog?.catalogCode.toAlphaCase()}Id`;
		const nameProperty = `Catalog${catalog?.catalogCode.toAlphaCase()}Name`;
		const record: any = recordId ? loadRecord(recordId) : {};

		return fields ? (
			<View>
				<Formik
					initialValues={record}
					onSubmit={values => {
						const key = values[keyProperty];
						if (key) {
							updateRecord(values);
						} else {
							addRecord(values);
						}
						console.log(values);
						navigation.goBack();
					}}
				>
					{({ handleChange, handleSubmit, values }) => {
						const name = translate(values, nameProperty);
						submit = handleSubmit;
						return (
							<View>
								<TextInput key={nameProperty} placeholder={i18n.t('name')} value={name} />
								{fields.map(f => {
									const field = f.fieldCode.toAlphaCase();
									const placeHolder = translate(f, 'fieldName');
									const value = values[field]?.toString();
									return (
										<TextInput
											key={field}
											keyboardType="numeric"
											placeholder={placeHolder}
											value={value}
											onChangeText={handleChange(field)}
										/>
									);
								})}
							</View>
						);
					}}
				</Formik>

				<TouchableHighlight
					activeOpacity={0.6}
					style={{ alignItems: 'center', backgroundColor: '#DDDDDD', padding: 10 }}
					onPress={() => {
						submit();
					}}
				>
					<Text>Touch Here</Text>
				</TouchableHighlight>
			</View>
		) : null;
	})
);
