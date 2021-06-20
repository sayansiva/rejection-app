function RejectionForm({
  question,
  askee,
  disabled,
  onChangeQuestion,
  onChangeAskee,
  onFocusQuestion,
  onFocusAskee,
  onBlurQuestion,
  onBlurAskee,
  onSubmit,
  questionError,
  askeeError,
}) {
  return (
    <div className="space-y-8">
      <div className="space-y-8 sm:space-y-5">
        <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
          <div className="space-y-6 sm:space-y-5">
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="state"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Question
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  onChange={onChangeQuestion}
                  onFocus={onFocusQuestion}
                  onBlur={onBlurQuestion}
                  value={question}
                  type="text"
                  name="question"
                  id="question"
                  className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                />
                <p className="mt-2 text-sm text-red-600" id="email-error">
                  {questionError}
                </p>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="zip"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Askee
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  onChange={onChangeAskee}
                  onFocus={onFocusAskee}
                  onBlur={onBlurAskee}
                  value={askee}
                  type="text"
                  name="askee"
                  id="askee"
                  className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                />
                <p className="mt-2 text-sm text-red-600" id="email-error">
                  {askeeError}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            data-flag="rejected"
            onClick={onSubmit}
            disabled={disabled}
            type="button"
            className="bg-red-500 disabled:cursor-not-allowed disabled:opacity-50 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white hover:bg-brand-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-primary sm:text-sm"
          >
            Reject
          </button>
          <button
            data-flag="accepted"
            onClick={onSubmit}
            disabled={disabled}
            className="disabled:cursor-not-allowed disabled:opacity-60 ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Accepts
          </button>
        </div>
      </div>
    </div>
  );
}

export { RejectionForm };
