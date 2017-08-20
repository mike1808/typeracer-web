import { put, take, race } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { createAction } from 'redux-act';
import { SubmissionError } from 'redux-form';

export const formSubmit = createAction(
    'state-form-submit-actions/FORM_SUBMIT',
    (submitAction, successAction, failureAction, values, resolve, reject) => ({
        submitAction,
        successAction,
        failureAction,
        values,
        resolve,
        reject,
    }),
);

export function onSubmitActions(submitAction, successAction, failureAction) {
    return (values, dispatch) =>
        new Promise((resolve, reject) => {
            dispatch(formSubmit(submitAction, successAction, failureAction, values, resolve, reject));
        });
}

function* formSubmitSaga({
    payload: {
        submitAction,
        successAction,
        failureAction,
        values,
        resolve,
        reject,
    },
}) {
    yield put(submitAction({ ...values }));

    const { success, failure } = yield race({
        success: take(successAction.getType()),
        failure: take(failureAction.getType()),
    });

    if (success) {
        resolve();
    } else if (failure.payload.validation) {
        reject(new SubmissionError(failure.payload));
    } else {
        reject(failure.payload);
    }
}

export default function* watchFormSubmitSaga() {
    yield* takeEvery(formSubmit.getType(), formSubmitSaga);
}
