import { LockClosedIcon } from '@heroicons/react/solid';

function UserAuthentication({
  isLoggingIn,
  onSubmit,
  disabled,
  email,
  emailError,
  onChangeEmail,
  onBlurEmail,
  onFocusEmail,
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <div className="mt-8 space-y-6" action="#" method="POST">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                aria-label="email"
                value={email}
                onChange={onChangeEmail}
                onBlur={onBlurEmail}
                onFocus={onFocusEmail}
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
              <p className="mt-2 text-sm text-red-600" id="email-error">
                {emailError}
              </p>
            </div>
          </div>

          <div>
            <button
              onClick={onSubmit}
              disabled={disabled}
              className="disabled:cursor-not-allowed group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLoggingIn && (
                <svg
                  className="animate-spin h-5 w-5 mr-3"
                  style={{
                    border: '0.25rem solid',
                    borderTop: '0.25rem solid grey',
                    borderRadius: '50%',
                  }}
                  viewBox="0 0 24 24"
                />
              )}
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  aria-hidden="true"
                />
              </span>
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { UserAuthentication };
