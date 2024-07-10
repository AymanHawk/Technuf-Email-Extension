export const ollamaLlmQueryReponseSelector = (state) => state?.llm?.ollama?.data?.data?.message?.content
export const ollamaLlmQueryReponseIsLoadingSelector = (state) => state?.llm?.ollama?.isLoading;
export const selectNearBySearchError = (state) => state?.google?.places?.isLoading;
export const primitive = (state) => state
// export const primitive = (state) => state;