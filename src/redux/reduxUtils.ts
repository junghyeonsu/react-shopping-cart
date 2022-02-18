interface BaseAction<ActionType extends string, Payload = void> {
  type: ActionType
  payload: Payload
}

interface BaseErrorPayload {
  errorStatus: number
}

type ActionCreator<ActionType extends string, Payload = void> = (paylaod: Payload) => BaseAction<ActionType, Payload>

type ActionTypeMap<ActionCreatorMap extends { [K in string]: ActionCreator<any, any> }> = {
  [K in keyof ActionCreatorMap]: ReturnType<ActionCreatorMap[K]>
}

type SelectFunction<State, Return = any> = (state: State) => Return

interface BaseReducerState<T> {
  value: T
  isFetching?: boolean
  hasError?: boolean
  errorStatus?: number
}

const makeActionCreator =
  <ActionType extends string>(actionType: ActionType) =>
  <Payload = void>(): ActionCreator<ActionType, Payload> =>
  (payload) => ({ type: actionType, payload })

const setRequestState = <S>(state: S) => ({ ...state, isFetching: true, hasError: false, errorStatus: '' })

const setRequestSuccessState = <S, V>(state: S, value: V) => ({ ...state, inFetching: false, value })

const setReuqestFailureState = <S>(state: S, errorStatus: number) => ({
  ...state,
  isFetching: false,
  hasError: true,
  errorStatus,
})

export { makeActionCreator, setRequestState, setRequestSuccessState, setReuqestFailureState }
export type { BaseAction, BaseErrorPayload, ActionCreator, ActionTypeMap, SelectFunction, BaseReducerState }
