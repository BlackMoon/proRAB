import React, { FC, useEffect, useLayoutEffect } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
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
		const { catalog, currentRecord, addRecord, loadRecord, updateRecord } = recordStore;

		useEffect(() => loadRecord(recordId), []);

		useLayoutEffect(() => {
			navigation.setOptions({
				headerRight: () => <Button onPress={submit} title={i18n.t('save')} />,
			});
		}, []);

		const fields = catalog?.fields;
		const keyProperty = catalog?.keyProperty || '';
		const nameProperty = catalog?.nameProperty || '';

		return fields ? (
			<View>
				<Formik
					enableReinitialize={true}
					initialValues={currentRecord}
					onSubmit={async values => {
						const key = values[keyProperty];
						if (key) {
							await updateRecord(values);
						} else {
							await addRecord(values);
						}
						console.log(values);
						navigation.goBack();
					}}
				>
					{({ handleChange, handleSubmit, values }) => {
						submit = handleSubmit;
						return (
							<View>
								{Object.keys(i18n.translations).map(locale => {
									const field = nameProperty + locale.toAlphaCase();
									return (
										<TextInput
											key={field}
											placeholder={i18n.t('name', { locale })}
											value={values[field]}
											onChangeText={handleChange(field)}
										/>
									);
								})}
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
			</View>
		) : null;
	})
);
